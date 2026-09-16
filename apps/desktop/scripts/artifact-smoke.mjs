/**
 * @file artifact-smoke.mjs
 * @description Verifies generated Linux artifacts, package metadata, runtime files, and forbidden release configuration.
 */
import { mkdtemp, readFile, readdir, rm, stat } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const execFileAsync = promisify(execFile);
const desktopRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(join(desktopRoot, 'package.json'), 'utf8'));
const builderConfigPath = join(desktopRoot, 'electron-builder.yml');
const releaseRoot = join(desktopRoot, 'release');
const unpackedRoot = join(releaseRoot, 'linux-unpacked');
const appImagePath = join(releaseRoot, `Lexora-${packageJson.version}-x86_64.AppImage`);
const debPath = join(releaseRoot, `lexora_${packageJson.version}_amd64.deb`);
const unpackedExecutablePath = join(unpackedRoot, 'lexora');
const forbiddenRuntimePattern = /electron-updater|GH_TOKEN|GITHUB_TOKEN|(?:^|[^\w-])--(?:no-sandbox|disable-setuid-sandbox)(?:$|[^\w-])/i;
const forbiddenPackageFieldPattern = /["'](?:publish|publishConfig|provider|token|GH_TOKEN|GITHUB_TOKEN)["']\s*:/i;
const forbiddenArtifactPattern = /(^|\/)(?:app-update\.yml|dev-app-update\.yml|latest(?:-[^/]+)?\.yml|[^/]+\.blockmap)$/i;

async function assertNonEmpty(path) {
  const file = await stat(path);
  if (!file.isFile() || file.size === 0) throw new Error(`Expected non-empty artifact: ${path}`);
  return file.size;
}

async function assertExecutable(path, label) {
  const size = await assertNonEmpty(path);
  const file = await stat(path);
  if ((file.mode & 0o111) === 0) throw new Error(`${label} is not executable: ${path}`);
  return size;
}

async function assertNativeAddon(path, label) {
  const size = await assertNonEmpty(path);
  const { stdout } = await execFileAsync('file', [path]);
  if (!/ELF 64-bit.*x86-64/.test(stdout)) throw new Error(`${label} is not an x64 Linux native addon: ${stdout}`);
  return size;
}

function assertContains(text, pattern, label) {
  if (!pattern.test(text)) throw new Error(`${label} missing ${pattern}:\n${text}`);
}

export function inspectAppRun(source) {
  return { injectsNoSandbox: /(?:NO_SANDBOX|--no-sandbox)/.test(source) };
}

export function assertPackagedMetadata({ entries, packageJsonText, runtimeSources }, label) {
  if (entries.some((entry) => forbiddenArtifactPattern.test(entry))) {
    const forbiddenEntry = entries.find((entry) => forbiddenArtifactPattern.test(entry));
    throw new Error(`${label} contains forbidden updater artifact ${forbiddenEntry}.`);
  }

  let packageMetadata;
  try {
    packageMetadata = JSON.parse(packageJsonText);
  } catch (error) {
    throw new Error(`${label} package metadata is not valid JSON.`, { cause: error });
  }
  if (packageMetadata.name !== '@lexora/desktop') throw new Error(`${label} package metadata has an unexpected name.`);
  if (forbiddenPackageFieldPattern.test(packageJsonText)) {
    throw new Error(`${label} contains forbidden updater configuration in package metadata.`);
  }

  for (const [sourceName, source] of Object.entries(runtimeSources)) {
    if (forbiddenRuntimePattern.test(source)) {
      throw new Error(`${label} contains forbidden runtime argument or updater dependency in ${sourceName}.`);
    }
  }
}

function parseAsarArchive(buffer) {
  const headerJsonSize = buffer.readUInt32LE(12);
  const headerStart = 16;
  const headerEnd = headerStart + headerJsonSize;
  const dataOffset = Math.ceil(headerEnd / 4) * 4;
  const header = JSON.parse(buffer.toString('utf8', headerStart, headerEnd));
  const entries = [];
  const files = new Map();

  function walk(node, prefix) {
    for (const [name, child] of Object.entries(node)) {
      const path = prefix ? `${prefix}/${name}` : name;
      if (child.files) walk(child.files, path);
      else {
        entries.push(path);
        files.set(path, child);
      }
    }
  }

  walk(header.files, '');
  return {
    entries,
    readFile(path) {
      const entry = files.get(path);
      if (!entry) throw new Error(`ASAR file not found: ${path}`);
      const start = dataOffset + Number(entry.offset);
      return buffer.subarray(start, start + entry.size).toString('utf8');
    },
  };
}

async function inspectAsar(path, label) {
  const archive = parseAsarArchive(await readFile(path));
  const packageJsonText = archive.readFile('package.json');
  const runtimeSources = Object.fromEntries(
    archive.entries
      .filter((entry) => /^dist\/.*\.(?:js|cjs)$/i.test(entry))
      .map((entry) => [entry, archive.readFile(entry)]),
  );
  assertPackagedMetadata({ entries: archive.entries, packageJsonText, runtimeSources }, label);
  return { packageJsonSize: packageJsonText.length, runtimeSourceCount: Object.keys(runtimeSources).length };
}

function hasPublishProvider(text) {
  return text.split('\n').some((line) => {
    const trimmed = line.trim();
    if (!trimmed.startsWith('publish:')) return false;
    const value = trimmed.slice('publish:'.length).trim();
    return value !== 'null' && value !== '[]';
  });
}

async function assertLinuxAppContents(root, label) {
  const executableSize = await assertExecutable(join(root, 'lexora'), `${label} executable`);
  const frontendSize = await assertNonEmpty(join(root, 'resources', 'frontend', 'index.html'));
  const asarSize = await assertNonEmpty(join(root, 'resources', 'app.asar'));
  const nativeSize = await assertNativeAddon(
    join(root, 'resources', 'app.asar.unpacked', 'node_modules', 'better-sqlite3', 'prebuilds', 'linux-x64.node'),
    `${label} better-sqlite3 addon`,
  );
  const resources = await readdir(join(root, 'resources'));
  for (const forbiddenResource of ['app-update.yml', 'package-type']) {
    if (resources.includes(forbiddenResource)) throw new Error(`${label} ships forbidden resource ${forbiddenResource}.`);
  }
  const packagedMetadata = await inspectAsar(join(root, 'resources', 'app.asar'), label);
  return { executableSize, frontendSize, asarSize, nativeSize, packagedMetadata };
}

async function assertDebianMetadata() {
  const { stdout: info } = await execFileAsync('dpkg-deb', ['--info', debPath]);
  assertContains(info, /Package:\s*lexora/i, 'Debian metadata');
  assertContains(info, new RegExp(String.raw`Version:\s*${packageJson.version.replaceAll('.', '\\.')}`), 'Debian metadata');
  assertContains(info, /Architecture:\s*amd64/i, 'Debian metadata');
  assertContains(info, /Maintainer:\s*[^\n]+<[^\n@]+@[^\n>]+>/i, 'Debian metadata');
  assertContains(info, /Homepage:\s*https:\/\/github\.com\/iamVinhNT\/lexora/i, 'Debian metadata');

  const { stdout: contents } = await execFileAsync('dpkg-deb', ['--contents', debPath]);
  assertContains(contents, /\.\/usr\/share\/applications\/lexora\.desktop/, 'Debian desktop entry');
  assertContains(contents, /\.\/usr\/share\/icons\/hicolor\/(16|32|48|128|256|512)x\1\/apps\/lexora\.png/, 'Debian icon');
  assertContains(contents, /\.\/opt\/Lexora\/resources\/frontend\/index\.html/, 'Debian frontend');
  assertContains(contents, /better-sqlite3\/prebuilds\/linux-x64\.node/, 'Debian native addon');
  assertContains(contents, /\.\/opt\/Lexora\/lexora(?:\s|$)/, 'Debian executable');

  const extractionRoot = await mkdtemp(join('/tmp', 'lexora-deb-smoke-'));
  try {
    await execFileAsync('dpkg-deb', ['-x', debPath, extractionRoot]);
    const desktopEntry = await readFile(join(extractionRoot, 'usr', 'share', 'applications', 'lexora.desktop'), 'utf8');
    assertContains(desktopEntry, /^Name=Lexora$/m, 'Debian desktop entry');
    assertContains(desktopEntry, /^Exec=\/opt\/Lexora\/lexora %U$/m, 'Debian desktop entry');
    assertContains(desktopEntry, /^Icon=lexora$/m, 'Debian desktop entry');
    assertContains(desktopEntry, /^StartupWMClass=lexora$/m, 'Debian desktop entry');
    assertContains(desktopEntry, /^Categories=Education;$/m, 'Debian desktop entry');
    return await assertLinuxAppContents(join(extractionRoot, 'opt', 'Lexora'), 'Debian');
  } finally {
    await rm(extractionRoot, { recursive: true, force: true });
  }
}

async function assertExtractedAppImage() {
  const extractionRoot = await mkdtemp(join('/tmp', 'lexora-appimage-smoke-'));
  try {
    await execFileAsync(appImagePath, ['--appimage-version']);
    await execFileAsync(appImagePath, ['--appimage-extract'], { cwd: extractionRoot });
    const appRun = await readFile(join(extractionRoot, 'squashfs-root', 'AppRun'), 'utf8');
    const appRunPolicy = inspectAppRun(appRun);
    if (appRunPolicy.injectsNoSandbox) {
      console.warn('AppImage AppRun can inject --no-sandbox when user namespaces fail; runtime guard must fail closed.');
    }
    return { ...await assertLinuxAppContents(join(extractionRoot, 'squashfs-root'), 'AppImage'), appRunPolicy };
  } finally {
    await rm(extractionRoot, { recursive: true, force: true });
  }
}

async function assertReleaseConfiguration() {
  const config = await readFile(builderConfigPath, 'utf8');
  if (forbiddenRuntimePattern.test(config) || hasPublishProvider(config)) {
    throw new Error('Forbidden updater provider, token, or --no-sandbox configuration found.');
  }
  const entries = await readdir(releaseRoot);
  const expectedArtifacts = [`Lexora-${packageJson.version}-x86_64.AppImage`, `lexora_${packageJson.version}_amd64.deb`].sort();
  const actualArtifacts = entries.filter((name) => /\.(AppImage|deb)$/i.test(name)).sort();
  if (JSON.stringify(actualArtifacts) !== JSON.stringify(expectedArtifacts)) {
    throw new Error(`Unexpected Linux artifacts: ${actualArtifacts.join(', ')}`);
  }
  for (const entry of entries.filter((name) => /\.(json|yml|yaml|txt|blockmap)$/i.test(name))) {
    const content = await readFile(join(releaseRoot, entry), 'utf8');
    if (forbiddenRuntimePattern.test(content) || hasPublishProvider(content)) throw new Error(`Forbidden release metadata found in ${entry}.`);
  }
  const unpackedResources = await readdir(join(unpackedRoot, 'resources'));
  for (const forbiddenResource of ['app-update.yml', 'package-type']) {
    if (unpackedResources.includes(forbiddenResource)) throw new Error(`Unpacked output ships forbidden resource ${forbiddenResource}.`);
  }
}

export async function runPackagedSmoke(binaryPath = unpackedExecutablePath) {
  try {
    return await execFileAsync(binaryPath, ['--smoke-test'], {
      timeout: 30_000,
      maxBuffer: 2 * 1024 * 1024,
    });
  } catch (error) {
    throw new Error(`Packaged Electron smoke failed for ${binaryPath}.`, { cause: error });
  }
}

async function runArtifactSmoke() {
  const appImageSize = await assertNonEmpty(appImagePath);
  const debSize = await assertNonEmpty(debPath);
  const debianContents = await assertDebianMetadata();
  const appImageContents = await assertExtractedAppImage();
  await assertReleaseConfiguration();

  console.log(JSON.stringify({ appImagePath, appImageSize, debPath, debSize, debianContents, appImageContents }, null, 2));
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  await runArtifactSmoke();
}
