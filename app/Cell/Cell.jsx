import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getCoordValue, switchPlayer, setToMap, useActionMap } from '../store'
import './styles.scss'
import { CROSS, ZEROS } from '../constants'
import { CrossIcon } from './CrossIcon'
import { ZeroIcon } from './ZeroIcon'

const Icons = {
  [CROSS]: CrossIcon,
  [ZEROS]: ZeroIcon
}

export const Cell = ({ coord, disabled }) => {
  const actions = useActionMap({
    setToMap,
    switchPlayer
  })
  const marker = useSelector(getCoordValue(coord))

  const onClickHandler = useCallback(() => {
    if (marker != null) {
      return
    }

    actions.setToMap(coord)
    actions.switchPlayer()
  })

  const Icon = Icons[marker] || (() => null)

  return <div className="cell">
    <button disabled={disabled} className="cell__button" onClick={onClickHandler}></button>
    <Icon />
  </div>
}
