export type TModalBodyProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  scroll?: TScroll;
};

type TScroll = 'scroll' | 'none' | 'inner';
