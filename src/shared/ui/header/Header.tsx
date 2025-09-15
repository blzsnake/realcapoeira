import { useRoute } from '@tramvai/module-router';
import { useEffect, useState } from 'react';
import { useEvents } from '@tramvai/state';
// Assets
import Logo from '~app/assets/RCLogo.svg?react';
import Menu from '~app/assets/Menu.svg?react';
// Hooks
import { useLockBodyScroll } from '~shared/hooks/useLockBodyScroll';
// Components
import { Link } from '@tramvai/module-router';
import { Typography } from '~shared/ui/typography';
import { setModalState } from '~shared/ui/modal/store';
import { Button } from '~shared/ui/button/Button';
import { debounce } from '~shared/utils/debounce';
import { MobileMenu } from '../MobileMenu';
// Styles
import styles from './Header.module.css';

const isLinkActive = (actualPath: string, linkRoute: string): boolean =>
  actualPath === linkRoute;
const getLinkActiveStyle = (ap: string, lr: string): string =>
  isLinkActive(ap, lr) ? styles.Active : '';

const isGrayBgRoute = (path: string) =>
  path === '/' || path === '/about-school/' || path === '/about-capoeira/';

export function Header() {
  const { actualPath } = useRoute();
  const $setModalState = useEvents(setModalState);
  const headerBgClass = isGrayBgRoute(actualPath)
    ? styles.GrayBg
    : styles.WhiteBg;

  const [color, switchColor] = useState(headerBgClass);

  useEffect(() => {
    switchColor(headerBgClass);
  }, [headerBgClass]);

  useEffect(() => {
    const $elem = document.getElementById('#headerScrollMarker');
    const scrollHandler = debounce(() => {
      if (!$elem || !isGrayBgRoute(actualPath)) {
        return;
      }
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { bottom } = $elem?.getBoundingClientRect();
      if (bottom < 0 && color === styles.GrayBg) {
        switchColor(styles.WhiteBg);
      }
      if (bottom > 0 && color === styles.WhiteBg) {
        switchColor(styles.GrayBg);
      }
    }, 20);
    if ($elem) {
      window.addEventListener('scroll', scrollHandler);
    }

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [headerBgClass, actualPath, color]);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToForm = () => {
    const elem = document.getElementById('signup');

    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      $setModalState({ type: 'signUp', isOpen: true });
    }
  };

  useLockBodyScroll(isMobileMenuOpen);

  return (
    <>
      <header className={`${styles.HeaderWrap} ${color}`}>
        <div className={styles.Header}>
          <div className={styles.ContentWrapper}>
            <Link viewTransition url="/" aria-label="На главную">
              <Logo />
            </Link>
            <div className="isDesktop">
              <nav className={`${styles.Contents} isDesktop`}>
                <Link viewTransition url="/about-school/" aria-label="О школе">
                  <Typography
                    weight={
                      isLinkActive(actualPath, '/about-school/')
                        ? 'demiBold'
                        : 'regular'
                    }
                    className={getLinkActiveStyle(actualPath, '/about-school/')}
                  >
                    О школе
                  </Typography>
                </Link>
                <Link
                  viewTransition
                  url="/about-capoeira/"
                  aria-label="Что такое капоэйра"
                >
                  <Typography
                    weight={
                      isLinkActive(actualPath, '/about-capoeira/')
                        ? 'demiBold'
                        : 'regular'
                    }
                    className={getLinkActiveStyle(
                      actualPath,
                      '/about-capoeira/'
                    )}
                  >
                    Что такое капоэйра
                  </Typography>
                </Link>
                <Link viewTransition url="/filials" aria-label="Филиалы">
                  <Typography
                    weight={
                      isLinkActive(actualPath, '/filials/')
                        ? 'demiBold'
                        : 'regular'
                    }
                    className={getLinkActiveStyle(actualPath, '/filials/')}
                  >
                    Филиалы
                  </Typography>
                </Link>
                {/* <Link viewTransition url="/trainers/" aria-label="Инструкторы">
                  <Typography
                    weight={
                      isLinkActive(actualPath, '/trainers/')
                        ? 'demiBold'
                        : 'regular'
                    }
                    className={getLinkActiveStyle(actualPath, '/trainers/')}
                  >
                    Инструкторы
                  </Typography>
                </Link> */}
                <Link viewTransition url="/contacts" aria-label="Контакты">
                  <Typography
                    weight={
                      isLinkActive(actualPath, '/contacts/')
                        ? 'demiBold'
                        : 'regular'
                    }
                    className={getLinkActiveStyle(actualPath, '/contacts/')}
                  >
                    Контакты
                  </Typography>
                </Link>
              </nav>
            </div>
          </div>
          <Menu
            width={24}
            height={24}
            className={styles.MobileMenu}
            onClick={() => setMobileMenuOpen(true)}
          />

          <div className="isDesktop">
            <Button
              color="yellow"
              className={styles.Button}
              onClick={handleScrollToForm}
            >
              Записаться на занятие
            </Button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}
