import { ComponentGenre } from '@types';
import Divider from 'Divider';
import Menu, { MenuItem } from 'Menu';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { useUtilityClasses } from 'utils';
import './index.scss';
// import { MdPhotoCamera } from 'react-icons/md';

export interface DrawerProps extends ComponentPropsWithRef<'aside'> {
  classes: string | string[];
}

function Drawer(
  { classes, ...props }: DrawerProps,
  forwardedRef?: React.ForwardedRef<HTMLElement>,
) {
  const styledProps = {};

  const utilityClasses = useUtilityClasses(ComponentGenre.DRAWER, styledProps);

  return (
    <aside
      className={clsx(classes, 'peppers-drawerWrapper', utilityClasses)}
      ref={forwardedRef}
      {...props}
    >
      <div className="peppers-drawer">
        <div className="peppers-logo">
          <img
            src="https://cdn.freelogodesign.org/files/3b1270ab35f44c74a149dca179b12978/thumb/logo_200x200.png?v=0"
            alt=""
          />
          Funiverse
        </div>
        <div className="peppers-drawerHeader">header</div>
        <Divider />
        <div className="peppers-drawerBody">
          <Menu>
            <ul>
              <MenuItem>
                <a href="#test" className="p-1">
                  {/* <MdPhotoCamera /> */}
                  Link 1
                </a>
              </MenuItem>
              <MenuItem classes="p-1">
                {/* <MdPhotoCamera /> */}
                Menu Item1
              </MenuItem>
              <MenuItem classes="p-1">
                {/* <MdPhotoCamera /> */}
                Menu Item1
              </MenuItem>
              <MenuItem classes="p-1">Menu Item1</MenuItem>
            </ul>
          </Menu>
        </div>
        <div className="peppers-drawerFooter">footer</div>
      </div>
    </aside>
  );
}

export default forwardRef(Drawer);
