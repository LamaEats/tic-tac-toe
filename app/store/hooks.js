import {
  useSelector,
  useDispatch
} from "react-redux"

const useHookMapper = (fn) => (map = {}) => {
  const mapKeys = Object.keys(map)

  if (!mapKeys.length) {
    return {}
  }

  if (mapKeys.length === 1) {
    const key = mapKeys[0]
    return {
      [key]: fn(map[key])
    }
  }

  const resultMap = {}

  for (let i = 0; i < mapKeys.length; i += 1) {
    const key = mapKeys[i]
    const mappedFn = map[key]

    if (typeof mappedFn !== 'function') {
      // eslint-disable-next-line no-console
      console.warn(`${key} in not a fuction`)
      // eslint-disable-next-line no-continue
      continue
    }

    resultMap[key] = fn(mappedFn)
  }

  return resultMap
}


const useActions = fn => {
  const dispatch = useDispatch()
  return (...args) => dispatch(fn(...args))
}

export const useSelectorMap = (map) => {
  return useHookMapper(fn => useSelector(fn))(map)
}

export const useActionMap = useHookMapper(useActions)
