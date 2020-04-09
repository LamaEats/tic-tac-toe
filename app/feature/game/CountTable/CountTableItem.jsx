import React from 'react'

export const CountTableItem = ({ title, count }) => (
  <div className="count-table__item">
    <h4>{title}</h4>
    <p>{count}</p>
  </div>
)
