import { Button } from '~shared/ui/button/Button';
import { Typography } from '~shared/ui/typography';
import Brazil from '~app/assets/brazil_2.svg?react';
import Video1 from '~app/assets/video1.png';
import Video2 from '~app/assets/video2.png';
import Video3 from '~app/assets/video3.png';
import Video4 from '~app/assets/video4.png';
import Video5 from '~app/assets/video5.png';
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
        <img src={Video1} alt="logo" />
        <img src={Video2} alt="logo" />
        <img src={Video3} alt="logo" />
        <img src={Video4} alt="logo" />
        <img src={Video5} alt="logo" className={styles.Video5} />
      </div>
    </div>
  );
}
