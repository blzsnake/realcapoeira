import { SignUpForm } from '~shared/ui/SignUpFormGroup/SignUpForm';
import { ContactsPart } from './ui/ContactsPart';
import styles from './Coaches.module.css';

export function CoachesPage() {
  return (
    <main className={styles.Wrap}>
      <div className={styles.MainWrap}>
        <ContactsPart />
        <div className={styles.Form}>
          <SignUpForm contactsVariant />
        </div>
      </div>
    </main>
  );
}

CoachesPage.seo = {
  metaTags: {
    title: 'Тренеры Real Capoeira',
  },
};

export default CoachesPage;
