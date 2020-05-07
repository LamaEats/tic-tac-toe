import React from 'react'

import './styles.scss'

export const Wrapper = (props) => (
  <main className="wrapper" style={{'--size': props.size}}>
    {props.children}
  </main>
)
