import dayjs from 'dayjs';
import { Typography } from '~shared/ui/typography';
import { Modal, ModalBody, ModalTitle } from '~shared/ui/modal';
import ShareTg from '~app/assets/ShareTg.svg?react';
import ShareVk from '~app/assets/ShareVk.svg?react';
import ShareLink from '~app/assets/ShareLink.svg?react';
import type { EventModalProps } from './types';
import styles from './EventModal.module.css';

export function EventModal({
  isOpen,
  closeModal,
  title,
  date,
  text,
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

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className={styles.Modal}>
      <ModalTitle className={styles.Wrap}>
        <Typography component="h2" weight="demiBold" className={styles.Title}>
          {title}
        </Typography>
        <div className={styles.DateShareRow}>
          <Typography className={styles.Date}>
            {dayjs(date).format('DD.MM.YY')}
          </Typography>
          <div className={styles.ShareRow}>
            <Typography className={styles.Date}>Поделиться:</Typography>
            <ShareTg className={styles.Pointer} onClick={shareTgHandler} />
            <ShareVk className={styles.Pointer} onClick={shareVkHandler} />
            <ShareLink className={styles.Pointer} onClick={shareLinkHandler} />
          </div>
        </div>
      </ModalTitle>
      <ModalBody>
        <Typography className={styles.Text}>{text}</Typography>
      </ModalBody>
    </Modal>
  );
}
