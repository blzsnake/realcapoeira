import type { TSignUpFormErrors, TSignUpFormValues } from '../types';

export function validatePhoneNumber(input: string): boolean {
  const phoneRegex =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return phoneRegex.test(input);
}

function validateName(value: string): boolean {
  const fioRegex = /^([A-Za-zА-ЯЁ][a-zа-яё-]{1,} ?){1,3}$/u;

  return fioRegex.test(value);
}

export function validate(value: TSignUpFormValues): TSignUpFormErrors | null {
  const errors: TSignUpFormErrors = {};

  if (!value.name) {
    errors.name = 'Не заполено';
  }

  if (value.name && !validateName(value.name)) {
    errors.name = 'Не верно заполнено имя';
  }

  if (!value.phone) {
    errors.phone = 'Не заполено';
  }

  if (value.phone && !validatePhoneNumber(value.phone)) {
    errors.phone = 'Не верно заполнен телефон';
  }

  if (!value.agreement) {
    errors.agreement = 'Без согласия не сможем с вами связаться';
  }

  return Object.keys(errors).length ? errors : null;
}
