import {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  toast
} from 'react-toastify';

function useMethod(method, deps) {
  useCallback(method, deps);
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export {
  useMethod,
  usePrevious,
};
