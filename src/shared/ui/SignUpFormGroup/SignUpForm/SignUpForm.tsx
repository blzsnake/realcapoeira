import { Link } from '@tramvai/module-router';
import { Typography } from '~shared/ui/typography';
import styles from './SignUpForm.module.css';
import type { TSignUpFormProps } from './types';

export function SignUpForm() {
  return (
    <form className={styles.Form}>
      <div className={styles.FieldRow}>
        <label htmlFor="fio" className={styles.FieldLabel}>
          <Typography weight="demiBold">Как вас зовут</Typography>
          <input type="text" className={styles.Input} id="fio" />
        </label>
        <label htmlFor="phone" className={styles.FieldLabel}>
          <Typography weight="demiBold">Телефон</Typography>
          <input type="text" className={styles.Input} id="phone" />
        </label>
      </div>
      <div className={styles.FieldRow}>
        <label htmlFor="filial" className={styles.FieldLabel}>
          <Typography weight="demiBold">Выберите филиал</Typography>
          <input type="text" className={styles.Input} id="filial" />
        </label>
      </div>
    </form>
  );
}
