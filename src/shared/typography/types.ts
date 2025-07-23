import type { HTMLAttributes } from 'react';

export interface ITypographyProps extends HTMLAttributes<HTMLElement> {
  component?: TComponent;
  weight?: TWeight;
  color?: TColor;
  size?: number;
}

export type TColor =
  | 'black'
  | 'white'
  | 'blue'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'custom';

type TComponent = 'h1' | 'h2' | 'h3' | 'div' | 'p' | 'span';

export type TWeight = 'regular' | 'medium' | 'demiBold';
