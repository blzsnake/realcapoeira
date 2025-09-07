import type { TypeOption } from '~shared/hooks/useQueryParams';

export type TabsContentProps = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

export type TabsContentCityProps = {
  activeTab?: string;
  changeHander: (a: string) => () => void;
  city?: string;
};

export type TabsContenGroupsProps = {
  activeTab?: string;
  changeHander: () => void;
  groups: TypeOption[];
  selectedGroups: TypeOption[];
};
