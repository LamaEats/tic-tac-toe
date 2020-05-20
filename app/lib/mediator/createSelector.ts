import { Selector } from './typings'

export function createSelector<S, R, T>(selectors: (Selector<S, R>)[], resultFn: (...res: R[]) => T) {
  const selector = (state: S, ...rest: any[]) => {
    const params = []

    for (let i = 0; i < selectors.length; i += 1) {
      params.push(selectors[i](state, ...rest))
    }

    return resultFn(...params)
  }

  selector.resultFn = resultFn

  return selector
}
