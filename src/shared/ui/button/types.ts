import type { ReactNode } from 'react';

type TButtonColor = 'black' | 'yellow' | 'white';
type TButtonSize = 'big' | 'medium';

export type TButtonProps = {
  color?: TButtonColor;
  size?: TButtonSize;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  isLink?: boolean;
  url?: string;
};
