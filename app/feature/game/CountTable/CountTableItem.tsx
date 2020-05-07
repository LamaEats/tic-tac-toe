import React from 'react'
import { player } from 'app/types/app'

export interface CountTableItemProps {
  title: player,
  count: number,
}

export const CountTableItem: React.FC<CountTableItemProps> = ({ title, count }) => (
  <div className="count-table__item">
    <h4>{title}</h4>
    <p>{count}</p>
  </div>
)
