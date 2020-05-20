import React from 'react';

import './styles.scss';

interface WrapperProps {
  size: number
}

export const Wrapper: React.FC<WrapperProps> = (props) => (
  <main className="wrapper" style={{ ['--size' as any]: props.size }}>
    {props.children}
  </main>
);
