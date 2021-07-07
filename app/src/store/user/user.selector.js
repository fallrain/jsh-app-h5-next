import { USER } from '../actionTypes';

const userSelector = {
  [USER.GET_SALE]: (state) => state.user.saleInfo,
  [USER.GET_TOKEN_USER](state) {
    /* token用户信息 */
    return state.tokenUserInf;
  },
  [USER.GET_DEFAULT_SEND_TO](state) {
    /* 默认送达方信息 */
    return state.defaultSendToInf;
  },
  [USER.GET_PERMISSION_LIST](state) {
    /* 用户权限信息 */
    return state.permissionList;
  },
  [USER.GET_ROLE](state) {
    /* 用户权限信息 */
    return state.role;
  },
  [USER.GET_UNFREEZE_STATE](state) {
    /* 用户冻结信息 */
    return state.unfreezeState;
  },
};
export default userSelector;
