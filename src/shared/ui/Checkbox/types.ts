export type TCheckboxProps = {
  name?: string;
  onChange?: (e: any) => void;
  className?: string;
  text: string;
  checked: boolean;
  error?: string;
  disabled?: boolean;
};
