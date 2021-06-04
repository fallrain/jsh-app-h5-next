import {
  AnyAction,
  Reducer
} from 'redux';

type IHandlers = Record<string, { (state: any, action: AnyAction): any }>;

function createReducer(initialState: any, handlers: IHandlers): Reducer {
  /**
   * 创建reducer
   * */
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export {
  createReducer
};
