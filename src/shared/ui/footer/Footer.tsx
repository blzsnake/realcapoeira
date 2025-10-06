import cn from 'classnames';
import { useRoute } from '@tramvai/module-router';
import { Typography } from '~shared/ui/typography';
import Telegram from '~app/assets/telegram.svg?react';
import Youtube from '~app/assets/youtube.svg?react';
import Vk from '~app/assets/vk.svg?react';
import styles from './Footer.module.css';

export function Footer() {
  const { path } = useRoute();

  const isGrayFooter = path === '/about-capoeira/';

  return path.includes('filials') ? null : (
    <footer className={cn(styles.Footer, { [styles.Dark]: isGrayFooter })}>
      <div className={styles.InnerContainer}>
        <div className={styles.Copyright}>
          <Typography
            component="span"
            className={cn({ [styles.Light]: isGrayFooter })}
          >
            © Официальный сайт школы “Real Capoeira”
          </Typography>
        </div>
        <div className={styles.Socials}>
          <Typography
            component="span"
            className={cn({ [styles.Light]: isGrayFooter })}
          >
            Мы в соцсетях
          </Typography>
          <div className={styles.Links}>
            <a
              href="https://t.me/real_capoeira"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Telegram className={styles.SocialLink} />
            </a>

            <a
              href="https://youtube.com/@realcapoeira1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className={styles.SocialLink} />
            </a>

            <a
              href="https://vk.com/realcapoeira"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Vk className={styles.SocialLink} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
