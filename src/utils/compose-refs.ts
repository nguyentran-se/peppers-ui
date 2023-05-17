import { useCallback } from 'react';
import { isFunction } from './type-check';
import { Callback } from '@types';

export type AssignableRef<ValueType> =
  | {
      bivarianceHack(instance: ValueType | null): void;
    }['bivarianceHack']
  | React.MutableRefObject<ValueType | null>;

function isMutableRefObject(ins: AssignableRef<any>): ins is React.MutableRefObject<any | null> {
  return 'current' in ins;
}

function assignRef<RefValueType = any>(ref: AssignableRef<RefValueType> | null, value: any) {
  if (ref == null) return;
  if (isFunction(ref)) {
    (ref as Callback)(value);
  } else {
    try {
      if (isMutableRefObject(ref)) ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

export function useComposedRefs<RefValueType = any>(
  ...refs: (AssignableRef<RefValueType> | null)[]
) {
  return useCallback(
    (node: any) => {
      for (const ref of refs) {
        assignRef(ref, node);
      }
    },
    [refs],
  );
}
