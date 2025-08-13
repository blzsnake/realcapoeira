import { Typography } from '~shared/ui/typography';
import Telegram from '~app/assets/telegram.svg?react';
import Youtube from '~app/assets/youtube.svg?react';
import Vk from '~app/assets/vk.svg?react';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Copyright}>
        <Typography component="span">
          © Официальный сайт школы “Real Capoeira”
        </Typography>
      </div>
      <div className={styles.Socials}>
        <Typography component="span">Мы в соцсетях</Typography>
        <div className={styles.Links}>
          <Telegram
            className={styles.SocialLink}
            onClick={() => window.open('https://t.me/real_capoeira', '_blank')}
          />

          <Youtube className={styles.SocialLink} />

          <Vk
            className={styles.SocialLink}
            onClick={() => window.open('https://vk.com/realcapoeira', '_blank')}
          />
        </div>
      </div>
    </footer>
  );
}
