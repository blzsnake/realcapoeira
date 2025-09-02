export type TSignUpFormProps = {
  contactsVariant?: boolean;
  theme?: string;
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
