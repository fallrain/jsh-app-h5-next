import {
  useCallback,
  useEffect,
  useRef
} from 'react';

interface IMethod {
  (...args: any[]): any
}

function useMethod(method: IMethod, deps: any) {
  useCallback(method, deps);
}

function usePrevious(value:any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export {
  useMethod,
  usePrevious
};
