import type { InputHTMLAttributes } from 'react';

export interface TRadiobuttonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  text?: string;
}
