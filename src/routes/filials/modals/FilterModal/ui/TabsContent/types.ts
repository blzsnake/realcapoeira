import type { TypeOption } from '~shared/types/filials';

export type TabsContentProps = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

export type TabsContentCityProps = {
  activeTab?: string;
  changeHander: (value: TypeOption | null) => void;
  city?: string;
  options: TypeOption[];
};

export type TabsContenGroupsProps = {
  activeTab?: string;
  changeHander: (value: TypeOption[]) => void;
  groups: TypeOption[];
  selectedGroups: TypeOption[] | null;
};
