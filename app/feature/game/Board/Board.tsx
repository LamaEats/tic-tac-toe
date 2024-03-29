import React, { useLayoutEffect } from 'react'
import { Wrapper } from '../../../layouts'
import { gameModule, gameSettings, checkWinner, confirmReset } from '../../../store'
import { useActionMap, useSelectorMap } from '../../../lib/hooks/hooks'
import { getHashKey } from '../../../utils'
import { player } from '../../../types/app'
import { Cell } from '../Cell'
import { GameMessage } from '../GameMessage'
import { CountTable } from '../CountTable'
import './styles.scss'

const { get } = gameModule

const grid = (fieldSize: number): string[] =>
  Array(fieldSize)
    .fill(Array(fieldSize).fill(null))
    .map((array, i) => array.map((_: any, j: number) => getHashKey(j, i)))
    .reduce((acc, array) => {
      acc.push(...array)

      return acc
    }, [])

const movesForWin = (fieldSize: number) => fieldSize * 2 - 1

export const Board: React.FC = () => {
  const { marker, moves, winner, lastCoord, size } = useSelectorMap({
    marker: get.currentMove,
    moves: get.moves,
    winner: get.winner,
    lastCoord: get.lastCoord,
    size: gameSettings.get.side,
  }) as {
    marker: player
    moves: number
    winner: player
    lastCoord: string
    size: number
  }

  const actions = useActionMap({
    confirmReset,
    checkWinner,
  })

  useLayoutEffect(() => {
    if (moves >= movesForWin(size) && winner == null) {
      actions.checkWinner(size)
    }
  }, [lastCoord, winner, size])

  const viewedMarker = winner || marker

  return (
    <div className="board">
      <h2 className="board__title">
        <b>{viewedMarker}</b> {winner != null ? 'wins' : 'turns'}
      </h2>
      <CountTable />
      <Wrapper size={size}>
        {grid(size).map(coord => (
          <Cell coord={coord} key={coord} />
        ))}
      </Wrapper>
      <GameMessage maxCount={size ** 2} />
    </div>
  )
}
