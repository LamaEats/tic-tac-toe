import {
  gameModule,
  countModule
} from "./store"
import {
  CROSS,
  ZEROS
} from "../constants"
import {
  parseHashKey,
  getHashKey
} from "../utils"

const {
  set,
  get
} = gameModule

export const incrementWinCount = () => (dispatch, getState) => {
  const state = getState()
  const winner = get.winner(state)
  if (winner == null) {
    return
  }

  const count = countModule.get[winner](state)

  dispatch(countModule.set[winner](count + 1))
}

export const confirmReset = (confirmed) => (dispatch) => {
  if (confirmed) {
    dispatch(set.resetState())
  }
}

export const incrementMove = () => (dispatch, getState) => {
  const turn = get.moves(getState())

  dispatch(set.moves(turn + 1))
}

export const checkWinner = () => (dispatch, getState) => {
  const state = getState()
  const map = get.map(state)
  const lastCoords = get.lastCoord(state)
  const marker = map[lastCoords]
  const [x, y] = parseHashKey(lastCoords)

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

    if (countMarkers === 3) {
      return dispatch(set.winner(marker))

    }
  }

  // by horizontal
  for (let fromY = from.y, countMarkers = 0; fromY <= to.y; fromY += 1) {
    if (map[getHashKey(x, fromY)] === marker) {
      countMarkers += 1;
    }

    if (countMarkers === 3) {
      return dispatch(set.winner(marker))
    }
  }

  // by diagonal top-left to bottom-rigth
  for (
    let fromY = from.y, fromX = from.x, countMarkers = 0; fromY <= to.y && fromX <= to.x; fromY += 1, fromX += 1
  ) {
    if (map[getHashKey(fromX, fromY)] === marker) {
      countMarkers += 1;
    }

    if (countMarkers === 3) {
      return dispatch(set.winner(marker))
    }
  }

  // by diagonal top-rigth to bottom-left
  for (
    let fromY = from.y, fromX = to.x, countMarkers = 0; fromY <= to.y && fromX >= from.x; fromY += 1, fromX -= 1
  ) {
    if (map[getHashKey(fromX, fromY)] === marker) {
      countMarkers += 1;
    }

    if (countMarkers === 3) {
      return dispatch(set.winner(marker))
    }
  }

  return null
}

export const switchPlayer = () => (dispatch, getState) => {
  dispatch(incrementMove())

  const turn = get.moves(getState())

  const nextPlayer = turn % 2 === 0 ? CROSS : ZEROS

  dispatch(set.currentMove(nextPlayer))
}

export const setToMap = (coord) => (dispatch, getState) => {
  const state = getState()
  const map = get.map(state)
  const marker = get.currentMove(state)

  dispatch(set.map({
    ...map,
    [coord]: marker
  }))

  dispatch(set.lastCoord(coord))
}
