import type { TypeOption } from '~shared/types/filials';

export type TSignUpFormProps = {
  contactsVariant?: boolean;
  theme?: string;
  defaultFilial?: string;
  filialOptions?: TypeOption[];
  preferredCoachSlug?: string;
};

export type TSignUpFormValues = {
  name: string;
  phone: string;
  filial: string;
  agreement: boolean;
};

export type TSignUpFormErrors = {
  name?: string;
  phone?: string;
  filial?: string;
  agreement?: string;
};
