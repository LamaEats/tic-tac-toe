import React, { useEffect } from 'react'
import { useSelectorMap, countModule, gameModule, useActionMap, incrementWinCount } from '../../../store'
import { CROSS, ZEROS } from '../../../constants'
import { CountTableItem } from './CountTableItem'
import './styles.scss'

export const CountTable = () => {
  const {
    winner,
    counts
  } = useSelectorMap({
    counts: (state) => [
      {
        count: countModule.get[CROSS](state),
        type: CROSS
      },
      {
        count: countModule.get[ZEROS](state),
        type: ZEROS
      }
    ],
    winner: gameModule.get.winner
  })

  const { incrementWins } = useActionMap({
    incrementWins: incrementWinCount
  })

  useEffect(incrementWins, [winner])

  return (
    <div className="count-table">
      {counts.map(({ count, type }) => <CountTableItem title={type} count={count} />)}
    </div>
  )
}
