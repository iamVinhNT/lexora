/**
 * @file lexi-robot-renderer.ts
 * @description Lazy WebGL robot rendering with bounded motion, visibility pausing and complete GPU cleanup.
 */
import { DirectionalLight, HemisphereLight, OrthographicCamera, Scene, WebGLRenderer } from 'three';
import { createLexiRobot } from './lexi-robot-model';
import type { LexiPose } from './LexiCharacter';

export interface LexiRenderer {
  setPose(pose: LexiPose): void;
  dispose(): void;
}

export function createLexiRenderer(canvas: HTMLCanvasElement, onAvailability: (available: boolean) => void): LexiRenderer {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new Scene();
  const camera = new OrthographicCamera(-1.2, 1.2, 1.6, -1.6, 0.1, 30);
  camera.position.set(3.5, 2.5, 7);
  camera.lookAt(0, 1.3, 0);
  const robot = createLexiRobot();
  scene.add(robot.root, new HemisphereLight(0xffffff, 0x263453, 2.2));
  const keyLight = new DirectionalLight(0xffffff, 3.2);
  keyLight.position.set(-3, 5, 5);
  scene.add(keyLight);
  const rimLight = new DirectionalLight(0xffffff, 1.5);
  rimLight.position.set(4, 2, -3);
  scene.add(rimLight);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pose: LexiPose = 'idle';
  let animation = 0;
  let lastFrame = 0;
  let disposed = false;
  let contextLost = false;
  let onscreen = true;

  function stopMotion() {
    if (animation) cancelAnimationFrame(animation);
    animation = 0;
  }
  function render(time = 0) {
    if (disposed || contextLost || document.hidden || !onscreen) return;
    robot.pose(pose, reducedMotion.matches ? 0 : time / 1000);
    renderer.render(scene, camera);
  }
  function animate(time: number) {
    animation = 0;
    if (disposed || contextLost || document.hidden || !onscreen || reducedMotion.matches || pose !== 'thinking') return;
    if (time - lastFrame >= 1000 / 24) { lastFrame = time; render(time); }
    animation = requestAnimationFrame(animate);
  }
  function updateMotion() {
    stopMotion();
    render();
    if (!disposed && !contextLost && !document.hidden && onscreen && !reducedMotion.matches && pose === 'thinking') {
      lastFrame = 0;
      animation = requestAnimationFrame(animate);
    }
  }
  function palette() {
    const style = getComputedStyle(document.documentElement);
    robot.setPalette({
      primary: style.getPropertyValue('--color-primary').trim(),
      face: style.getPropertyValue('--color-primary-foreground').trim(),
      accent: style.getPropertyValue('--color-accent').trim(),
    });
    render();
  }
  function resize() {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    const aspect = width / height;
    camera.left = -1.65 * aspect;
    camera.right = 1.65 * aspect;
    camera.updateProjectionMatrix();
    render();
  }
  function lost(event: Event) {
    event.preventDefault();
    contextLost = true;
    stopMotion();
    onAvailability(false);
  }
  function restored() {
    contextLost = false;
    onAvailability(true);
    palette();
    resize();
    updateMotion();
  }
  const sizeObserver = new ResizeObserver(resize);
  sizeObserver.observe(canvas);
  const themeObserver = new MutationObserver(palette);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const intersection = new IntersectionObserver(entries => {
    onscreen = entries.some(entry => entry.isIntersecting);
    updateMotion();
  });
  intersection.observe(canvas);
  document.addEventListener('visibilitychange', updateMotion);
  reducedMotion.addEventListener('change', updateMotion);
  canvas.addEventListener('webglcontextlost', lost);
  canvas.addEventListener('webglcontextrestored', restored);
  palette();
  resize();
  onAvailability(true);

  return {
    setPose(next) { pose = next; updateMotion(); },
    dispose() {
      if (disposed) return;
      disposed = true;
      stopMotion();
      sizeObserver.disconnect();
      themeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', updateMotion);
      reducedMotion.removeEventListener('change', updateMotion);
      canvas.removeEventListener('webglcontextlost', lost);
      canvas.removeEventListener('webglcontextrestored', restored);
      robot.dispose();
      renderer.dispose();
      scene.clear();
    },
  };
}
