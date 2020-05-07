import React, { useCallback, forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { getCoordValue, switchPlayer, setToMap, useActionMap } from '../../../store'
import { player } from '../../../types/app'
import { CrossIcon } from './CrossIcon'
import { ZeroIcon } from './ZeroIcon'
import './styles.scss'
import { withHashed } from '../../KeyboardContol/KeybordControl'

const Icons: {[key in player]: React.FC } = {
  [player.CROSS]: CrossIcon,
  [player.ZEROS]: ZeroIcon
}

export interface CellProps {
  coord: string
}

const Cell: React.ForwardRefExoticComponent<CellProps> = forwardRef(function Cell({ coord }, ref) {
  const actions = useActionMap({
    setToMap,
    switchPlayer
  })

  const marker: player = useSelector(getCoordValue(coord))

  const onClickHandler = useCallback(() => {
    if (marker != null) {
      return
    }

    actions.setToMap(coord)
    actions.switchPlayer()
  }, [marker])

  const Icon = Icons[marker] || (() => null)

  Icon.displayName = marker ? `${marker[0].toUpperCase()}${marker.slice(1)}` : 'Blank'

  return <div className="cell" ref={ref} tabIndex={-1} onClick={onClickHandler}>
    <Icon />
  </div>
})

const wrappedCell = withHashed(Cell)

export { wrappedCell as Cell }
