import { Link } from '@tramvai/module-router';
import { Typography } from '~shared/ui/typography';
import Telegram from '../../../app/assets/telegram.svg?react';
import Youtube from '../../../app/assets/youtube.svg?react';
import Vk from '../../../app/assets/vk.svg?react';

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
          <Link url="/" aria-label="TG">
            <Telegram className={styles.SocialLink} />
          </Link>
          <Link url="/" aria-label="Youtube">
            <Youtube className={styles.SocialLink} />
          </Link>
          <Link url="/" aria-label="VK">
            <Vk className={styles.SocialLink} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
