import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import styles from './SignUpForm.module.css';

export function SignUpForm() {
  return (
    <form className={styles.Form}>
      <div className={styles.Description}>
        Позвоните или оставьте заявку — тренер ответит на все вопросы и подберет
        подходящую группу для вас или ребенка
      </div>
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
          <select className={styles.Input} id="filial">
            <option>Любой</option>
            <option>Выбор два</option>
            <option>Выбор три</option>
          </select>
        </label>
      </div>
      <div className={styles.FieldRow}>
        <div className={styles.AgreementRow}>
          <input
            type="checkbox"
            id="agreement"
            name="agreement"
            className={styles.Checkbox}
          />
          <label htmlFor="agreement" className={styles.FieldLabel}>
            Я даю согласие на обработку моих персональных данных
          </label>
        </div>
      </div>
      <div className={styles.FieldRow}>
        <Button color="yellow" className={styles.Button}>
          <span>Оставить заявку</span>
        </Button>
      </div>
    </form>
  );
}
