import util from '../util/index';

const baseURL = 'auth';
const urls = {
  // 根据token获取用户信息
  getUserInfoByToken: '/user/getUserInfoByToken',
  // 根据code获取token
  getTokenByCode: '/appLogin',
  //  按钮权限问题
  getPermissionList(customerCode:string, account:string) {
    return `/user/customer/getPermissionList?customerCode=${customerCode}&account=${account}`;
  },
  // 获取权限和角色
  roleAndPermissionList: '/user/customer/getRoleAndPermissionList',
};
util.addPrefix(baseURL, urls);
export default urls;
