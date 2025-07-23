// Components
import { Link } from '@tramvai/module-router';
import { Button } from '~shared/ui/button/Button';
// Assets
import Logo from './assets/rc_logo.svg?react';
import Menu from './assets/menu.svg?react';
// Styles
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.HeaderWrap}>
      <div className={styles.Header}>
        <div className={styles.ContentWrapper}>
          <Link url="/" aria-label="На главную">
            <Logo />
          </Link>
          <div className="isDesktop">
            <nav className={`${styles.Contents} isDesktop`}>
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
          </div>
        </div>
        <Menu width={24} height={24} className="isTablet" />

        <div className="isDesktop">
          <Button color="yellow" className={styles.Button}>
            Записаться на занятие
          </Button>
        </div>
      </div>
    </header>
  );
}
