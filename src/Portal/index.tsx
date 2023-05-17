import React, { useId } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

function Portal({ children, container = document.body }: PortalProps) {
  const rId = useId();
  return ReactDOM.createPortal(children, container, rId);
}

export default Portal;
