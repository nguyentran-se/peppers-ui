import { ComponentGenre } from '@types';
import Avatar from 'Avatar';
import IconButton from 'IconButton';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
// import * as MD from 'react-icons/md';
// import * as BS from 'react-icons/bs';

import { useUtilityClasses } from 'utils';
import './index.scss';
export interface AppBarProps {
  classes: string | string[];
}
function AppBar({ classes, ...props }: AppBarProps, forwardedRef?: React.ForwardedRef<any>) {
  const styledProps = {};

  const utilityClasses = useUtilityClasses(ComponentGenre.APP_BAR, styledProps);

  return (
    <div
      className={clsx(classes, 'peppers-appBarWrapper', utilityClasses)}
      ref={forwardedRef}
      {...props}
    >
      <header className={clsx('peppers-appBar')}>
        {/* <div className="peppers-logo mr-2">
          <img
            src="https://images.unsplash.com/photo-1517345438041-cf88a04b4689?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt=""
          />
        </div> */}
        <div className="peppers-appBar-searchWrapper">
          <span>{/* <BS.BsSearch size={16} /> */}</span>
          <input type="text" placeholder="search" className="peppers-appBar-search" />
        </div>
        <div className="peppers-appBar-divider"></div>
        <div className="peppers-toolbar">
          <IconButton variant="circle" color="primary">
            {/* <MD.MdPhotoCamera />  */}
            <div></div>
          </IconButton>
          <IconButton variant="circle" color="primary">
            {/* <MD.MdPhotoCamera /> */}
            <div></div>
          </IconButton>
          <IconButton variant="circle" color="primary">
            {/* <MD.MdPhotoCamera /> */}
            <div></div>
          </IconButton>
          <IconButton variant="circle" color="primary">
            {/* <MD.MdPhotoCamera /> */}
            <div></div>
          </IconButton>
          <Avatar
            size="large"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          />
        </div>
      </header>
    </div>
  );
}

export default forwardRef(AppBar);
