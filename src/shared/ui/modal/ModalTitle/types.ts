export type TModalTitleProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  variant?: TModalVariant;
};

type TModalVariant = 'left' | 'center';
