import { Modal, ModalBody, ModalTitle } from '~shared/ui/modal';
import styles from './EventModal.module.css';

export function EventModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className={styles.Modal}>
      <ModalTitle>
        <p> Хэдер модалки</p>
      </ModalTitle>
      <ModalBody>
        <p> Body </p>
        <p> Body </p>
        <p> Body </p>
        <p> Body </p>
        <p> Body </p>
        <p>sad</p>
      </ModalBody>
    </Modal>
  );
}
