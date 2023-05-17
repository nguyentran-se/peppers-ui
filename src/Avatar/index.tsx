import { ComponentGenre } from '@types';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { stringAvatar, useUtilityClasses } from 'utils';
import './index.scss';
const DUMMY_SRC =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';

export interface AvatarProps extends React.ComponentPropsWithRef<'img'> {
  src?: string;
  children?: string;
  classes?: string | string[];
  size?: 'large' | 'medium' | 'small';
  as?: keyof JSX.IntrinsicElements;
}

function Avatar(
  { classes, src = DUMMY_SRC, size = 'medium', children, as: Comp = 'div', ...props }: AvatarProps,
  forwardedRef?: React.ForwardedRef<HTMLImageElement>,
) {
  const styledProps = { size };

  const utilityClasses = useUtilityClasses(ComponentGenre.AVATAR, styledProps);

  return (
    <Comp className={clsx(classes, 'peppers-avatar', utilityClasses)}>
      {!children && (
        <img
          className="peppers-avatarImage"
          src={src}
          alt="peppers avatar"
          ref={forwardedRef}
          {...props}
        />
      )}
      {children && (
        <span
          className="peppers-avatarString"
          style={{ backgroundColor: stringAvatar(children).bg }}
        >
          {stringAvatar(children).display}
        </span>
      )}
    </Comp>
  );
}

export default forwardRef(Avatar);
