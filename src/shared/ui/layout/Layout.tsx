import cn from 'classnames';
import { useRoute } from '@tramvai/module-router';
import type { PropsWithChildren } from 'react';
import styles from './Layout.module.css';

export function Layout({ children }: PropsWithChildren) {
  const { path } = useRoute();

  const isGray = path === '/about-capoeira/';

  const isOverlayRoute = path === '/about-capoeira/';

  return (
    <div
      className={cn(styles.Layout, {
        [styles.Gray]: isGray,
        [styles.NoPadding]: isOverlayRoute,
      })}
    >
      {children}
    </div>
  );
}
