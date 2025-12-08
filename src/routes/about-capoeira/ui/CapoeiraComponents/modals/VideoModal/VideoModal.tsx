import { Modal, ModalBody, ModalTitle } from '~shared/ui/modal';
import { Typography } from '~shared/ui/typography';
import { useRef } from 'react';
import type { VideoModalProps } from './types';
import styles from './VideoModal.module.css';

export function VideoModal({
  isOpen,
  closeModal,
  title,
  src,
}: VideoModalProps) {
  const scrollableRef = useRef<HTMLDivElement>(null);

  return (
    <Modal
      scrollableRef={scrollableRef}
      isOpen={isOpen}
      onClose={closeModal}
      className={styles.Modal}
    >
      {title && (
        <ModalTitle>
          <Typography component="h1" weight="demiBold" className={styles.Name}>
            {title}
          </Typography>
        </ModalTitle>
      )}
      <ModalBody ref={scrollableRef} className={styles.Body} scroll="inner">
        <div className={styles.FrameWrap}>
          <iframe
            src={src}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder={0}
            loading="lazy"
            title={title}
          />
        </div>
      </ModalBody>
    </Modal>
  );
}
