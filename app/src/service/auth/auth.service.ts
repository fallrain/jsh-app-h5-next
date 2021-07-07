import {
  jGet
} from 'src/lib/request';
import urls from './auth.url';

const authService = {
  getUserInfoByToken() {
    /* 根据token获取用户信息 */
    const token = window.localStorage.getItem('token');
    return jGet(urls.getUserInfoByToken, {
      token
    });
  },
  getPermissionList(customerCode:string, account:string) {
    /**
     * 获取权限
     * */
    return jGet(urls.getPermissionList(customerCode, account));
  },
  getRoleAndPermissionList(customerCode:string, account:string) {
    /**
     * 获取角色
     * @customerCode 售达方编码
     * @account 账号名
     * */
    return jGet(
      urls.roleAndPermissionList,
      {
        customerCode,
        account
      },
      {
        noLoading: true,
        noToast: true,
      }
    );
  },
};

export default authService;
