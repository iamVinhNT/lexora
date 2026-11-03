/**
 * @file useDesktopUpdate.ts
 * @description Subscribes to desktop update state pushed by the Electron main process; inert in the browser.
 */
import { useEffect, useState } from 'react';

import { getDesktopUpdatesApi, type DesktopUpdateState } from '../desktop/desktop-updates';

export function useDesktopUpdate(): DesktopUpdateState | null {
  const [state, setState] = useState<DesktopUpdateState | null>(null);

  useEffect(() => {
    const api = getDesktopUpdatesApi();
    if (!api) return undefined;
    let active = true;
    void api.getState().then((initial) => {
      if (active) setState((current) => current ?? initial);
    }).catch(() => undefined);
    const unsubscribe = api.onState((next) => {
      if (active) setState(next);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return state;
}
