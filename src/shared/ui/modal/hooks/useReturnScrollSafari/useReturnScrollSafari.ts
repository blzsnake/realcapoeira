import { useEffect, useRef } from 'react';
import { isSafari, isIOS } from 'react-device-detect';
// Types
import type { TReturnScrollSafari } from './types';

export const useReturnScrollSafari: TReturnScrollSafari = ({
  trigger,
  behavior,
}) => {
  const scrollTop = useRef<number>(0);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (isSafari && isIOS) {
      if (trigger) {
        scrollTop.current = window.scrollY;
        wasOpen.current = true;
      } else if (wasOpen.current) {
        window.scrollTo({ top: scrollTop.current, behavior });
        wasOpen.current = false;
      }
    }
  }, [trigger, behavior]);
};
