/**
 * @file useChatResize.ts
 * @description Viewport-bounded pointer, keyboard and preset resizing without per-move React updates.
 */
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';

interface ChatDimensions { width: number; height: number }
const PRESETS = [{ width: 340, height: 440 }, { width: 460, height: 560 }, { width: 580, height: 660 }];

function clampDimensions(width: number, height: number): ChatDimensions {
  const maxWidth = Math.max(1, Math.min(720, window.innerWidth - 24));
  const maxHeight = Math.max(1, Math.min(740, window.innerHeight - 90));
  return {
    width: Math.max(Math.min(280, maxWidth), Math.min(maxWidth, Math.round(width))),
    height: Math.max(Math.min(220, maxHeight), Math.min(maxHeight, Math.round(height))),
  };
}

export function useChatResize() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(() => clampDimensions(PRESETS[0].width, PRESETS[0].height));
  const presetIndexRef = useRef(0);
  const dragCleanupRef = useRef<(() => void) | null>(null);

  const cyclePreset = useCallback(() => {
    presetIndexRef.current = (presetIndexRef.current + 1) % PRESETS.length;
    const target = PRESETS[presetIndexRef.current];
    setSize(clampDimensions(target.width, target.height));
  }, []);

  useEffect(() => {
    const resize = () => setSize(previous => clampDimensions(previous.width, previous.height));
    window.addEventListener('resize', resize);
    return () => { dragCleanupRef.current?.(); window.removeEventListener('resize', resize); };
  }, []);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !containerRef.current) return;
    event.preventDefault();
    event.currentTarget.focus();
    dragCleanupRef.current?.();
    const handle = event.currentTarget;
    const pointerId = event.pointerId;
    const container = containerRef.current;
    const start = { x: event.clientX, y: event.clientY, width: container.offsetWidth, height: container.offsetHeight };
    let next = { width: start.width, height: start.height };
    let frame = 0;
    handle.setPointerCapture(pointerId);
    const paint = () => {
      frame = 0;
      container.style.width = `${next.width}px`;
      container.style.height = `${next.height}px`;
    };
    const move = (pointer: PointerEvent) => {
      if (pointer.pointerId !== pointerId) return;
      next = clampDimensions(start.width + start.x - pointer.clientX, start.height + start.y - pointer.clientY);
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const cleanup = () => {
      cancelAnimationFrame(frame);
      if (handle.hasPointerCapture(pointerId)) handle.releasePointerCapture(pointerId);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
      dragCleanupRef.current = null;
    };
    const finish = (pointer: PointerEvent) => {
      if (pointer.pointerId !== pointerId) return;
      cleanup();
      setSize(next);
    };
    dragCleanupRef.current = cleanup;
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); cyclePreset(); return; }
    const step = event.shiftKey ? 60 : 24;
    let width = 0;
    let height = 0;
    switch (event.key) {
      case 'ArrowLeft': width = step; break;
      case 'ArrowRight': width = -step; break;
      case 'ArrowUp': height = step; break;
      case 'ArrowDown': height = -step; break;
      default: return;
    }
    event.preventDefault();
    setSize(previous => clampDimensions(previous.width + width, previous.height + height));
  }, [cyclePreset]);

  return { containerRef, size, cyclePreset, handlePointerDown, handleKeyDown };
}
