import { createSelector } from '../lib'
import { player } from '../types/app'
import { gameModule } from './store'

const { get } = gameModule

export const getCoordValue = createSelector([get.map], map => {
  const { CROSS, ZEROS } = map

  if (CROSS.length === ZEROS.length) {
    return player.CROSS;
  }

  return player.ZEROS;
})
