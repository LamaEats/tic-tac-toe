import React, { useEffect } from 'react'
import { useSelectorMap, countModule, gameModule, useActionMap, incrementWinCount } from '../../../store'
import { CountTableItem } from './CountTableItem'
import './styles.scss'
import { State, player } from '../../../types/app'

export const CountTable: React.FC = () => {
  const {
    winner,
    counts
  } = useSelectorMap({
    counts: (state: State) => [
      {
        // @ts-ignore
        count: countModule.get[player.CROSS](state),
        type: player.CROSS
      },
      {
        // @ts-ignore
        count: countModule.get[player.ZEROS](state),
        type: player.ZEROS
      }
    ],
    // @ts-ignore
    winner: gameModule.get.winner
  })

  const { incrementWins } = useActionMap({
    incrementWins: incrementWinCount
  })

  useEffect(incrementWins, [winner])

  return (
    <div className="count-table">
      {counts.map(({ count, type }: { count: number, type: player }) => <CountTableItem title={type} count={count} key={type} />)}
    </div>
  )
}
