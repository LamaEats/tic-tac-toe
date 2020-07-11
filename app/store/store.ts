import { createModule } from '../lib';
import { player, Module, State } from '../types/app';

const ensureValue = <T>(value: T, defaultValue: T): T => {
  if (value != null) {
    return value;
  }

  return defaultValue;
};

const gameInitialState: State['tic-tac-toe'] = {
  winner: null,
  moves: 0,
  lastCoord: null,
  gameIsOver: false,
  map: {},
  currentMove: player.CROSS,
  isRestartStopped: false,
};

export const gameModule = createModule(Module.Main, gameInitialState);

export const countModule = createModule(Module.Count, {
  [player.CROSS]: 0,
  [player.ZEROS]: 0,
});

export const gameSettings = createModule(Module.Settings, {
  side: ensureValue<number>(__SIDE_SIZE__, 3),
  line: ensureValue<number>(__LINE_SIZE__, 3)
});

export type GameModule = typeof gameModule;
export type CountModule = typeof countModule;
export type GameSettignsModule = typeof gameSettings;
export type Modules = GameModule | CountModule | GameSettignsModule;
