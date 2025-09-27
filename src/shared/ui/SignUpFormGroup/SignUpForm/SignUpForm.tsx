import { useRef, useState } from 'react';
import { InputMask } from '@react-input/mask';
import cn from 'classnames';
import Select from 'react-select';
import { Typography } from '~shared/ui/typography';
import { Button } from '~shared/ui/button/Button';
import { Checkbox } from '~shared/ui/Checkbox/Checkbox';
import { FILIALS_MOCK } from '~shared/mocks';
import { ModalStore, setModalState } from '~shared/ui/modal/store';
import { useEvents, useSelector } from '@tramvai/state';
import Success from '~app/assets/sucsess.png';
import { validate } from './utils/validate';

import type { TSignUpFormErrors, TSignUpFormProps } from './types';
import styles from './SignUpForm.module.css';
import { FormResultModal } from './modals/FormResultModal/FormResultModal';

const OPTIONS = [
  { address: { city: 'Любой', street: '' } },
  ...FILIALS_MOCK.moscow,
  ...FILIALS_MOCK.korolev,
  ...FILIALS_MOCK.krasnodar,
  ...FILIALS_MOCK.krasnogorsk,
  ...FILIALS_MOCK.kazan,
  ...FILIALS_MOCK.lissabon,
  ...FILIALS_MOCK.mytishi,
].reduce((arr, item) => {
  const idDuplicate = arr.find(
    (el) =>
      el.value ===
      `${item.address.city} ${item.address?.metro?.name || item.address?.street}`
  );

  return !idDuplicate
    ? [
        ...arr,
        {
          value: `${item.address.city} ${item.address?.metro?.name || item.address?.street}`,
          label: `${item.address.city} ${item.address?.metro?.name || item.address?.street}`,
        },
      ]
    : arr;
}, []);

