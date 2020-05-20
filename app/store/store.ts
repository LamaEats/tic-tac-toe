import { createModule } from '../lib'
import { player, Module } from '../types/app'

export type GameModule = typeof gameModule
export type CountModule = typeof countModule
export type GameSettignsModule = typeof gameSettings

export type Modules = GameModule | CountModule | GameSettignsModule

const ensureValue = <T>(value: T, defaultValue: T): T => {
  if (value != null) {
    return value
  }

  return defaultValue
}

export const gameModule = createModule(Module.Main, {
  winner: null,
  moves: 0,
  lastCoord: null,
  gameIsOver: false,
  map: {},
  currentMove: player.CROSS,
  isRestartStopped: false,
})

export const countModule = createModule(Module.Count, {
  [player.CROSS]: 0,
  [player.ZEROS]: 0,
})

export const gameSettings = createModule(Module.Settings, {
  // eslint-disable-next-line no-undef
  side: ensureValue(__SIDE_SIZE__, 3),
  // eslint-disable-next-line no-undef
  line: ensureValue(__LINE_SIZE__, 3)
})
