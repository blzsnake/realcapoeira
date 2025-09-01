import { Typography } from '~shared/ui/typography';
import { Modal, ModalBody, ModalTitle } from '~shared/ui/modal';
import ShareTg from '~app/assets/ShareTg.svg?react';
import ShareVk from '~app/assets/ShareVk.svg?react';
import ShareLink from '~app/assets/ShareLink.svg?react';
import { useRef } from 'react';
import type { EventModalProps } from './types';
import styles from './EventModal.module.css';

export function EventModal({
  isOpen,
  closeModal,
  fullTitle,
  children,
}: EventModalProps) {
  const shareTgHandler = () => {
    console.log('Share on Telegram');
  };
  const shareVkHandler = () => {
    console.log('Share on VK');
  };
  const shareLinkHandler = () => {
    console.log('Share via link');
  };
  const scrollableRef = useRef<HTMLDivElement>(null);

  return (
    <Modal
      scrollableRef={scrollableRef}
      isOpen={isOpen}
      onClose={closeModal}
      className={styles.Modal}
    >
      <ModalTitle className={styles.Wrap}>
        <button style={{ opacity: 0, position: 'absolute' }} type="button">
          fix
        </button>
        <Typography component="h2" weight="demiBold" className={styles.Title}>
          {fullTitle}
        </Typography>
        <div className={styles.DateShareRow}>
          <div className={styles.ShareRow}>
            <Typography className={styles.Date}>Поделиться:</Typography>
            <ShareTg className={styles.Pointer} onClick={shareTgHandler} />
            <ShareVk className={styles.Pointer} onClick={shareVkHandler} />
            <ShareLink className={styles.Pointer} onClick={shareLinkHandler} />
          </div>
        </div>
      </ModalTitle>
      <ModalBody ref={scrollableRef}>{children}</ModalBody>
    </Modal>
  );
}
