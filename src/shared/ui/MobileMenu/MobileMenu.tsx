// Components
import { Link } from '@tramvai/module-router';
import { Typography } from '~shared/ui/typography';
// Assets
import Logo from '~app/assets/RCLogo.svg?react';
import Close from '~app/assets/Close.svg?react';
import ArrowRight from '~app/assets/ArrowRight.svg?react';
// Styles
import styles from './MobileMenu.module.css';

type MobileMenuProps = { onClose: () => void };

const LINKS = [
  { url: '/about-school', label: 'О школе' },
  { url: '/about-capoeira', label: 'Что такое капоэйра' },
  { url: '/filials', label: 'Филиалы' },
  { url: '/trainers', label: 'Тренеры' },
  { url: '/contacts', label: 'Контакты' },
];

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className={styles.MobileMenu}>
      <div className={styles.MainBlock}>
        <div className={styles.Row}>
          <Link
            viewTransition
            url="/"
            onClick={onClose}
            aria-label="На главную"
          >
            <Logo width={48} height={48} />
          </Link>
          <button type="button" onClick={onClose} aria-label="Закрыть меню">
            <Close className={styles.Close} />
          </button>
        </div>

        <nav className={styles.LinksWrap} aria-label="Навигация по сайту">
          {LINKS.map(({ url, label }) => (
            <Link
              key={url}
              viewTransition
              url={url}
              aria-label={label}
              className={styles.LinkRow}
              onClick={onClose}
            >
              <Typography color="white">{label}</Typography>
              <ArrowRight width={24} height={24} className={styles.Arrow} />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
