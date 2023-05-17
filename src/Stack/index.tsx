import { ComponentGenre } from '@types';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { useUtilityClasses } from 'utils';
import './index.scss';

export const direction = ['column-reverse', 'column', 'row-reverse', 'row'] as const;
type Direction = typeof direction[number];

export interface StackProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
  classes?: string | string[];
  direction?: Direction;
  divider?: React.ReactNode;
  spacing?: number | string;
}

function Stack(
  { children, classes = '', direction = 'row', divider = null, spacing }: StackProps,
  forwardedRef?: React.ForwardedRef<HTMLDivElement>,
) {
  const styledProps = { direction, spacing };
  const utilityClasses = useUtilityClasses(ComponentGenre.STACK, styledProps);

  const transformedChildren = React.Children.map(children, (child) => (
    <React.Fragment>
      {child}
      {divider}
    </React.Fragment>
  ));

  return (
    <div className={clsx(classes, 'peppers-stack', utilityClasses)} ref={forwardedRef}>
      {transformedChildren}
    </div>
  );
}

export default forwardRef(Stack);
