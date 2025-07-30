import { useRef } from 'react';
import { SchoolPhoto } from './ui/SchoolPhoto';
import { Events } from './ui/Events';
import { About } from './ui/About';
import { Stats } from './ui/Stats';
import { Groups } from './ui/Groups';
import { SignUp } from './ui/SignUp';
import { Video } from './ui/Video';
import { Worldwide } from './ui/Worldwide';
import styles from './index.module.css';

export function IndexPage() {
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const scrollHandler = () => {
    eventsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className={styles.MainWrap}>
      <SchoolPhoto scrollHandler={scrollHandler} />
      <div ref={eventsRef} className={styles.Content}>
        <Events />
        <About />
        <Stats />
      </div>
      <div className={styles.ContentWithoutPadding}>
        <Groups />
        <Video />
        <Worldwide />
        <SignUp />
      </div>
    </main>
  );
}

IndexPage.seo = {
  metaTags: {
    title: 'Real Capoeira',
  },
};

export default IndexPage;
