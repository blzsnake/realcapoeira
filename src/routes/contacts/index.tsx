import { Typography } from '~shared/ui/typography';
import { SignUpForm } from '~shared/ui/SignUpFormGroup/SignUpForm';
import styles from './Contacts.module.css';

export function ContactsPage() {
  return (
    <main className={styles.Wrap}>
      <div className={styles.MainWrap}>
        <div className={styles.Content}>
          <Typography weight="medium" className={styles.Title}>
            КОНТАКТЫ
          </Typography>
        </div>
        <div className={styles.Form}>
          <SignUpForm contactsVariant />
        </div>
      </div>
    </main>
  );
}

ContactsPage.seo = {
  metaTags: {
    title: 'Контакты Real Capoeira',
  },
};

export default ContactsPage;
