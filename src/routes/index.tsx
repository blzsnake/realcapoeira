import { SchoolPhoto } from './ui/SchoolPhoto';
import { Events } from './ui/Events';
import { About } from './ui/About';
import { Stats } from './ui/Stats';
import { Groups } from './ui/Groups';
import { SignUp } from './ui/SignUp';
import { Video } from './ui/Video';
import styles from './index.module.css';
import { Worldwide } from './ui/Worldwide';

export function IndexPage() {
  return (
    <main className={styles.MainWrap}>
      <SchoolPhoto />
      <div className={styles.Content}>
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
