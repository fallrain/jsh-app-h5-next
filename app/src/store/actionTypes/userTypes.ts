const prefix = 'user';
export default {
  // 获取用户信息
  GET_USER: `${prefix}.getUser`,
  // 更新用户信息
  UPDATE_USER: `${prefix}.updateUser`,
  // 获取售达方信息
  GET_SALE: `${prefix}.getSale`,
  // 更新售达方信息
  UPDATE_SALE: `${prefix}.updateSale`,
  // 异步更新售达方信息
  UPDATE_SALE_ASYNC: `${prefix}.updateSaleAsync`,
  // token用户信息
  GET_TOKEN_USER: `${prefix}.getTokenUser`,
  // 更新token用户信息
  UPDATE_TOKEN_USER: `${prefix}.updateTokenUser`,
  // 异步更新token用户信息
  UPDATE_TOKEN_USER_ASYNC: `${prefix}.updateTokenUserAsync`,
  // 默认送达方信息
  GET_DEFAULT_SEND_TO: `${prefix}.getDefaultSendTo`,
  // 更新默认送达方信息
  UPDATE_DEFAULT_SEND_TO: `${prefix}.updateDefaultSendTo`,
  // 接口取默认送达方信息
  UPDATE_DEFAULT_SEND_TO_ASYNC: `${prefix}.updateDefaultSendToAsync`,
  // 接口取用户权限信息
  UPDATE_PERMISSION_ASYNC: `${prefix}.updatePermissionAsync`,
  //  更新用户权限信息
  UPDATE_PERMISSION: `${prefix}.updatePermission`,
  // 用户权限信息
  GET_PERMISSION_LIST: `${prefix}.getPermissionList`,
};
