import { SignUpForm } from '~shared/ui/SignUpFormGroup/SignUpForm';
import styles from './Contacts.module.css';
import { ContactsPart } from './ui/ContactsPart';

export function ContactsPage() {
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

ContactsPage.seo = {
  metaTags: {
    title: 'Контакты Real Capoeira',
  },
};

export default ContactsPage;
