import React, { useState, useEffect, useRef, useCallback } from 'react'
import { gameModule, confirmReset } from '../../../store'
import { useActionMap, useSelectorMap } from '../../../lib/hooks/hooks'
import { player } from '../../../types/app'

import './styles.scss'

export interface GameMessageProps {
  maxCount: number
}

export const GameMessage: React.FC<GameMessageProps> = ({ maxCount }) => {
  const { moves, winner } = useSelectorMap({
    moves: gameModule.get.moves,
    winner: gameModule.get.winner,
  }) as {
    moves: number
    winner: player
  }

  const btnOk = useRef(null)
  const btnCancel = useRef(null)

  const [isGameEnded, setEnd] = useState(false)

  const { confirmRestart } = useActionMap({
    confirmRestart: confirmReset,
  })

  useEffect(() => {
    setEnd(moves === maxCount || winner != null)

    return () => setEnd(false)
  }, [moves, winner])

  let message = 'Turns off. Restart?'

  if (winner) {
    message = `The winner is ${winner}! Restart?`
  }

  const onClickHandler = useCallback(
    confirmed => {
      confirmRestart(confirmed)

      if (!confirmed) {
        setEnd(false)
      }
    },
    [confirmRestart, setEnd],
  )

  if (!isGameEnded) {
    return null
  }

  return (
    <div className="game-message">
      <div className="game-message__wrapper">
        <h2>{message}</h2>
        <div className="game-message__contorls">
          <button
            className="game-message__button game-message__button_restart"
            onClick={() => onClickHandler(true)}
            tabIndex={-1}
            ref={btnOk}
            type="button"
          >
            Restart
          </button>
          <button
            className="game-message__button game-message__button_cancel"
            onClick={() => onClickHandler(false)}
            tabIndex={-1}
            ref={btnCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
