import { HeaderPart } from './ui/HeaderPart';
import styles from './AboutCapoeira.module.css';
import { HistoryAndMasters } from './ui/HistoryAndMasters/HistoryAndMasters';

export function AboutCapoeiraPage() {
  return (
    <main className={styles.MainWrap}>
      <HeaderPart />
      <div className={styles.PageContent}>
        <HistoryAndMasters />
      </div>
    </main>
  );
}

AboutCapoeiraPage.seo = {
  metaTags: {
    title: 'Что такое капоэйра',
  },
};

export default AboutCapoeiraPage;
