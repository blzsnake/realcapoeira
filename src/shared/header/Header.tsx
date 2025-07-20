// Components
import { Link } from '@tramvai/module-router';
import { Button } from '~shared/button/Button';
// Hooks
import { useMediaQuery } from 'react-responsive';
// Assets
import Logo from './assets/rc_logo.svg?react';
import Menu from './assets/menu.svg?react';
// Styles
import styles from './Header.module.css';

export function Header() {
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  const logoSize = isDesktop ? 64 : 48;

  return (
    <header className={styles.Header}>
      <div className={styles.Contents}>
        <Link url="/" aria-label="На главную">
          <Logo width={logoSize} height={logoSize} />
        </Link>
        {isDesktop && (
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
        )}
      </div>
      {!isDesktop && <Menu width={24} height={24} />}
      {isDesktop && (
        <Button color="yellow" className={styles.Button}>
          Записаться на занятие
        </Button>
      )}
    </header>
  );
}
