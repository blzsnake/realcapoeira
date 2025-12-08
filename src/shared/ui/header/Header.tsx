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

const normalizePath = (path: string): string =>
  path.endsWith('/') ? path : `${path}/`;

const isLinkActive = (actualPath: string, linkRoute: string): boolean => {
  const normalizedActual = normalizePath(actualPath);
  const normalizedLink = normalizePath(linkRoute);

  if (normalizedLink === '/') {
    return normalizedActual === normalizedLink;
  }

  return (
    normalizedActual === normalizedLink ||
    normalizedActual.startsWith(normalizedLink)
  );
};
const DESKTOP_BREAKPOINT = 1025;

const getLinkActiveStyle = (ap: string, lr: string): string =>
  isLinkActive(ap, lr) ? styles.Active : '';

export function Header() {
  const { actualPath } = useRoute();
  const $setModalState = useEvents(setModalState);
  const isGrayBgRoute = actualPath === '/' || actualPath === '/about-school/';
  const isCoachDetailsRoute =
    actualPath.startsWith('/coaches/') && actualPath !== '/coaches/';
  const isOverlayRoute =
    actualPath === '/about-capoeira/' || isCoachDetailsRoute;
  const isCoachesRootRoute = actualPath.startsWith('/coaches/');

  const [isDesktopWidth, setIsDesktopWidth] = useState(() =>
    typeof window === 'undefined'
      ? true
      : window.innerWidth >= DESKTOP_BREAKPOINT
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(
      `(min-width: ${DESKTOP_BREAKPOINT}px)`
    );
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktopWidth(event.matches);
    };

    setIsDesktopWidth(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const shouldUseCoachDarkOverlay = isCoachDetailsRoute && !isDesktopWidth;

  const coachOverlayBgClass = shouldUseCoachDarkOverlay
    ? styles.BlackBg
    : styles.WhiteBg;

  const overlayInitialBgClass = isCoachDetailsRoute
    ? coachOverlayBgClass
    : styles.TransparentBg;

  // eslint-disable-next-line no-nested-ternary
  const initialBgClass = isOverlayRoute
    ? overlayInitialBgClass
    : isGrayBgRoute
      ? styles.GrayBg
      : styles.WhiteBg;

  const [bgClass, setBgClass] = useState(initialBgClass);

  useEffect(() => {
    setBgClass(initialBgClass);
  }, [initialBgClass]);

  useEffect(() => {
    const marker = document.getElementById('#headerScrollMarker');
    const scrollHandler = debounce(() => {
      if (!marker) return;
      const { bottom } = marker.getBoundingClientRect();

      if (isOverlayRoute) {
        const overlayBgClass = isCoachDetailsRoute
          ? coachOverlayBgClass
          : styles.TransparentBg;

        setBgClass(bottom < 0 ? styles.WhiteBg : overlayBgClass);
        return;
      }

      if (isGrayBgRoute) {
        setBgClass(bottom < 0 ? styles.WhiteBg : styles.GrayBg);
      }
    }, 0);

    if (marker && (isOverlayRoute || isGrayBgRoute)) {
      window.addEventListener('scroll', scrollHandler, { passive: true });
      scrollHandler();
    }
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [
    isOverlayRoute,
    isGrayBgRoute,
    isCoachDetailsRoute,
    shouldUseCoachDarkOverlay,
    coachOverlayBgClass,
  ]);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToForm = () => {
    const elem = document.getElementById('signup');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    else $setModalState({ type: 'signUp', isOpen: true });
  };

  useLockBodyScroll(isMobileMenuOpen);

  const isTransparentOverlay =
    isOverlayRoute && !isCoachesRootRoute && bgClass === styles.TransparentBg;
  const isCoachDarkOverlay = isCoachDetailsRoute && bgClass === styles.BlackBg;
  const headerWrapMod =
    isTransparentOverlay || isCoachDarkOverlay ? styles.Light : '';

  const shouldUseLightMobileMenu =
    isCoachDetailsRoute && bgClass !== styles.WhiteBg;
  const mobileMenuClassName = `${styles.MobileMenu} ${
    shouldUseLightMobileMenu ? styles.MobileMenuLight : ''
  }`.trim();

  return (
    <>
      <header className={`${styles.HeaderWrap} ${headerWrapMod} ${bgClass}`}>
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
                <Link viewTransition url="/filials/" aria-label="Филиалы">
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
                <Link viewTransition url="/coaches/" aria-label="Тренеры">
                  <Typography
                    weight={
                      isLinkActive(actualPath, '/coaches/')
                        ? 'demiBold'
                        : 'regular'
                    }
                    className={getLinkActiveStyle(actualPath, '/coaches/')}
                  >
                    Тренеры
                  </Typography>
                </Link>
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
            className={mobileMenuClassName}
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
