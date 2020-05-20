import { createSelector } from '../lib';
import { gameModule } from './store';

const { get } = gameModule;

export const getCoordValue = (value: string) =>
  createSelector(
    [get.map],
    map => map[value]
  );
