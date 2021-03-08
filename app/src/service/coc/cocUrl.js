import util from '../util/index';

const baseURL = 'coc/api';
const urls = {
  // 发送验证码
  sendVerifyCode: '/cocCustomerPotentialCustomers/sendVerifyCode',
  // 检查验证码
  checkVerifyCode: '/cocCustomerPotentialCustomers/checkVerifyCode',
  // 省数据
  provinceList: '/cocCustomerPotentialCustomers/lqlProvinceList',
  // 市数据
  cityList: '/cocCustomerPotentialCustomers/lqlCityList',
  // 区数据
  countyList: '/cocCustomerPotentialCustomers/lqlCountyList',
  // 街道信息
  streetList: '/cocCustomerPotentialCustomers/lqlKeepDownList',
  // 保存（注册）
  saveCustomerPotential: '/cocCustomerPotentialCustomers/saveCustomerPotential',
  // 上传营业执照
  uploadLicense: '/cocCustomerPotentialCustomers/info',
};
util.addPrefix(baseURL, urls);
export default urls;
