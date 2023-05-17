import { ComponentGenre } from '@types';
import clsx from 'clsx';
import React from 'react';
import { useUtilityClasses } from 'utils';
import './index.scss';
interface IconProps {
  classes?: string | string[];
  icon: React.ReactElement;
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  // color?: string
}
function Icon({ classes, icon, size = 'medium', disabled }: IconProps) {
  const styledProps = {
    size,
    disabled,
  };
  const utilityClasses = useUtilityClasses(ComponentGenre.ICON, styledProps);

  return <span className={clsx(classes, 'peppers-icon', utilityClasses)}>{icon}</span>;
}

export default Icon;
