/**
 * @file LexiCharacter.tsx
 * @description True 3D Lexi, lazily loading GPU rendering with an honest capability fallback.
 */
import { useEffect, useRef, useState } from 'react';
import { Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { LexiRenderer } from './lexi-robot-renderer';

export type LexiPose = 'idle' | 'thinking' | 'speaking' | 'error';

export function LexiCharacter({ pose }: { pose: LexiPose }) {
  const { t } = useTranslation('assistant');
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<LexiRenderer | null>(null);
  const latestPose = useRef(pose);
  const [availability, setAvailability] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  latestPose.current = pose;

  useEffect(() => {
    let alive = true;
    if (typeof WebGL2RenderingContext === 'undefined') {
      setAvailability('unavailable');
      return;
    }
    void import('./lexi-robot-renderer').then(({ createLexiRenderer }) => {
      if (!alive || !canvas.current) return;
      try {
        controller.current = createLexiRenderer(canvas.current, available => {
          if (alive) setAvailability(available ? 'ready' : 'unavailable');
        });
        controller.current.setPose(latestPose.current);
      } catch {
        if (alive) setAvailability('unavailable');
      }
    }).catch(() => { if (alive) setAvailability('unavailable'); });
    return () => {
      alive = false;
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);

  useEffect(() => { controller.current?.setPose(pose); }, [pose]);

  return <span className="relative block h-28 w-24" data-lexi-pose={pose} data-lexi-renderer={availability}>
    <canvas ref={canvas} aria-hidden="true" className={`h-full w-full ${availability === 'ready' ? '' : 'invisible'}`} />
    {availability !== 'ready' && <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-primary" aria-live="polite">
      <Bot aria-hidden="true" size={40} />
      <span className="max-w-full px-1 text-center text-[10px] leading-tight text-foreground">{t(availability === 'loading' ? 'loading3d' : 'unavailable3d')}</span>
    </span>}
  </span>;
}
