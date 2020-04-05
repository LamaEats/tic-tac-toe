import React, { useLayoutEffect } from 'react'
import { Wrapper } from '../Wrapper'
import { Cell } from '../Cell'
import { GameMessage } from '../GameMessage'
import { gameModule, useSelectorMap, checkWinner, confirmReset, useActionMap } from '../store'
import './styles.scss'


const { get } = gameModule

const grid = Array(3).fill(Array(3).fill(null))
  .map((array, i) => array.map((_, j) => `${i}:${j}`))
  .reduce((acc, array) => {
    acc.push(...array)

    return acc
  }, [])

export const Board = () => {
  const {
    marker,
    moves,
    winner,
    lastCoord
  } = useSelectorMap({
    marker: get.currentMove,
    moves: get.moves,
    winner: get.winner,
    lastCoord: get.lastCoord,
  })

  const actions = useActionMap({
    confirmReset,
    checkWinner
  })

  useLayoutEffect(() => {
    if (moves >= 5 && winner == null) {
      actions.checkWinner()
    }
  }, [lastCoord, winner])

  const viewedMarker = winner || marker

  return (
    <div className="board">
      <h2 className="board__title">
        <b>{viewedMarker}</b> {winner != null ? 'wins' : 'turns'}
      </h2>
      <Wrapper>
        {grid.map((coord) => <Cell coord={coord} key={coord} disabled={winner != null} />)}
      </Wrapper>
      <GameMessage />
    </div>
  )
}
