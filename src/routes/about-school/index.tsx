import { HeaderPart } from './ui/HeaderPart';
import { AboutUs } from './ui/AboutUs';
import styles from './AboutSchool.module.css';

export function AboutSchoolPage() {
  return (
    <main className={styles.MainWrap}>
      <div className={styles.ContentWithoutPadding}>
        <HeaderPart />
      </div>
      <div className={styles.Content}>
        <AboutUs />
      </div>
    </main>
  );
}

AboutSchoolPage.seo = {
  metaTags: {
    title: 'О школе Real Capoeira',
  },
};

export default AboutSchoolPage;
