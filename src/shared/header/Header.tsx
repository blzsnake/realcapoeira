import { BrowserView, isBrowser, MobileView } from 'react-device-detect';
import { Link } from '@tramvai/module-router';
import { Button } from '~shared/button/Button';
import Logo from './assets/rc_logo.svg?react';
import Menu from './assets/menu.svg?react';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.Contents}>
        <Link url="/" aria-label="На главную">
          <Logo width={isBrowser ? 64 : 48} height={isBrowser ? 64 : 48} />
        </Link>
        <BrowserView>
          <nav className={styles.Contents}>
            <Link url="/" aria-label="О школе">
              <p>О школе</p>
            </Link>
            <Link url="/" aria-label="Что такое капоэйра">
              <p>Что такое капоэйра</p>
            </Link>
            <Link url="/" aria-label="Филиалы">
              <p>Филиалы</p>
            </Link>
            <Link url="/" aria-label="Инструкторы">
              <p>Инструкторы</p>
            </Link>
            <Link url="/" aria-label="Контакты">
              <p>Контакты</p>
            </Link>
          </nav>
        </BrowserView>
      </div>
      <MobileView>
        <Menu />
      </MobileView>
      <BrowserView>
        <Button color="yellow" className={styles.Button}>
          Записаться на занятие
        </Button>
      </BrowserView>
    </header>
  );
}
