export enum player {
  CROSS = 'CROSS',
  ZEROS = 'ZEROS',
}

export enum Module {
  Main = 'tic-tac-toe',
  Count = 'tic-tac-toe/count',
  Settings = 'tic-tac-toe/settings',
}

export type AxisValue = 0 | 1 | 2;

export interface Coordinate {
  x: AxisValue;
  y: AxisValue;
}

export type StepsHistory = {
  [key in player]: Coordinate[];
}

export interface State {
  [Module.Main]: {
    winner: player | null
    moves: number
    lastCoord: string | null
    gameIsOver: boolean
    map: StepsHistory;
    currentMove: player
    isRestartStopped: boolean
  }
  [Module.Count]: {
    [P in player]: number
  }
  [Module.Settings]: {
    size: number
    line: number
  }
  [key: string]: any
}
