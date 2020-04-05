import {
  createSelector
} from "./storeMediator";
import {
  gameModule
} from "./store";

const {
  get
} = gameModule

export const getCoordValue = value => state => createSelector(state, get.map, map => map[value] || null)
