import { ComponentGenre } from '@types';
import React from 'react';
/**
 *
 * @description Generate style classes for component. Example: `peppers-button--large`
 */
function useUtilityClasses<T extends object>(
  componentGenre: ComponentGenre,
  styledProps: T,
): { [index: string]: boolean } {
  return Object.keys(styledProps).reduce((result, currentKey) => {
    const cssValue = styledProps[currentKey as keyof T];
    const postfix = typeof cssValue === 'boolean' ? currentKey : cssValue;
    return {
      ...result,
      [`peppers-${componentGenre}--${postfix}`]: !!cssValue,
    };
  }, {});
}

export function getElementType(element: React.ReactNode) {
  return React.isValidElement(element) ? element.type : null;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  const bg = stringToColor(name);
  const words = name.trim().split(' ');
  const display = words.reduce((result, currWord) => {
    return result + currWord[0];
  }, '');

  return { bg, display };
}

export { useUtilityClasses, stringAvatar };
