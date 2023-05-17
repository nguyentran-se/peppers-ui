import { ComponentGenre } from '@types';
import clsx from 'clsx';
import Icon from 'components/Icon';
import React, { forwardRef } from 'react';
import { useUtilityClasses } from 'utils';
import './index.scss';

export const peppersButtonColor = [
  'inherit',
  'primary',
  'secondary',
  'success',
  'error',
  'info',
  'warning',
] as const;
type PeppersButtonColor = typeof peppersButtonColor[number];

export const peppersButtonVariant = ['contained', 'outlined', 'text'] as const;
type PeppersButtonVariant = typeof peppersButtonVariant[number];

export const peppersButtonSize = ['large', 'medium', 'small'] as const;
type PeppersButtonSize = typeof peppersButtonSize[number];

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  children: React.ReactNode;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  classes?: string | string[];
  disabled?: boolean;
  color?: PeppersButtonColor;
  variant?: PeppersButtonVariant;
  size?: PeppersButtonSize;
}
// type ButtonP = {
//   children: React.ReactNode;
//   startIcon?: React.ReactElement;
//   endIcon?: React.ReactElement;
//   classes?: string | string[];
//   disabled?: boolean;
//   color?: PeppersButtonColor;
//   variant?: PeppersButtonVariant;
//   size?: PeppersButtonSize;
// } & React.ComponentPropsWithRef<'button'>;

function Button(
  {
    children,
    variant = 'contained',
    disabled = false,
    classes = '',
    color = 'primary',
    size = 'medium',
    startIcon,
    endIcon,
    ...props
  }: ButtonProps,
  forwardedRef?: React.ForwardedRef<HTMLButtonElement>,
) {
  const styledProps = {
    variant,
    disabled,
    color,
    size,
  };

  const utilityClasses = useUtilityClasses(ComponentGenre.BUTTON, styledProps);

  return (
    <button
      className={clsx(classes, 'peppers-btn', utilityClasses)}
      ref={forwardedRef}
      disabled={disabled}
      {...props}
    >
      {startIcon && <Icon classes="peppers-btn--startIcon" icon={startIcon} />}
      {children}
      {endIcon && <Icon classes="peppers-btn--endIcon" icon={endIcon} />}
    </button>
  );
}

export default forwardRef(Button);
