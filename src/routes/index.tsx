import { SchoolPhoto } from './ui/SchoolPhoto';
import { Events } from './ui/Events';
import { About } from './ui/About';
import { Stats } from './ui/Stats';
import { Groups } from './ui/Groups';
import styles from './index.module.css';

export function IndexPage() {
  return (
    <main className={styles.MainWrap}>
      <SchoolPhoto />
      <div className={styles.Content}>
        <Events />
        <About />
        <Stats />
      </div>
      <Groups />
    </main>
  );
}

IndexPage.seo = {
  metaTags: {
    title: 'Real Capoeira',
  },
};

export default IndexPage;
