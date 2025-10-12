import { Typography } from '~shared/ui/typography';
import { Modal, ModalBody, ModalTitle } from '~shared/ui/modal';
import { useRef } from 'react';
import type { MasterModalProps } from './types';
import styles from './MasterModal.module.css';

export function MasterModal({
  isOpen,
  closeModal,
  name,
  dates,
  children,
}: MasterModalProps) {
  const scrollableRef = useRef<HTMLDivElement>(null);

  return (
    <Modal
      scrollableRef={scrollableRef}
      isOpen={isOpen}
      onClose={closeModal}
      className={styles.Modal}
    >
      <ModalTitle className={styles.Title}>
        <button style={{ opacity: 0, position: 'absolute' }} type="button">
          fix
        </button>
        <Typography component="h1" weight="demiBold" className={styles.Name}>
          {name}
        </Typography>
        <Typography component="h2" className={styles.Dates}>
          {dates}
        </Typography>
      </ModalTitle>
      <ModalBody ref={scrollableRef}>{children}</ModalBody>
    </Modal>
  );
}
