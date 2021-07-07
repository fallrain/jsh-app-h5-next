import {
  Dispatch,
  Reducer
} from 'redux';
import customerService from 'src/service/customer/customer.service';
import {
  USER
} from '../actionTypes';
import { createReducer } from '../util';
import authService from '../../service/auth/auth.service';

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
  /**
   *  获取售达方信息
   *  */
  const { code, data } = await customerService.getCustomer();
  if (code === '1') {
    return dispatch({
      type: USER.UPDATE_SALE,
      data
    });
  }
}

async function getTokenUserInf(dispatch: Dispatch) {
  /**
   *  获取token信息
   *  */
  const { code, data } = await authService.getUserInfoByToken();
  if (code === '1') {
    return dispatch({
      type: USER.UPDATE_TOKEN_USER,
      data
    });
  }
}

function getDefaultSendTo(dispatch: Dispatch) {
  /**
   *  获取token信息
   *  */
  return customerService.addressesList(1).then(({ code, data }) => {
    if (code === '1' && data) {
      // 当前配送地址修改(选出默认地址)
      let defaultIndex = data.findIndex((v) => v.defaultFlag === 1);
      if (defaultIndex === -1) {
        defaultIndex = 0;
      }
      // 更新默认送达方store
      if (data) {
        dispatch({
          type: USER.UPDATE_DEFAULT_SEND_TO,
          data: data[defaultIndex]
        });
      }
    }
    return {
      code,
      data
    };
  });
}
export {
  getSaleInf,
  getTokenUserInf
};

const userReducer: Reducer = createReducer(
  {
    // 售达方信息
    saleInfo: {},
    // token里的用户信息
    tokenUserInf: {},
    // 默认送达方信息
    defaultSendToInf: {},
    // 权限信息
    permissionList: {},
    // 角色信息
    role: {},
    // 冻结状态
    unfreezeState: {},
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
