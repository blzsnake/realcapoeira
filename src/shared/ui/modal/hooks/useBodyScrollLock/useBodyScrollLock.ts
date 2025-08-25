import { useEffect, useRef } from 'react';
import { setScroll } from './setScroll';
import type { TBodyScrollLock, TElement } from './types';
import styles from '../../Modal.module.css';

let scrollPosition = 0;

const onTouchMoveDocument = (event: TouchEvent) => {
  event.preventDefault();
};

const touchLockOption = { capture: false, passive: false };

const getOpenDialogsCount = () =>
  document.querySelectorAll('dialog[open]').length;

const lockRoot = () => {
  const html = document.documentElement;
  const { body } = document;
  const scrollbarWidth = window.innerWidth - html.clientWidth;

  html.classList.add(styles.ScrollLock);
  body.classList.add(styles.ScrollLock);
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
};

const unlockRoot = () => {
  document.documentElement.classList.remove(styles.ScrollLock);
  document.body.classList.remove(styles.ScrollLock);
  document.body.style.paddingRight = '';
};

export const useBodyScrollLock: TBodyScrollLock = ({
  isOpen,
  mounted,
  layoutRef,
  scrollableRef,
  disabled,
  isPopUp,
}) => {
  const removeListeners = useRef<() => void>(() => undefined);
  const childScrollElem = useRef<TElement>(null);
  const prevIsClosed = useRef(true);

  useEffect(() => {
    if (isOpen) prevIsClosed.current = false;
  }, [isOpen]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const touchEnabled = isTouchDevice && !disabled && isMobile;

    if (mounted && isOpen) {
      isPopUp
        ? layoutRef?.current?.show?.()
        : layoutRef?.current?.showModal?.();

      if (touchEnabled) {
        document.addEventListener(
          'touchmove',
          onTouchMoveDocument,
          touchLockOption
        );
        removeListeners.current = setScroll({
          refs: scrollableRef,
          childScrollElem,
        });
      }

      scrollPosition = window.scrollY;

      if (getOpenDialogsCount() === 1) lockRoot();
    } else if (!mounted && !isOpen && !prevIsClosed.current) {
      if (touchEnabled) {
        document.removeEventListener(
          'touchmove',
          onTouchMoveDocument,
          touchLockOption
        );
        removeListeners.current();
      }

      if (getOpenDialogsCount() === 0) unlockRoot();

      window.scrollTo(0, scrollPosition);
      prevIsClosed.current = true;
    }

    return () => {
      if (getOpenDialogsCount() === 0) unlockRoot();

      removeListeners.current();
      document.removeEventListener(
        'touchmove',
        onTouchMoveDocument,
        touchLockOption
      );
    };
  }, [disabled, isOpen, isPopUp, layoutRef, mounted, scrollableRef]);
};
