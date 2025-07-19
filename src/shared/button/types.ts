import type { ReactNode } from 'react';

type TButtonColor = 'black' | 'yellow';

export type TButtonProps = {
  color?: TButtonColor;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};
