import { useRef } from 'react';
import { Typography } from '~shared/ui/typography';
import { Modal, ModalBody, ModalTitle } from '~shared/ui/modal';
import type { SignUpModalProps } from './types';
import styles from './SignUpModal.module.css';

export function SignUpModal({
  isOpen,
  closeModal,
  fullTitle,
  children,
}: SignUpModalProps) {
  const scrollableRef = useRef<HTMLDivElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className={styles.Modal}
      scrollableRef={scrollableRef}
    >
      <ModalTitle className={styles.Wrap}>
        <button style={{ opacity: 0, position: 'absolute' }} type="button">
          fix
        </button>
        <Typography component="h2" weight="demiBold" className={styles.Title}>
          {fullTitle}
        </Typography>
      </ModalTitle>
      <ModalBody ref={scrollableRef}>{children}</ModalBody>
    </Modal>
  );
}
