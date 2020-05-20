
import React, { createContext, useEffect, useContext, useState, useCallback } from 'react';
import { parseHashKey, getHashKey } from '../../utils';

enum keyEvent {
  Space = 'Space',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Enter = 'Enter'
}

interface Hash {
  register: (key: string, ref: React.RefObject<HTMLElement>) => void,
  element: (key: string) => React.RefObject<HTMLElement>,
  map: Map<string, React.RefObject<HTMLElement>>,
}

const hash: Hash = (() => {
  const cache = new Map();
  const register = (key: string, ref: React.RefObject<HTMLElement>) => {
    cache.set(key, ref);
  };

  const element = (key: string): React.RefObject<HTMLElement> => cache.get(key);
  
  return {
    get map() {
      return cache;
    },
    register,
    element
  };
})();

const Context = createContext(hash);

const KeybordHandler: React.FC = ({ children }) => {
  const ctx = useContext(Context);
  const [focused, setFocused] = useState<string | null>(null);

  const size = Math.sqrt(ctx.map.size);

  const keyUpHandler = useCallback(({ code }) => {
    if ([keyEvent.Space, keyEvent.Enter].includes(code)) {
      const elem = ctx.element(focused!) as React.RefObject<HTMLElement>;

      if (elem?.current != null) {
        elem.current.click();
      }

      return;
    }

    let [x, y] = parseHashKey(focused!);

    if (code === keyEvent.ArrowDown) {
      y = y + 1 > size ? size : y + 1;
    }

    if (code === keyEvent.ArrowUp) {
      y = y - 1 < 0 ? 0 : y - 1;
    }

    if (code === keyEvent.ArrowRight) {
      x = x + 1 > size ? size : x + 1;
    }

    if (code === keyEvent.ArrowLeft) {
      x = x - 1 < 0 ? 0 : x - 1;
    }

    setFocused(getHashKey(x, y));
  }, [focused]);

  useEffect(() => {
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [ctx, focused]);

  useEffect(() => {
    if (focused == null) {
      setFocused('1:1');
    }

    if (focused) {
      const elem = ctx.element(focused) as React.RefObject<HTMLElement>;

      if (elem && elem.current != null) {
        elem.current.focus();
      }
    }
  }, [focused]);

  return <>{children}</>;
};

export const KeybordControl: React.FC = ({ children }) => (
  <Context.Provider value={hash}>
    <KeybordHandler>
      {children}
    </KeybordHandler>
  </Context.Provider>
);

export const withHashed = <P extends { coord: string }>(WrappedComponent: React.ComponentType<P>) => (props: P) => {
  const cellRef = React.createRef<HTMLElement>();
  const ctx = useContext(Context);

  useEffect(() => {
    if (cellRef) {
      ctx.register(props.coord, cellRef);
    }
  }, [ctx, cellRef]);

  return <WrappedComponent {...props} ref={cellRef} />;
};
