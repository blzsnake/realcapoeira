import type { TypeOption } from '~shared/types/filials';
import type { TypeOptionGroup } from '~shared/content/catalogs';

export type FilterModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  cityOptions: TypeOptionGroup[];
  coachOptions: TypeOption[];
};
