export enum player {
  CROSS = 'CROSS',
  ZEROS = 'ZEROS'
}

export enum Module {
  Main = 'tic-tac-toe',
  Count = 'tic-tac-toe/count',
  Settings = 'tic-tac-toe/settings'
}

export type HistoryMap = {
  [key: string]: player
}

export interface State {
  [Module.Main]: {
    winner: player | null,
    moves: number,
    lastCoord: string | null,
    gameIsOver: boolean,
    map: HistoryMap,
    currentMove: player.CROSS,
    isRestartStopped: boolean,
  },
  [Module.Count]: {
    [P in player]: number
  },
  [Module.Settings]: {
    size: number,
    line: number,
  },
  [key: string]: any
}
