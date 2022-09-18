import React, { forwardRef, ReactElement, ReactNode, Ref } from 'react';
import './index.scss';

export interface ButtonProps {
  children: ReactNode;
  classes?: string[];
  disabled?: boolean;
  variant?: 'container' | 'outline' | 'text';
  startIcon?: ReactElement;
  endIcon?: ReactElement;
}

function Button({ children }: ButtonProps, ref?: Ref<HTMLButtonElement>) {
  return (
    <button className="peppers-btn" ref={ref}>
      {children}
    </button>
  );
}

export default forwardRef(Button);
