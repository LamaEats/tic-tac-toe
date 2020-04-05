import React, { useState, useEffect } from 'react'
import { useSelectorMap, gameModule, useActionMap, confirmReset } from '../store'
import './styles.scss'

export const GameMessage = () => {
  const { moves, winner } = useSelectorMap({
    moves: gameModule.get.moves,
    winner: gameModule.get.winner
  })

  const [isGameEnded, setEnd] = useState(false)

  const { confirmRestart } = useActionMap({
    confirmRestart: confirmReset
  })

  useEffect(() => {
    setEnd(moves === 9 || winner != null)

    return () => setEnd(false)
  }, [moves, winner])

  if (!isGameEnded) {
    return null
  }

  let message = 'Turns off. Restart?'

  if (winner) {
    message = `The winner is ${winner}! Restart?`
  }

  const onClickHandler = (confirmed) => {
    if (confirmed) {
      confirmRestart(confirmed)
    }
    else {
      setEnd(false)
    }
  }

  return (
    <div className="game-message">
      <div className="game-message__wrapper">
        <h2>{message}</h2>
        <div className="game-message__contorls">
          <button
            className="game-message__button game-message__button_restart"
            onClick={() => onClickHandler(true)}
          >
            Restart
          </button>
          <button
            className="game-message__button game-message__button_cancel"
            onClick={() => onClickHandler(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
