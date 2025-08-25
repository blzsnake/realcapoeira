import { Button } from '~shared/ui/button/Button';
import { Typography } from '~shared/ui/typography';
import Brazil from '~app/assets/Brazil.svg?react';
import Video1 from '~app/assets/Video1.svg?react';
import Video2 from '~app/assets/Video2.svg?react';
import Video3 from '~app/assets/Video3.svg?react';
import Video4 from '~app/assets/Video4.svg?react';
import Video5 from '~app/assets/Video5.svg?react';
import styles from './Video.module.css';

export function Video() {
  const downloadClick = () => {
    window.open(`http://capoeiradaily.onelink.me/vbMQ/rc_site`, '_blank');
  };

  return (
    <div className={styles.Video}>
      <div className={styles.Row}>
        <div className={styles.SmallRow}>
          <Brazil className={styles.Logo} />
          <div className={styles.Column}>
            <Typography
              component="h3"
              color="white"
              className={styles.Heading}
              weight="demiBold"
            >
              Бесплатные видеоуроки
            </Typography>
            <Typography color="white" className={styles.Description}>
              Скачайте приложение Capoeira daily — сможете тренироваться, не
              выходя из дома
            </Typography>
            <Button
              color="white"
              className={styles.MobileButton}
              onClick={downloadClick}
            >
              <Typography className={styles.ButtonText} weight="medium">
                Скачать
              </Typography>
            </Button>
          </div>
        </div>
        <Button
          color="white"
          className={styles.WebButton}
          onClick={downloadClick}
        >
          <Typography className={styles.ButtonText} weight="medium">
            Скачать
          </Typography>
        </Button>
      </div>
      <div className={styles.VideoRow}>
        <Video1 />
        <Video2 />
        <Video3 />
        <Video4 />
        <Video5 className={styles.Video5} />
      </div>
    </div>
  );
}
