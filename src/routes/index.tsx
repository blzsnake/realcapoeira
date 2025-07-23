import { SchoolPhoto } from './ui/SchoolPhoto';
import { Events } from './ui/Events';
import { About } from './ui/About';
import styles from './index.module.css';

export function IndexPage() {
  return (
    <main>
      <SchoolPhoto />
      <div className={styles.Content}>
        <Events />
        <About />
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
