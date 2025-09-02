import { Modal, ModalBody, ModalTitle } from '~shared/ui/modal';
import type { FormResultModalProps } from './types';
import styles from './FormResultModal.module.css';

export function FormResultModal({
  isOpen,
  closeModal,
  children,
}: FormResultModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className={styles.Modal}>
      <ModalTitle className={styles.Wrap}> </ModalTitle>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}
