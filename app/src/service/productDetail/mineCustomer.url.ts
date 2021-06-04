import util from '../util/index';

const baseURL = 'customer';
const urls = {
  mineBaseInfo(code: string) { // 我的-基本信息
    return `/getCustomerMasterInformation/${code}`;
  },
  mineSignList(code: string, pageNo: string) { // 我的-签约信息
    return `/getCustomerSigned/${code}?pageNum=${pageNo}&pageSize=15`;
  },
  productQueryInter: '/customer/queryCustomerInterestProductByAccount', // 商品详情-查询是否已关注
  productAddInter(code1: string, coede2: string, code: string) { // 商品详情-添加关注
    return `/customer/addInterestProduct/${code1}/${coede2}/${code}`;
  },
  productRemoveInter: '/customer/removeInterestProduct', // 商品详情-取消关注
  // 基本信息-交易权限、市场秩序、样品机权限
  getCustomerBasicInformation(code: string) {
    return `/getCustomerBasicInformation/${code}`;
  },
  // 基本信息-整车权限、金融服务
  getZhengCheAndFinancialDto(code: string) {
    return `/getZhengCheAndFinancialDto/${code}`;
  },
  // 签约信息
  getCustomerSigned(uid: string, page: string, pageCount: string) {
    return `/getCustomerSigned/${uid}?pageNum=${page}&pageSize=${pageCount}`;
  },
  // 门店信息
  getBranchInformation({
    num,
    size,
    customerCode
  }: {
    num: number,
    size: number,
    customerCode: string,
  }) {
    return `/getBranchInformation/${customerCode}?pageNum=${num}&pageSize=${size}`;
  },
  // 送达方列表
  customers(uid: string) {
    return `/customers/${uid}/addresses/all`;
  },
  // 付款方列表
  auxiliary(salesGroupCode: string, status: string, salesGroupCode2: string) {
    return `/customers/${salesGroupCode}/payer/all?salesGroupCode=${salesGroupCode2}&status=${status}`;
  },
  // 付款方余额
  payerBalanceList() {
    return '/customers/payerBalanceList/inquire';
  }
};
util.addPrefix(baseURL, urls);
export default urls;
