import {
  Dispatch,
  Reducer
} from 'redux';
import customerService from 'src/service/customer/customer.service';
import {
  USER
} from '../actionTypes';
import { createReducer } from '../util';

interface IUserState {
  // 售达方信息
  saleInfo: any,
  // token里的用户信息
  tokenUserInf: any,
  // 默认送达方信息
  defaultSendToInf: any,
  // 权限信息
  permissionList: any,
}

async function getSaleInf(dispatch: Dispatch) {
  /* 获取售达方信息 */
  const { code, data } = await customerService.getCustomer();
  if (code === '1') {
    return dispatch({
      type: USER.UPDATE_SALE,
      data
    });
  }
}
//
export {
  getSaleInf
};

const userReducer: Reducer = createReducer(
  {
    saleInfo: {},
    tokenUserInf: {},
    defaultSendToInf: {},
    permissionList: {}
  },
  {
    [USER.UPDATE_SALE](state:IUserState, action) {
      /* 修改售达方信息 */
      return {
        ...state,
        saleInfo: action.data
      };
    },
    [USER.UPDATE_TOKEN_USER](state:IUserState, action) {
      /* 修改token用户信息 */
      return {
        ...state,
        tokenUserInf: action.data
      };
    },
    [USER.UPDATE_DEFAULT_SEND_TO](state:IUserState, action) {
      /* 修改默认送达方 */
      return {
        ...state,
        defaultSendToInf: action.data
      };
    },
    [USER.UPDATE_PERMISSION](state:IUserState, action) {
      /* 更新用户权限信息 */
      return {
        ...state,
        permissionList: action.data
      };
    }
  }
);

export default userReducer;
