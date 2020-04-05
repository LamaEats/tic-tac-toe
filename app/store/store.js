import {
  createModule
} from './storeMediator'
import {
  CROSS
} from '../constants'

const state = {
  winner: null,
  moves: 0,
  lastCoord: null,
  gameIsOver: false,
  map: {},
  currentMove: CROSS
}

export const gameModule = createModule('tic-tac-toe', state)
