import { ComponentGenre } from '@types';
import clsx from 'clsx';
import Icon from 'components/Icon';
import React, { forwardRef } from 'react';
import { useUtilityClasses } from 'utils';
import './index.scss';

export interface IconButtonProps extends React.ComponentPropsWithRef<'button'> {
  children: React.ReactElement;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  classes?: string | string[];
  size?: 'large' | 'medium' | 'small';
  variant?: 'circle' | 'square';
}
const IconButton = (
  {
    children: icon,
    classes,
    color = 'default',
    size = 'medium',
    variant = 'circle',
    ...props
  }: IconButtonProps,
  forwardedRef?: React.ForwardedRef<HTMLButtonElement>,
) => {
  const styledProps = {
    color,
    size,
    variant,
  };
  const utilityClasses = useUtilityClasses(ComponentGenre.ICON_BUTTON, styledProps);

  return (
    <button
      className={clsx(classes, 'peppers-iconBtn', utilityClasses)}
      ref={forwardedRef}
      {...props}
    >
      <Icon icon={icon} />
    </button>
  );
};
export default forwardRef(IconButton);
