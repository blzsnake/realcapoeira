import type { TElement, TScrollableRef } from './types';

const touchOption = {
  capture: true,
  passive: false,
};

const onTouch = ({
  childScrollElem,
  ref,
}: {
  ref: React.RefObject<HTMLElement>;
  childScrollElem: React.MutableRefObject<TElement>;
}) => {
  const { current } = ref;

  if (!current) {
    return () => undefined;
  }

  const refStyles = getComputedStyle(current);
  const scrollVariant = ['auto', 'scroll'].includes(refStyles.overflowY)
    ? 'Y'
    : 'X';

  let startPosition = { y: 0, x: 0 };

  const onTouchStartTarget = (event: TouchEvent) => {
    startPosition = { y: event.touches[0].pageY, x: event.touches[0].pageX };
    // eslint-disable-next-line no-param-reassign
    childScrollElem.current = event.currentTarget;
  };

  const onTouchEndTarget = () => {
    // eslint-disable-next-line no-param-reassign
    childScrollElem.current = null;
  };

  const onTouchMoveTarget = (event: TouchEvent) => {
    if (
      childScrollElem.current &&
      childScrollElem.current !== event.currentTarget
    ) {
      return;
    }

    if (scrollVariant === 'Y') {
      if (startPosition.y - event.touches[0].pageY > 0) {
        current.scrollTop + current.clientHeight === current.scrollHeight
          ? event.preventDefault()
          : event.stopPropagation();
      } else {
        current.scrollTop === 0
          ? event.preventDefault()
          : event.stopPropagation();
      }
      return;
    }

    if (startPosition.x - event.touches[0].pageX > 0) {
      current.scrollLeft + current.clientWidth === current.scrollWidth
        ? event.preventDefault()
        : event.stopPropagation();
    } else {
      current.scrollLeft === 0
        ? event.preventDefault()
        : event.stopPropagation();
    }
  };

  current.addEventListener('touchstart', onTouchStartTarget, touchOption);
  current.addEventListener('touchmove', onTouchMoveTarget, touchOption);
  current.addEventListener('touchend', onTouchEndTarget, touchOption);

  return () => {
    current.removeEventListener('touchstart', onTouchStartTarget, touchOption);
    current.removeEventListener('touchmove', onTouchMoveTarget, touchOption);
    current.removeEventListener('touchend', onTouchEndTarget, touchOption);
    // eslint-disable-next-line no-param-reassign
    childScrollElem.current = null;
  };
};

export const setScroll = ({
  childScrollElem,
  refs,
}: {
  refs?: TScrollableRef;
  childScrollElem: React.MutableRefObject<TElement>;
}) => {
  if (!refs) {
    return () => undefined;
  }

  if (Array.isArray(refs)) {
    const removeListeners: Array<() => void> = [];
    refs.forEach((elem) => {
      removeListeners.push(onTouch({ ref: elem, childScrollElem }));
    });

    return () => removeListeners.forEach((removelistener) => removelistener());
  }

  const removeListener = onTouch({
    ref: refs,
    childScrollElem,
  });

  return () => {
    removeListener();
  };
};
