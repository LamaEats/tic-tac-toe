import { ThunkAction as ReduxThunkAction } from 'redux-thunk';
import { gameModule, countModule } from './store';
import { parseHashKey, getHashKey } from '../utils';
import { State, player } from '../types/app';
import { AnyAction } from '../lib';

type ThunkAction = ReduxThunkAction<void, State, void, AnyAction<any>>;

const { set, get } = gameModule;

export const incrementWinCount = (): ThunkAction => (dispatch, getState) => {
  const state = getState();
  const winner = get.winner(state);
  if (winner == null) {
    return;
  }

  const count = countModule.get[winner](state);

  dispatch(countModule.set[winner](count + 1));
};

export const confirmReset = (confirmed: boolean): ThunkAction => (dispatch) => {
  if (confirmed) {
    dispatch(set.reset());
  }
};

export const incrementMove = (): ThunkAction => (dispatch, getState) => {
  const turn = get.moves(getState());

  dispatch(set.moves(turn + 1));
};

export const checkWinner = (maxMoves: number): ThunkAction => (dispatch, getState) => {
  const state = getState();
  const map = get.map(state);
  const lastCoords = get.lastCoord(state);
  const marker = map[lastCoords];
  const [x, y] = parseHashKey(lastCoords);

  const from = {
    x: 0,
    y: 0
  };
  const to = {
    x: 2,
    y: 2
  };

  // by vertical
  for (let fromX = from.x, countMarkers = 0; fromX <= to.x; fromX += 1) {
    if (map[getHashKey(fromX, y)] === marker) {
      countMarkers += 1;
    }

    if (countMarkers === maxMoves) {
      dispatch(set.winner(marker));
      return;
    }
  }

  // by horizontal
  for (let fromY = from.y, countMarkers = 0; fromY <= to.y; fromY += 1) {
    if (map[getHashKey(x, fromY)] === marker) {
      countMarkers += 1;
    }

    if (countMarkers === maxMoves) {
      dispatch(set.winner(marker));
      return;
    }
  }

  // by diagonal top-left to bottom-rigth
  for (
    let fromY = from.y, fromX = from.x, countMarkers = 0; fromY <= to.y && fromX <= to.x; fromY += 1, fromX += 1
  ) {
    if (map[getHashKey(fromX, fromY)] === marker) {
      countMarkers += 1;
    }

    if (countMarkers === maxMoves) {
      dispatch(set.winner(marker));
      return;
    }
  }

  // by diagonal top-rigth to bottom-left
  for (
    let fromY = from.y, fromX = to.x, countMarkers = 0; fromY <= to.y && fromX >= from.x; fromY += 1, fromX -= 1
  ) {
    if (map[getHashKey(fromX, fromY)] === marker) {
      countMarkers += 1;
    }

    if (countMarkers === maxMoves) {
      dispatch(set.winner(marker));
      return;
    }
  }
};

export const switchPlayer = (): ThunkAction => (dispatch, getState) => {
  dispatch(incrementMove());

  const turn = get.moves(getState());

  const nextPlayer: player = (turn % 2 === 0 ? player.CROSS : player.ZEROS);

  dispatch(set.currentMove(nextPlayer));
};

export const setToMap = (coord: string): ThunkAction => (dispatch, getState) => {
  const state = getState();
  const map = get.map(state);
  const marker = get.currentMove(state);

  dispatch(set.map({
    ...map,
    [coord]: marker
  }));

  dispatch(set.lastCoord(coord));
};
