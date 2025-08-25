import { useEffect, useRef } from 'react';

export const useLockBodyScroll = (
  locked: boolean,
  opts?: { restoreOnUnlock?: boolean }
) => {
  const prevScrollRef = useRef(0);

  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const html = document.documentElement;

    prevScrollRef.current = window.scrollY;

    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0 });
    html.style.scrollBehavior = prevScrollBehavior;

    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    const scrollbarWidth = window.innerWidth - html.clientWidth;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = '0px';
    body.style.width = '100%';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      body.style.paddingRight = prev.paddingRight;

      if (opts?.restoreOnUnlock !== false) {
        const prevBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        window.scrollTo({ top: prevScrollRef.current, left: 0 });
        html.style.scrollBehavior = prevBehavior;
      }
    };
  }, [locked, opts?.restoreOnUnlock]);
};
