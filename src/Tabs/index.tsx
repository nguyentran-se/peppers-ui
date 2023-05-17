import { ComponentGenre } from '@types';
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { composeEventHandlers, createContext, getElementType, useComposedRefs } from 'utils';
import './index.scss';
type TabsProps = {
  children: React.ReactNode;
  onChange?: (index: number) => void;
};
interface TabsContextValue {
  onSelectTab: (index: number) => void;
  selectedIndex: number;
  selectedPanelRef: React.MutableRefObject<unknown>;
}
const [TabsProvider, useTabsContext] = createContext<TabsContextValue>(
  ComponentGenre.TABS,
  {} as TabsContextValue,
);
function Tabs({ children, onChange }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedPanelRef = useRef<HTMLElement>(null);
  const tabIndicatorRef = useRef<HTMLSpanElement>(null);
  const calLeftIndicatorRef = useRef<number>(0);
  const onSelectTab = useCallback(
    (index: number) => {
      onChange && onChange(index);
      setSelectedIndex(index);
    },
    [onChange],
  );

  const value = useMemo(
    () => ({ selectedIndex, onSelectTab, selectedPanelRef }),
    [onSelectTab, selectedIndex],
  );

  useEffect(() => {
    const selectedPanelEle = selectedPanelRef.current as HTMLElement;
    const tabIndicatorEle = tabIndicatorRef.current as HTMLSpanElement;

    const rec = selectedPanelEle.getBoundingClientRect();
    console.log('🚀 ~ file: index.tsx:51 ~ useEffect ~ rec', rec);
    const { width, height, x, y } = selectedPanelEle.getBoundingClientRect();
    tabIndicatorEle.style.left = `${x}px`;
    tabIndicatorEle.style.width = `${width}px`;
    tabIndicatorEle.style.top = `${y + height}px`;
    calLeftIndicatorRef.current = selectedIndex === 0 ? 0 : width;

    return () => {};
  }, [selectedIndex]);

  return (
    <TabsProvider {...value}>
      <div className="peppers-tabs">
        {children}
        <span ref={tabIndicatorRef} className="peppers-tabIndicator"></span>
      </div>
    </TabsProvider>
  );
}
interface TabPanelsProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
}
export const TabPanels = forwardRef(
  ({ children, onClick, onKeyDown }: TabPanelsProps, forwardedRef: ForwardedRef<'div'>) => {
    // const ref = useComposedRefs(forwardedRef, index === selectedIndex ? selectedPanelRef : null);

    useEffect(() => {
      React.Children.forEach(children, (child) => {
        if (getElementType(child) !== TabPanel)
          throw new Error('[TabPanels]: TabPanels only includes TabPanel');
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderedTabPanel = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return null;
      }
      return React.cloneElement(child, {
        index: index,
      } as any);
    });

    return <div className="peppers-tabPanels">{renderedTabPanel}</div>;
  },
);

interface TabPanelProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode;
  index?: number;
}
export const TabPanel = forwardRef(
  ({ children, index, onClick, onKeyDown }: TabPanelProps, forwardedRef: ForwardedRef<'div'>) => {
    const { onSelectTab, selectedPanelRef, selectedIndex } = useTabsContext('TabPanel');

    const ref = useComposedRefs(forwardedRef, index === selectedIndex ? selectedPanelRef : null);

    return (
      <div
        className="peppers-tabPanel"
        ref={ref}
        onClick={composeEventHandlers(onClick, () => onSelectTab(index ?? 0))}
        // role="presentation"
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={index}
      >
        {children}
      </div>
    );
  },
);

export default Tabs;
