import { PayloadCreator, ActionCreator } from './typings';

export function actionCreator <T extends string, P>(type: T, payloadCreator: PayloadCreator<P>): ActionCreator<P> {
  const action = (arg: P) => {
    const payload = payloadCreator(arg);

    if (payload == null) {
      return { type };
    }

    return {
      type,
      payload
    };
  };

  action.toString = () => type;

  return action;
}

export function namespacedActionCreator <N extends string>(namespace: N) {
  return <T extends string, P>(type: T, payloadCreator: PayloadCreator<P>) => {
    const namespacedType = `${namespace}/${type}`;

    return actionCreator(namespacedType, payloadCreator);
  };
}
