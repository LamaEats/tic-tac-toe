import {
  createModule
} from '../lib/mediator/mediator'
import { player } from '../types/app'

const NAMESPACE = 'tic-tac-toe'

const bindToNS = ([s]) => `${NAMESPACE}/${s}`

export const gameModule = createModule(NAMESPACE, {
  winner: null,
  moves: 0,
  lastCoord: null,
  gameIsOver: false,
  map: {},
  currentMove: player.CROSS,
  isRestartStopped: false,
})

export const countModule = createModule(bindToNS`count`, {
  [player.CROSS]: 0,
  [player.ZEROS]: 0,
})

export const gameSettings = createModule(bindToNS `settings`, {
  /* eslint-disable no-undef */
  side: __SIDE_SIZE__ || 3,
  line: __LINE_SIZE__ || 3,
  /* eslint-enable no-undef */
})
