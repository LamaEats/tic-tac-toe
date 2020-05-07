export enum player {
  CROSS = 'CROSS',
  ZEROS = 'ZEROS'
}

export type HistoryMap = {
  [key: string]: player
}

export interface State {
  'tic-tac-toe': {
    winner: player | null,
    moves: number,
    lastCoord: string | null,
    gameIsOver: boolean,
    map: HistoryMap,
    currentMove: player.CROSS,
    isRestartStopped: boolean,
  },
  'tic-tac-toe/count': {
    [P in player]: number
  },
  'tic-tac-toe/settings': {
    size: number,
    line: number,
  },
  [key: string]: {
    
  }
}
