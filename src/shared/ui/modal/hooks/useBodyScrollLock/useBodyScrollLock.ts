import { useEffect, useRef } from 'react';
import { isScrolledToBottom } from '../../utils/isScrolledToBottom';
import { setScroll } from './setScroll';
// types
import type { TBodyScrollLock, TElement } from './types';
// Styles
import styles from '../../Modal.module.css';

let scrollPosition = 0;

const onTouchMoveDocument = (event: TouchEvent) => {
  event.preventDefault();
};

const touchLockOption = {
  capture: false,
  passive: false,
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
    if (isOpen) {
      prevIsClosed.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const touchEnabled = isTouchDevice && !disabled && isMobile;

    const dialogsNumber = document.querySelectorAll('dialog').length;
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

      scrollPosition = isScrolledToBottom() ? window.scrollY : 0;

      if (dialogsNumber === 1) {
        document.body.style.paddingRight = `${
          window.innerWidth - document.documentElement.clientWidth
        }px`;
        document.body.classList.add(styles.ScrollLock);
      }
    } else if (!mounted && !isOpen && !prevIsClosed.current) {
      if (dialogsNumber === 0) {
        if (touchEnabled) {
          document.removeEventListener(
            'touchmove',
            onTouchMoveDocument,
            touchLockOption
          );

          removeListeners.current();
        }
        document.body.classList.remove(styles.ScrollLock);
        document.body.style.paddingRight = '';
      }

      scrollPosition && window.scrollTo(0, scrollPosition);
    }

    return () => {
      if (mounted) {
        document.body.classList.remove(styles.ScrollLock);
        document.body.style.paddingRight = '';
      }

      removeListeners.current();

      document.removeEventListener(
        'touchmove',
        onTouchMoveDocument,
        touchLockOption
      );
    };
  }, [disabled, isOpen, isPopUp, layoutRef, mounted, scrollableRef]);
};
