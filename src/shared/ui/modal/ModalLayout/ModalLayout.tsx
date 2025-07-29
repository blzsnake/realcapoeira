// Components
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import cn from 'classnames';
import CloseMobile from '../../../../app/assets/CloseMobile.svg?react';
import Close from '../../../../app/assets/Close.svg?react';
// Styles
import styles from './ModalLayout.module.css';
// Types
import type { TModalLayoutProps } from '../types';

export const ModalLayout = forwardRef<HTMLDialogElement, TModalLayoutProps>(
  function Layout(
    {
      children,
      onClose,
      isOpen,
      className,
      isCloseIcon = true,
      ignoreBackdropClick: ignoreOutsideClick = false,
      transparentBackdrop = false,
      style,
      onAnimationEnd,
      variantAnimation = 'default',
      variant = 'default',
      qaSelector,
      'data-qa': dataQa,
      isPopUp,
      noBackdrop = false,
    },
    ref
  ) {
    const clickRef = useRef<EventTarget | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const modalStyles = cn(
      styles.Modal,
      isPopUp && styles.PopUp,
      variant === 'full-for-mobile' && styles.FullWidth,
      isOpen && variantAnimation === 'side menu' && styles.ModalSideMenuOpen,
      variantAnimation === 'side menu' && styles.ModalSideMenu,
      isOpen && variantAnimation === 'default' && styles.ModalOpen,
      !isOpen && variantAnimation === 'default' && styles.ModalClose,
      !isOpen && variantAnimation === 'side menu' && styles.ModalSideMenuClose,
      noBackdrop && styles.noBackDrop,
      variant !== 'mobileViewOnly' && styles.Laptop,
      { [styles.TransparentBackdrop]: transparentBackdrop },
      className
    );

    useImperativeHandle(ref, () => dialogRef.current!, []);

    const handleMousedown = useCallback(({ target }: Event) => {
      clickRef.current = target;
    }, []);

    const closeOnBackDropClick = useCallback(
      (event: Event) => {
        const { currentTarget, target } = event;

        if (ignoreOutsideClick) {
          return;
        }

        const isClickedOnBackDrop =
          target === currentTarget && target === clickRef.current;
        if (isClickedOnBackDrop) {
          onClose(event);
        }
      },
      [ignoreOutsideClick, onClose]
    );

    const handleCancel = useCallback(
      (event: Event) => {
        if (event.target !== event.currentTarget) {
          return;
        }

        event.preventDefault();
        onClose(event);
      },
      [onClose]
    );

    const onPressEsc = useCallback(
      (event: KeyboardEvent) => {
        if (event.code === 'Escape') {
          onClose();
        }
      },
      [onClose]
    );

    useEffect(() => {
      const currentDialogRef = dialogRef.current;

      if (isPopUp) {
        document.addEventListener('keydown', onPressEsc);
        return () => document.removeEventListener('keydown', onPressEsc);
      }

      if (currentDialogRef) {
        currentDialogRef.addEventListener('click', closeOnBackDropClick);
        currentDialogRef.addEventListener('mousedown', handleMousedown);
        currentDialogRef.addEventListener('cancel', handleCancel);
      }
      return () => {
        if (currentDialogRef) {
          currentDialogRef.removeEventListener('click', closeOnBackDropClick);
          currentDialogRef.removeEventListener('mousedown', handleMousedown);
          currentDialogRef.removeEventListener('cancel', handleCancel);
        }
      };
    }, [
      closeOnBackDropClick,
      handleCancel,
      handleMousedown,
      isPopUp,
      onPressEsc,
    ]);

    const backdropClickHandler = useCallback(() => {
      if (ignoreOutsideClick) {
        return;
      }
      onClose();
    }, [ignoreOutsideClick, onClose]);

    return (
      <>
        <dialog
          onAnimationEnd={onAnimationEnd}
          ref={dialogRef}
          className={modalStyles}
          style={style}
          data-qa={dataQa || qaSelector}
        >
          {children}
          {isCloseIcon && (
            <button
              className={styles.Close}
              type="button"
              aria-label="close"
              onClick={(event) => onClose(event as unknown as Event)}
              data-qa={dataQa && `${dataQa}-close-button`}
            >
              <CloseMobile className={styles.iconMobile} />
              <Close className={styles.iconWeb} />
            </button>
          )}
        </dialog>
        {isPopUp && (
          <div onClick={backdropClickHandler} className={styles.Backdrop} />
        )}
      </>
    );
  }
);
