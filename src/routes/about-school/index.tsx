import { Typography } from '~shared/ui/typography';
import { HeaderPart } from './ui/HeaderPart';
import { AgesActivities } from './ui/AgesActivities';
import { FilialsByAges } from './ui/FilialsByAges';
import { AboutUs } from './ui/AboutUs';
import styles from './AboutSchool.module.css';
import { HowToPrepair } from './ui/HowToPrepair/HowToPrepair';

export function AboutSchoolPage() {
  return (
    <main className={styles.MainWrap}>
      <div className={styles.ContentWithoutPadding}>
        <HeaderPart />
      </div>
      <div className={styles.Content}>
        <AboutUs />
        <AgesActivities />
      </div>
      <div className={styles.ContentWithoutPadding}>
        <FilialsByAges />
      </div>
      <div className={styles.Content}>
        <HowToPrepair />
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
