import { ComponentGenre } from '@types';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef } from 'react';
import { useUtilityClasses } from 'utils';
import './index.scss';
export interface TextFieldProps extends React.ComponentPropsWithRef<'input'> {
  id: string;
  classes?: string | string[];
  label?: string;
}
const textFieldClasses = {
  labelAnimate: 'peppers-formLabel--animate',
  labelPrimary: 'peppers-formLabel--primary',
  wrapperFocus: 'peppers-input--focus',
};
function TextField(
  { id, classes, label, disabled, onFocus, onBlur, ...props }: TextFieldProps,
  forwardedRef?: React.ForwardedRef<HTMLInputElement>,
) {
  const labelRef = useRef<HTMLLabelElement>(null);
  function handleFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    const inputEle = e.target;
    const labelEle = labelRef.current;
    const wrapperEle = inputEle.parentElement?.parentElement;

    labelEle?.classList.add(textFieldClasses.labelAnimate, textFieldClasses.labelPrimary);
    wrapperEle?.classList.add(textFieldClasses.wrapperFocus);

    if (onFocus) onFocus(e);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    const inputEle = e.target;
    const labelEle = labelRef.current;
    const wrapperEle = inputEle.parentElement?.parentElement;

    if (inputEle.value === '') labelEle?.classList.remove(textFieldClasses.labelAnimate);
    labelEle?.classList.remove(textFieldClasses.labelPrimary);
    wrapperEle?.classList.remove(textFieldClasses.wrapperFocus);

    if (onBlur) onBlur(e);
  }

  useEffect(() => {
    const inputEle = document.getElementById(id) as HTMLInputElement;
    if (inputEle.value) labelRef.current?.classList.add(textFieldClasses.labelAnimate);
  }, [id]);

  const styledProps = {
    //disabled: formControl
  };
  const utilityClasses = useUtilityClasses(ComponentGenre.TEXT_FIELD, styledProps);

  return (
    <div className={clsx('peppers-formControl', { 'peppers-formControl--disabled': disabled })}>
      <label className="peppers-formLabel" htmlFor={id} ref={labelRef}>
        {label}
      </label>
      <div className="peppers-inputRoot">
        <input
          id={id}
          className={clsx(classes, 'peppers-input', utilityClasses)}
          ref={forwardedRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        ></input>
        <fieldset aria-hidden="true" className="peppers-formFieldset">
          <legend className="peppers-formLegend">
            <span>{label}</span>
          </legend>
        </fieldset>
      </div>
    </div>
  );
}

export default forwardRef(TextField);
