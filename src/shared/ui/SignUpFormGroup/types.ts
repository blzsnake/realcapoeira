import type { TypeOption } from '~shared/types/filials';

export type TSignUpFormGroupProps = {
  theme?: string;
  title?: string;
  description?: string;
  phone: string;
  children?: React.ReactNode;
  className?: string;
  defaultFilial?: string;
  filialOptions?: TypeOption[];
  preferredCoachSlug?: string;
};
