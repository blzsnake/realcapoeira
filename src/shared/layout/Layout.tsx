import { Header } from '~shared/header/Header';
import { Footer } from '~shared/footer/Footer';
import type { PropsWithChildren } from 'react';
import styles from './Layout.module.css';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className={styles.Layout}>
      <div className={styles.LayoutContent}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
