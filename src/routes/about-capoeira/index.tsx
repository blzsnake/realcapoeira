import { HeaderPart } from './ui/HeaderPart';
import styles from './AboutCapoeira.module.css';

export function AboutCapoeiraPage() {
  return (
    <main className={styles.Wrap}>
      <HeaderPart />
    </main>
  );
}

AboutCapoeiraPage.seo = {
  metaTags: {
    title: 'Что такое капоэйра',
  },
};

export default AboutCapoeiraPage;