export const customStyles = {
  container: (base) => ({
    ...base,
    width: '100%',
    height: '48px',
  }),
  control: (base, state) => ({
    ...base,
    height: '100%',
    borderRadius: '8px',
    borderColor: state.isFocused ? '#000 !important' : '#cacaca',
    boxShadow: state.isFocused ? '0 0 0 1px #000' : '0 0 0 1px #cacaca',
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

  // доработка мультиселекта
  clearIndicator: (base) => ({
    ...base,
    display: 'none',
  }),
  multiValueLabel: (base) => ({
    ...base,
    display: 'none',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#000',
    fontSize: '18px',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? 'rgba(202,202,202,0.1)' : 'white',
    color: 'black',
    ':active': {
      backgroundColor: 'rgba(202,202,202,0.1)',
    },
  }),
  groupHeading: (base, state) => ({
    ...base,
    fontSize: '18px',
    color: '#000',
    textTransform: 'none',
    fontWeight: 'bold',
  }),
};

const intitialFormState = {
  state: 'initial',
  name: '',
  phone: '',
  filial: '',
  agreement: false,
};

export function SignUpForm({ contactsVariant = false }: TSignUpFormProps) {
  const formRef = useRef<HTMLFormElement>(undefined);
  const [errors, setFormErrors] = useState<TSignUpFormErrors | null>(null);
  const address = useSelector(
    ModalStore,
    ({ modals }) => modals.signUp?.address
  );
  const [formData, setFormState] = useState(
    address ? { ...intitialFormState, filial: address } : intitialFormState
  );
  const $setModalState = useEvents(setModalState);
  const onModalSetState = (state: boolean) => () => {
    $setModalState({ type: 'formResult', isOpen: state });
    if (!state) {
      $setModalState({ type: 'signUp', isOpen: false });
    }
  };
  const isModalOpen = useSelector(
    ModalStore,
    ({ modals }) => modals.formResult?.isOpen
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErrors({
      ...errors,
      [name]: null,
    });
    setFormState((prevData) => ({
      ...prevData,
      [name]: value,
      state: 'dirty',
    }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormState((prevData) => ({
      ...prevData,
      [name]: checked,
      state: 'dirty',
    }));
  };
  const handleFilialChange = (e) => {
    const { value } = e;

    setFormState((prevData) => ({
      ...prevData,
      filial: value,
      state: 'dirty',
    }));
  };

  const submitHander = () => {
    const { name, phone, filial } = formData || {};
    const isErrors = validate(formData);
    setFormErrors(isErrors);

    if (!isErrors) {
      setFormState({
        ...formData,
        state: 'pending',
      });
      const data = new URLSearchParams({
        name,
        phone: phone.replace('+', ''),
        filial,
      }).toString();
      fetch(
        'https://script.google.com/macros/s/AKfycbxL78344WZLN5tod8P_FGPLPZXdeAsS-njMdeiayRSK48fEhpWtbrvTu_vCk3Za4Vu5/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data,
        }
      )
        .then(() => {
          setFormState({ ...intitialFormState, state: 'success' });
          onModalSetState(true)();
          formRef?.current?.reset();
        })
        .catch(() => {
          setFormState(intitialFormState);
          formRef?.current?.reset();
        });
    }
  };

  return (
    <div>
      <form
        ref={formRef}
        className={styles.Form}
        method="POST"
        action="https://script.google.com/macros/s/AKfycbxL78344WZLN5tod8P_FGPLPZXdeAsS-njMdeiayRSK48fEhpWtbrvTu_vCk3Za4Vu5/exec"
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
            <input
              name="name"
              type="text"
              className={cn(styles.Input, {
                [styles.InputError]: errors?.name,
              })}
              id="name"
              placeholder="Имя Фамилия"
              onChange={handleChange}
              disabled={formData.state === 'pending'}
              value={formData.name}
            />
          </label>
          {errors?.name && (
            <div className={styles.FieldErrorText}>{errors?.name}</div>
          )}
        </div>
        <div className={styles.FieldRow}>
          <label htmlFor="phone" className={styles.FieldLabel}>
            <Typography weight="demiBold">Телефон</Typography>
            <InputMask
              name="phone"
              type="tel"
              className={cn(styles.Input, {
                [styles.InputError]: errors?.phone,
              })}
              id="phone"
              placeholder="+"
              onChange={handleChange}
              disabled={formData.state === 'pending'}
              value={formData.phone}
              mask="+_____________"
              // eslint-disable-next-line @typescript-eslint/naming-convention
              replacement={{ _: /\d/ }}
            />
          </label>
          {errors?.phone && (
            <div className={styles.FieldErrorText}>{errors?.phone}</div>
          )}
        </div>
        <div className={styles.FieldRow}>
          <label htmlFor="filial" className={styles.FieldLabel}>
            <Typography weight="demiBold">Выберите филиал</Typography>
            <Select
              options={OPTIONS}
              hideSelectedOptions={false}
              styles={customStyles}
              defaultValue={
                address ? { label: address, value: address } : OPTIONS[0]
              }
              closeMenuOnSelect
              className={styles.Select}
              isDisabled={address || formData.state === 'pending'}
              onChange={handleFilialChange}
            />
          </label>
        </div>
        <div className={styles.FieldRow}>
          <div className={styles.AgreementRow}>
            <Checkbox
              name="agreement"
              checked={formData.agreement}
              text="Я даю согласие на обработку моих персональных данных"
              error={errors?.agreement}
              value="agreement"
              disabled={formData.state === 'pending'}
              className={cn(styles.Checkbox, {
                [styles.InputError]: errors?.agreement,
              })}
              onChange={handleCheckboxChange}
            >
              Я даю согласие на{' '}
              <a href="/politics.pdf" target="_blank">
                обработку моих персональных данных
              </a>
            </Checkbox>
            {errors?.agreement && (
              <div className={styles.FieldErrorText}>{errors?.agreement}</div>
            )}
          </div>
        </div>
        <div className={styles.FieldRow}>
          <Button
            color="yellow"
            className={styles.Button}
            onClick={submitHander}
            size="big"
            disabled={formData.state === 'pending'}
          >
            <span>Оставить заявку</span>
          </Button>
        </div>
      </form>
      <FormResultModal isOpen={isModalOpen} closeModal={onModalSetState(false)}>
        <div className={styles.FormResult}>
          <img src={Success} alt="Ok" className={styles.FormResultImage} />
          <div className={styles.FormResultHead}>
            <Typography weight="demiBold" className={styles.FormResultHeadText}>
              Готово
            </Typography>
          </div>
          <div>
            <Typography className={styles.FormResultText}>
              Вы стали на шаг ближе к поясу новичка!
            </Typography>
            <Typography className={styles.FormResultText}>
              Скоро вам позвоним
            </Typography>
          </div>
        </div>
      </FormResultModal>
    </div>
  );
}
