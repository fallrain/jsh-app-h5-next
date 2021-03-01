import util from '../util/index';

const baseURL = 'coc/api';
const urls = {
  // 发送验证码
  getValueSync: '/cocCustomerPotentialCustomers/sendVerifyCod',
};
util.addPrefix(baseURL, urls);
export default urls;
