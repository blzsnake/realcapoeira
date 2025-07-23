import type { ElementType } from 'react';
import { forwardRef } from 'react';
import cn from 'classnames';
import type { ITypographyProps } from './types';
import styles from './Typography.module.css';

export const Typography = forwardRef<HTMLDivElement, ITypographyProps>(
  (
    {
      component = 'p',
      size,
      weight = 'regular',
      color = 'black',
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const typographyStyles = cn(
      styles.Typography,
      styles[weight],
      color !== 'custom' && styles[color],
      className
    );

    const combinedStyle: React.CSSProperties = {
      ...style,
      ...(size !== undefined ? { fontSize: `${size}px` } : {}),
    };

    const Component = component as ElementType;

    return (
      <Component
        {...(props as any)}
        ref={ref}
        className={typographyStyles}
        style={combinedStyle}
      >
        {children}
      </Component>
    );
  }
);
