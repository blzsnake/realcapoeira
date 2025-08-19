import { useEffect, useRef } from 'react';
import Select from 'react-select';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { FILIALS_MOCK } from '~shared/mocks';

import type { TSignUpFormProps } from './types';
import styles from './SignUpForm.module.css';

const OPTIONS = [
  { address: { city: 'Любой', street: '' } },
  ...FILIALS_MOCK,
].map((item) => ({
  value: `${item.address.city} ${item.address.street}`,
  label: `${item.address.city} ${item.address.street}`,
}));

const customStyles = {
  container: (base) => ({
    ...base,
    width: '100%',
    height: '48px',
  }),
  control: (base) => ({
    ...base,
    height: '100%',
    borderRadius: '8px',
    borderColor: '#cacaca',
    borderWidth: '1px',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '18px',
  }),
  // option: (base, state) => ({
  //   ...base,
  //   backgroundColor: state.isFocused ? 'lightgreen' : 'white',
  //   color: 'black',
  // }),
};

export function SignUpForm({ contactsVariant = false }: TSignUpFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const submitHander = () => {
    formRef?.current?.submit();
  };

  return (
    <form
      ref={formRef}
      className={styles.Form}
      method="GET"
      action="https://script.google.com/macros/s/AKfycbx6gBwcu62zsKCLikMpc840hyhYdcR1sqEqaHkD8vPt9nFgUOM3dNYh13Fg-zDAR2F0/exec"
    >
      {contactsVariant && (
        <Typography weight="demiBold" className={styles.Title}>
          Запишитесь за пару минут
        </Typography>
      )}
      {contactsVariant && (
        <Typography className={styles.ContactsDescription}>
          Позвоните или оставьте заявку — тренер ответит на все вопросы и
          подберет подходящую группу для вас или ребенка
        </Typography>
      )}
      {!contactsVariant && (
        <div className={styles.Description}>
          Позвоните или оставьте заявку — тренер ответит на все вопросы и
          подберет подходящую группу для вас или ребенка
        </div>
      )}
      <div className={styles.FieldRow}>
        <label htmlFor="name" className={styles.FieldLabel}>
          <Typography weight="demiBold">Как вас зовут</Typography>
          <input name="name" type="text" className={styles.Input} id="name" />
        </label>
        <label htmlFor="phone" className={styles.FieldLabel}>
          <Typography weight="demiBold">Телефон</Typography>
          <input name="phone" type="text" className={styles.Input} id="phone" />
        </label>
      </div>
      <div className={styles.FieldRow}>
        <label htmlFor="filial" className={styles.FieldLabel}>
          <Typography weight="demiBold">Выберите филиал</Typography>
          <Select
            options={OPTIONS}
            hideSelectedOptions={false}
            styles={customStyles}
            defaultValue={OPTIONS[0]}
            closeMenuOnSelect
            className={styles.Select}
          />
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
        <Button color="yellow" className={styles.Button} onClick={submitHander}>
          <span>Оставить заявку</span>
        </Button>
      </div>
    </form>
  );
}
