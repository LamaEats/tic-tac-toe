export interface Payload<T> {
  value: T
}

export interface Action {
  type: string,
}

export interface AnyAction<T> extends Action {
  payload?: ReturnType<PayloadCreator<T>>
}

export interface ActionCreator<T> {
  (arg: T): AnyAction<T>
  toString: () => string
}

export interface Selector<S, R> {
  (state: S, ...args: any[]): R
}

type FieldGetters<S, N extends string> = {
  [K in keyof S]: Selector<Record<N, S>, S[K]>;
}

export type Getters<S, N extends string> = Selector<Record<N, S>, S> & FieldGetters<S, N>

export interface PayloadCreator<T> {
  (arg: T): T extends void ? void : Payload<T>
}

export type Actions<S> = {
  [K in keyof S]: ActionCreator<S[K]>
} & { reset: ActionCreator<void> }

export interface Reducer<S, A extends Action = AnyAction<S[keyof S]>> {
  (state: S, action: A): S
}

export type Handlers<S> = {
  [key: string]: Reducer<S, ReturnType<ActionCreator<S[keyof S]>>>
} & {
  reset: Reducer<S, ReturnType<ActionCreator<void>>>
}

export interface Module<S, N extends string> {
  get: Getters<S, N>,
  set: Actions<S>,
  reducer: Reducer<S>
  name: N,
  toString: () => N,
}
