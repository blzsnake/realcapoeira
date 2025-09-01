import { useRef } from 'react';
// Components
import { ModalLayout } from './ModalLayout/ModalLayout';
// utils
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { useReturnScrollSafari } from './hooks/useReturnScrollSafari';
import { useMount } from './hooks/useMount';
// Types
import type { TModalProps } from './types';

export function Modal({
  children,
  isOpen,
  scrollableRef,
  variant,
  isPopUp = false,
  ...layoutProps
}: TModalProps) {
  const layoutRef = useRef<HTMLDialogElement>(null);
  const { mounted, onAnimationEnd } = useMount(isOpen);

  useBodyScrollLock({
    isOpen,
    layoutRef,
    mounted,
    scrollableRef,
    disabled: false,
    isPopUp,
  });

  useReturnScrollSafari({
    trigger: isOpen,
    behavior: variant === 'full-for-mobile' ? 'instant' : 'smooth',
  });

  if (!mounted) {
    return null;
  }

  return (
    <ModalLayout
      {...layoutProps}
      variant={variant}
      onAnimationEnd={onAnimationEnd}
      ref={layoutRef}
      isOpen={isOpen}
      isPopUp={isPopUp}
    >
      {children}
    </ModalLayout>
  );
}
