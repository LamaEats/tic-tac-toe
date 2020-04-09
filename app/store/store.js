import {
  createModule
} from './storeMediator'
import {
  CROSS,
  ZEROS
} from '../constants'

export const gameModule = createModule('tic-tac-toe', {
  winner: null,
  moves: 0,
  lastCoord: null,
  gameIsOver: false,
  map: {},
  currentMove: CROSS,
  isRestartStopped: false,
})

export const countModule = createModule('tic-tac-toe/count', {
  [CROSS]: 0,
  [ZEROS]: 0,
})
