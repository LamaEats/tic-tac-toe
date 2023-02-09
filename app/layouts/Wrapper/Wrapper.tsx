import React from 'react'

import './styles.scss'

interface WrapperProps {
  size: number
}

export const Wrapper: React.FC<WrapperProps> = ({ size, children }) => (
  <main className="wrapper" style={{ ['--size' as any]: size }}>
    {children}
  </main>
)
