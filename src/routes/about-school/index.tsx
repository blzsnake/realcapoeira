import { SignUpFormGroup } from '~shared/ui/SignUpFormGroup';
import { HowToPrepair } from './ui/HowToPrepair/HowToPrepair';
import { HeaderPart } from './ui/HeaderPart';
import { AgesActivities } from './ui/AgesActivities';
import { FilialsByAges } from './ui/FilialsByAges';
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
        <AgesActivities />
      </div>
      <div className={styles.ContentWithoutPadding}>
        <FilialsByAges />
      </div>
      <div className={styles.Content}>
        <HowToPrepair />
      </div>
      <div className={styles.ContentWithoutPadding}>
        <SignUpFormGroup
          title="Запишитесь за пару минут"
          description="Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет подходящую группу для вас или ребенка"
          phone="+7 (925) 555 00 77"
        />
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
