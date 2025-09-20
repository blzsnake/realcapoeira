import { HeaderPart } from './ui/HeaderPart';
import styles from './AboutCapoeira.module.css';

export function AboutCapoeiraPage() {
  return (
    <main className={styles.Wrap}>
      <HeaderPart />
      {/* <div className={styles.ContentWithoutPadding}>
        
      </div> */}
    </main>
  );
}

AboutCapoeiraPage.seo = {
  metaTags: {
    title: 'Что такое капоэйра',
  },
};

export default AboutCapoeiraPage;
