/**
 * @file lexi-robot-model.ts
 * @description Original procedural 3D Lexi mesh and reusable state poses, without remote model assets.
 */
import {
  BoxGeometry, CapsuleGeometry, CircleGeometry, Group, Mesh, MeshBasicMaterial,
  MeshStandardMaterial, SphereGeometry, TorusGeometry,
} from 'three';
import type { LexiPose } from './LexiCharacter';

export interface LexiPalette { primary: string; face: string; accent: string }
export interface LexiRobot {
  root: Group;
  setPalette(palette: LexiPalette): void;
  pose(pose: LexiPose, time?: number): void;
  dispose(): void;
}

export function createLexiRobot(): LexiRobot {
  const sphere = new SphereGeometry(1, 24, 16);
  const capsule = new CapsuleGeometry(0.5, 1, 6, 16);
  const box = new BoxGeometry(1, 1, 1);
  const smile = new TorusGeometry(0.115, 0.017, 6, 20, Math.PI);
  const disk = new CircleGeometry(0.64, 32);
  const primary = new MeshStandardMaterial({ roughness: 0.3, metalness: 0.25 });
  const face = new MeshStandardMaterial({ roughness: 0.45, metalness: 0.05 });
  const accent = new MeshStandardMaterial({ roughness: 0.25, metalness: 0.2 });
  const dark = new MeshStandardMaterial({ color: 0x17233f, roughness: 0.65 });
  const shadow = new MeshBasicMaterial({ color: 0x111827, transparent: true, opacity: 0.12, depthWrite: false });
  const root = new Group();
  const torso = new Group();
  const head = new Group();
  root.add(torso, head);
  torso.position.y = 0.98;
  head.position.y = 1.85;

  function part(parent: Group, geometry: SphereGeometry | CapsuleGeometry | BoxGeometry | TorusGeometry | CircleGeometry,
    material: MeshStandardMaterial | MeshBasicMaterial, scale: [number, number, number], position: [number, number, number]) {
    const mesh = new Mesh(geometry, material);
    mesh.scale.set(...scale);
    mesh.position.set(...position);
    parent.add(mesh);
    return mesh;
  }

  part(torso, sphere, primary, [0.49, 0.6, 0.34], [0, 0, 0]);
  part(torso, sphere, face, [0.37, 0.41, 0.06], [0, 0, 0.31]);
  part(torso, box, primary, [0.29, 0.27, 0.07], [0, 0, 0.39]);
  part(torso, box, face, [0.018, 0.26, 0.012], [0, 0, 0.432]);
  part(head, sphere, primary, [0.72, 0.59, 0.47], [0, 0, 0]);
  part(head, sphere, face, [0.57, 0.39, 0.1], [0, 0.005, 0.42]);
  part(head, sphere, primary, [0.13, 0.18, 0.2], [-0.72, -0.015, 0]);
  part(head, sphere, primary, [0.13, 0.18, 0.2], [0.72, -0.015, 0]);
  part(head, capsule, dark, [0.055, 0.09, 0.055], [0, 0.61, 0]);
  part(head, sphere, accent, [0.095, 0.095, 0.095], [0, 0.76, 0]);
  const leftEye = part(head, sphere, dark, [0.085, 0.11, 0.05], [-0.23, 0.08, 0.51]);
  const rightEye = part(head, sphere, dark, [0.085, 0.11, 0.05], [0.23, 0.08, 0.51]);
  part(head, sphere, face, [0.022, 0.022, 0.015], [-0.25, 0.12, 0.553]);
  part(head, sphere, face, [0.022, 0.022, 0.015], [0.21, 0.12, 0.553]);
  const mouth = part(head, smile, dark, [1, 0.7, 1], [0, -0.16, 0.525]);
  mouth.rotation.z = Math.PI;
  const leftArm = new Group();
  const rightArm = new Group();
  torso.add(leftArm, rightArm);
  leftArm.position.set(-0.48, 0.15, 0);
  rightArm.position.set(0.48, 0.15, 0);
  part(leftArm, capsule, primary, [0.17, 0.26, 0.17], [-0.03, -0.25, 0]);
  part(rightArm, capsule, primary, [0.17, 0.26, 0.17], [0.03, -0.25, 0]);
  part(leftArm, sphere, face, [0.14, 0.14, 0.14], [-0.03, -0.53, 0]);
  part(rightArm, sphere, face, [0.14, 0.14, 0.14], [0.03, -0.53, 0]);
  part(root, capsule, dark, [0.16, 0.14, 0.16], [-0.24, 0.37, 0]);
  part(root, capsule, dark, [0.16, 0.14, 0.16], [0.24, 0.37, 0]);
  part(root, sphere, primary, [0.23, 0.12, 0.3], [-0.24, 0.12, 0.07]);
  part(root, sphere, primary, [0.23, 0.12, 0.3], [0.24, 0.12, 0.07]);
  const ground = part(root, disk, shadow, [1, 1, 1], [0, 0.012, 0]);
  ground.rotation.x = -Math.PI / 2;

  return {
    root,
    setPalette(palette: LexiPalette) {
      primary.color.setStyle(palette.primary);
      face.color.setStyle(palette.face);
      accent.color.setStyle(palette.accent);
      if (face.color.r + face.color.g + face.color.b < 1.5) dark.color.copy(primary.color);
      else dark.color.setHex(0x17233f);
    },
    pose(pose: LexiPose, time = 0) {
      const thinking = pose === 'thinking';
      const speaking = pose === 'speaking';
      const error = pose === 'error';
      root.position.y = thinking ? Math.sin(time * 2.5) * 0.035 : 0;
      root.rotation.y = -0.12;
      head.rotation.set(error ? 0.12 : thinking ? -0.06 : 0, thinking ? 0.18 + Math.sin(time * 2) * 0.08 : 0, error ? -0.08 : speaking ? 0.07 : 0);
      leftArm.rotation.z = thinking ? -2.5 : 0.18;
      rightArm.rotation.z = speaking ? 2.5 : error ? 0.65 : -0.18;
      leftEye.scale.y = rightEye.scale.y = thinking ? 0.08 : error ? 0.07 : 0.11;
      mouth.rotation.z = error ? 0 : Math.PI;
      mouth.scale.set(1, speaking ? 1.15 : thinking ? 0.4 : 0.7, 1);
    },
    dispose() {
      for (const geometry of [sphere, capsule, box, smile, disk]) geometry.dispose();
      for (const material of [primary, face, accent, dark, shadow]) material.dispose();
    },
  };
}
