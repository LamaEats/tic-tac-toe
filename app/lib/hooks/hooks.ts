import {
  useSelector,
  useDispatch
} from 'react-redux';
import { AnyAction } from 'redux';
import { Selector } from '../mediator';

const prependFns = <M>(map: M): Array<M[keyof M] & Function> => {
  const keys = Object.keys(map) as (keyof M)[];
  const nextMap = [];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const mappedFn = map[key];

    if (typeof mappedFn !== 'function') {
      // eslint-disable-next-line no-console
      console.warn(`${key} in not a fuction`);
      // eslint-disable-next-line no-continue
      continue;
    }

    Object.defineProperty(mappedFn, 'name', {
      value: key
    });

    // @ts-ignore
    nextMap.push(mappedFn);
  }

  return nextMap;
};

const useHookMapper = <F extends (...args: any) => any>(fn: F) =>
  <M>(map: M): {[K in keyof M]?: ReturnType<F>} => {
    const mapKeys = Object.keys(map) as (keyof M)[];

    if (!mapKeys.length) {
      return {};
    }

    const mapFns = prependFns(map);

    const resultMap = {};

    for (const mapFn of mapFns) {
      if (typeof fn === 'function') {
        // @ts-ignore
        resultMap[mapFn.name] = fn(mapFn);
      }
    }

    return resultMap;
  };


const useActions = (fn: (...args: any[]) => AnyAction ) => {
  const dispatch = useDispatch();
  return (...args: any[]) => dispatch(fn(...args));
};

const useSelectors = <S, R>(fn: Selector<S, R>) => useSelector(fn);

export const useSelectorMap = useHookMapper(useSelectors);

export const useActionMap = useHookMapper(useActions);
