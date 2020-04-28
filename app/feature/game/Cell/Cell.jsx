import React, { useCallback, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { getCoordValue, switchPlayer, setToMap, useActionMap } from '../../../store'
import { CROSS, ZEROS } from '../../../constants'
import { CrossIcon } from './CrossIcon'
import { ZeroIcon } from './ZeroIcon'
import './styles.scss'

const Icons = {
  [CROSS]: CrossIcon,
  [ZEROS]: ZeroIcon
}

export const Cell = forwardRef(function Cell({ coord, disabled }, ref) {
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

  return <div className="cell" ref={ref} tabIndex="-1" onClick={onClickHandler}>
    {/* <button disabled={disabled} className="cell__button" tabIndex="-1"></button> */}
    <Icon />
  </div>
})
