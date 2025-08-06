export type TMobileSelector = {
  values: { name: string; value: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  className?: string;
};
