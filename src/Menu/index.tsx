import { Callback, ComponentGenre } from '@types';
import Button, { ButtonProps } from 'Button';
import Portal from 'Portal';
import clsx from 'clsx';
import React, {
  ComponentPropsWithRef,
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  composeEventHandlers,
  createContext,
  getElementType,
  getOwnerDocument,
  useComposedRefs,
  useUtilityClasses,
} from 'utils';
import './index.scss';
export interface MenuProps {
  classes?: string | string[];
  children: React.ReactNode;
}

interface MenuContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  triggerRef: React.MutableRefObject<unknown>;
}

const [MenuProvider, useMenuContext] = createContext<MenuContextValue>(
  ComponentGenre.MENU,
  {} as MenuContextValue,
);

function Menu({ classes, children, ...props }: MenuProps, forwardedRef?: React.ForwardedRef<any>) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef();

  const styledProps = {};
  const utilityClasses = useUtilityClasses(ComponentGenre.MENU, styledProps);

  const value = { isOpen, setIsOpen, triggerRef };

  React.Children.map(children, (child) => {
    console.log((child as any).type === MenuList);
  });

  return (
    <div className={clsx(classes, 'peppers-menu', utilityClasses)} ref={forwardedRef} {...props}>
      <MenuProvider {...value}>{children}</MenuProvider>
    </div>
  );
}

export default forwardRef(Menu);

export interface MenuButtonProps extends React.ComponentPropsWithRef<'button'> {
  classes?: string | string[];
  children: React.ReactNode;
  // as?: keyof JSX.IntrinsicElements;
}
const MenuButton = forwardRef(
  (
    { classes, children, onClick, ...props }: ButtonProps,
    forwardedRef: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const { isOpen, setIsOpen, triggerRef } = useMenuContext('MenuButton');
    const ref = useComposedRefs(forwardedRef, triggerRef);
    const styledProps = {};
    const utilityClasses = useUtilityClasses(ComponentGenre.MENU, styledProps);

    function handleClick() {
      setIsOpen(!isOpen);
    }

    return (
      <Button
        classes={clsx(classes, 'peppers-menuButton', utilityClasses)}
        onClick={composeEventHandlers(onClick, handleClick)}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

export interface MenuListProps extends ComponentPropsWithRef<'ul'> {
  classes?: string | string[];
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  // position: 'mid';
}

const MenuList = forwardRef(
  (
    { classes, children, ...props }: MenuListProps,
    forwardedRef: React.ForwardedRef<HTMLUListElement>,
  ) => {
    const { isOpen, setIsOpen, triggerRef } = useMenuContext('MenuButton');
    const styledProps = {};
    const utilityClasses = useUtilityClasses(ComponentGenre.MENU, styledProps);
    const [triggerPosition, setTriggerPosition] = useState<{ x: number; y: number } | null>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const ref = useComposedRefs(menuRef, forwardedRef);
    useEffect(() => {
      const triggerEle = triggerRef.current as HTMLElement;
      const menuEle = menuRef.current as HTMLUListElement;
      if (!isOpen) return;
      const doc = getOwnerDocument(menuEle);
      if (!doc) return;
      function listener(e: MouseEvent) {
        // TODO: test this case on production
        // if (
        //   !triggerEle.contains(e.currentTarget as Node) &&
        //   !menuEle.contains(e.currentTarget as Node)
        // ) {
        //   setIsOpen(false);
        // }
      }
      doc.addEventListener('click', listener);

      return () => {
        doc.removeEventListener('click', listener);
      };
    }, [isOpen, setIsOpen, triggerRef]);

    useLayoutEffect(() => {
      if (!isOpen) return;
      const triggerEle = triggerRef.current as HTMLElement;
      const menuEle = menuRef.current as HTMLUListElement;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const {
        x,
        y,
        width: triggerWidth,
        height: triggerHeight,
      } = triggerEle.getBoundingClientRect();
      const { width: ulWidth, height: ulHeight } = menuEle.getBoundingClientRect();
      const SPACE = 4;

      let X = 0;
      let Y = 0;
      const menuRatioPos = (3 * triggerWidth) / 4;
      if (screenWidth - x >= ulWidth) {
        X = x - (ulWidth - menuRatioPos);
      } else {
        X = x + menuRatioPos;
      }
      Y = y + triggerHeight + SPACE;
      setTriggerPosition({ x: X, y: Y });
    }, [triggerRef, isOpen, setIsOpen]);

    useEffect(() => {
      React.Children.forEach(children, (child) => {
        if (getElementType(child) !== MenuItem) {
          throw new Error('MenuList must include MenuItem');
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isOpen ? (
      <Portal>
        <ul
          {...props}
          ref={ref}
          // onClick={composeEventHandlers(onClick, handleClick)}
          className={clsx(classes, 'peppers-menuList', utilityClasses)}
          style={{ ...props.style, left: triggerPosition?.x, top: triggerPosition?.y }}
        >
          {children}
        </ul>
      </Portal>
    ) : null;
  },
);

export interface MenuItemProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  onSelect?: Callback;
  classes?: string | string[];
}
const MenuItem = forwardRef(
  (
    { classes, as: Comp = 'li', children, onSelect, ...props }: MenuItemProps,
    forwardedRef: React.ForwardedRef<any>,
  ) => {
    const styledProps = {};
    const { setIsOpen } = useMenuContext('MenuButton');
    const utilityClasses = useUtilityClasses(ComponentGenre.MENU, styledProps);

    function handleClick(e: React.MouseEvent) {
      setIsOpen(false);
    }

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <li
        className={clsx(classes, 'peppers-menuItem', utilityClasses)}
        onClick={composeEventHandlers(onSelect, handleClick)}
        {...props}
      >
        {children}
      </li>
    );
  },
);
export { MenuButton, MenuList, MenuItem };
