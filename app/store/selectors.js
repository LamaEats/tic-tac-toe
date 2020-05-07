import {
  createSelector
} from "../lib/mediator/mediator";
import {
  gameModule
} from "./store";

const {
  get
} = gameModule

export const getCoordValue = value => createSelector([get.map], map => (map[value] || null))
