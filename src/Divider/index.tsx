import { ComponentGenre } from '@types';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { useUtilityClasses } from 'utils';
import './index.scss';
export interface DividerProps extends ComponentPropsWithRef<'div'> {
  classes?: string | string[];
}
function Divider(
  { classes, ...props }: DividerProps,
  forwardedRef?: React.ForwardedRef<HTMLDivElement>,
) {
  const styledProps = {};

  const utilityClasses = useUtilityClasses(ComponentGenre.DIVIDER, styledProps);

  return (
    <div
      className={clsx(classes, 'peppers-divider', utilityClasses)}
      ref={forwardedRef}
      {...props}
    ></div>
  );
}

export default forwardRef(Divider);
