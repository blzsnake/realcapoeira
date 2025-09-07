import { Typography } from '~shared/ui/typography';
import { Modal, ModalBody, ModalTitle } from '~shared/ui/modal';
import type { ContactsModalProps } from './types';
import styles from './ContactsModal.module.css';

export function ContactsModal({
  isOpen,
  closeModal,
  fullTitle,
  children,
}: ContactsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className={styles.Modal}>
      <ModalTitle className={styles.Wrap}>
        <Typography component="h2" weight="demiBold" className={styles.Title}>
          <button style={{ opacity: 0, position: 'absolute' }} type="button">
            fix
          </button>
          {fullTitle}
        </Typography>
      </ModalTitle>
      <ModalBody className={styles.Body}>{children}</ModalBody>
    </Modal>
  );
}
