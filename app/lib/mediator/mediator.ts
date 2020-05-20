import { Module, Getters, Actions, Handlers, Reducer, AnyAction } from './typings';
import { createSelector } from './createSelector';
import { namespacedActionCreator } from './actionCreator';
import { namespacedActionHandler } from './actionHandler';

export const createModule = <S, N extends string>(namespace: N, initialState: S): Module<S, N> => {
  const stateKeys = Object.keys(initialState) as (keyof S)[];
  const actionCreator = namespacedActionCreator(namespace);
  const actionHandler = namespacedActionHandler(namespace);

  const get = ((state) => state[namespace]) as Getters<S, N>;

  const set = {
    reset: actionCreator('reset', () => undefined)
  } as Actions<S>;

  const handlers = {
    reset: () => initialState
  } as Handlers<S>;

  stateKeys.forEach(key => {
    const selector = createSelector([get], res => res[key]);

    Object.defineProperty(get, key, {
      enumerable: true,
      value: selector
    });

    Object.defineProperty(set, key, {
      enumerable: true,
      value: actionCreator(key as string, (value) => ({ value }))
    });

    const callback: Reducer<S, AnyAction<typeof key>> = (state, action) => ({
      ...state,
      [key]: action.payload!.value
    });

    Object.defineProperty(handlers, key, {
      enumerable: true,
      value: callback
    });
  });

  return {
    get,
    set,
    reducer: actionHandler(handlers, initialState),
    name: namespace,
    toString: () => namespace
  };
};
