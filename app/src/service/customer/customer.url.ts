import util from '../util/index';

const baseURL = 'customer';
const urls = {
  // 直播回放获取token
  queryYilihuoVideoToken: '/queryYilihuoVideoToken',
  // 我的评价 匿名评价
  experience: '/customer/experience',
  // 送达方地址列表
  addressesList(status:any) {
    return `/customers/auxiliary/addresses?status=${status}`;
  },
  // 售后付款方
  afterSalePayer: '/customers/auxiliary/payer',
  // 售后不良品页面开票方
  invoicer(customerCode:any) {
    return `/customers/${customerCode}/invoicer`;
  },
  // 收藏的商品的数据
  queryCustomerInterestProductByAccount: '/customer/queryCustomerInterestProductByAccount',
  // // 添加收藏
  // addInterestProduct: '/customer/addInterestProduct',
  // // 取消收藏
  // removeInterestProduct: '/customer/removeInterestProduct',
  // 余额支付信息
  inquire: '/customers/payerBalanceList/inquire',
  // 获取售达方信息
  getCustomer: '/customers/auxiliary/customer',
  // 获取送达方信息
  getSendCustomer: '/customers/auxiliary/addresses',
  // 获取送达方信息
  getWarehouse(code:string) {
    return `/cloud/${code}/warehouse`;
  },
  // 绑定网商银行获取合同编号
  genProtocolNumber: '/supplyChainFinance/genProtocolNumber',
  // 绑定网商银行签约协议
  bindBankApply: '/supplyChainFinance/bindBankApply',
  // 获取付款方列表
  getcustomersList(code:string) {
    return `/customers/${code}/payer`;
  },
  // 缴费申请
  posappliforpay(cid:string, no:string, rid:string) {
    return `/supplyChainFinance/preGetFeePage?customerID=${cid}&orderno=${no}&redeemId=${rid}`;
  },
  // 获取秘钥
  getSecretkey: '/customer/user/secretkey',
  // 关注商品
  queryCustomerInterestProduct: '/customer/queryCustomerInterestProduct',
  changeDefaultSendTo(sendToCode:string) {
    /* 切换默认送达方信息 */
    return `/customers/auxiliary/relations/${sendToCode}/default`;
  },
  // 售后登录后查询账户信息
  getAccountMsg: '/api/returnGoodApply/getAccountMsg',
  // 售后机器编码验证,带回产品信息
  infoSerialNoCheck: '/api/returnGoodApply/infoSerialNoCheck',
  // 售后不良品确认提交
  ZYProductRepairSubmit: '/api/returnGoodApply/ZYProductRepairSubmit',
  // 退货进度查询
  queryZYProductRepair(query:string) {
    return `/api/returnGoodApply/query${query}ProductRepair`;
  },
  // 查询产品组
  queryProductGroupList: '/api/returnGoodApply/queryProductGroupList',
  // 理货商提交报修
  tallyFirmRepairSubmit: '/api/returnGoodApply/tallyFirmRepairSubmit',
  // 理货商确认分页查询
  queryTallyFirm: '/api/returnGoodApply/queryTallyFirm',
  // 理货商打回申请
  tallyFirmReturnApply: '/api/returnGoodApply/tallyFirmReturnApply',
  // 哪买哪退确认按钮获取数据信息
  queryBuyReturnConfirm: '/api/returnGoodApply/queryBuyReturnConfirm',
  // 哪买哪退确认按钮获取数据信息
  getBuyReturnConfirmMsg: '/api/returnGoodApply/getBuyReturnConfirmMsg',
  // 哪买哪退确认按钮获
  buyReturnConfirm: '/api/returnGoodApply/buyReturnConfirm',
  // 哪买哪退确认按钮获
  QueryZYProductRepair2: '/api/returnGoodApply/queryZYProductRepair',
  // 网点新建查询
  queryNetworkList: '/queryNetworkList',
  queryNetworkApplyNode: '/queryNetworkApplyNode',
  // 验证是否进行过售后网点申请
  checkIsApply: '/checkIsApply',
  // 验证当前客户是否签约
  checkSignContract: '/checkSignContract',
  // hcc文件上传
  hccFileUpload(crmId:string, customerCode:string, step:string) {
    return `/hccFileUpload?crmId=${crmId}&customerCode=${customerCode}&step=${step}`;
  },
  // 退货进度查询页面评价
  evaluationSubmit: '/api/returnGoodApply/evaluationSubmit',
  // 退货进度查询页面 追加评价
  appendEvaluationSubmit: '/api/returnGoodApply/appendEvaluationSubmit',
  // 售后网点申请
  networkApply: '/networkApply',
  // 获取HCC市
  queryHCCCity: '/queryHCCCity',
  // 获取HCC区
  queryHCCDistrict: '/queryHCCDistrict',
  // 获取HCC省
  queryHCCProvince: '/queryHCCProvince',
  // 获取HCC乡镇街道
  queryHCCTown: '/queryHCCTown',
  // 查询售后的工贸
  queryHCCTrade: '/queryHCCTrade',
  // 业务办理  统仓统配账单列表
  weeklibillList: '/weeklibill/list',
  // 业务办理  窜货举报申请提交
  fleeingSubmit: '/fleeingGoods/submit',
  // 业务办理  窜货举报申请再次提交
  resubmit: '/fleeingGoods/resubmit',
  // 业务办理 窜货举报详情列表
  showFleeingGoodsList: '/fleeingGoods/showFleeingGoodsList',
  // 业务办理 窜货举报空调引流详情列表
  showNewFleeingGoodsList: '/fleeingGoods/showNewFleeingGoodsList',
  // 业务办理  窜货举报详情
  fleeingGoodsDetail: '/fleeingGoods/FleeingGoodsDetail',
  // 业务办理  窜货举报空调引流详情
  newFleeingGoodsDetail: '/fleeingGoods/newFleeingGoodsDetail',
  // 业务办理  窜货举报申请 特殊机制触发 空调引流窜货
  judgeProductCodeSpecial: '/fleeingGoods/judgeProductCodeSpecial',
  // 业务办理  窜货举报 查看图片
  getImage(id:string) {
    return `/fleeingGoods/getImage/${id}`;
  },
  // 业务办理  窜货举报 空调引流查看图片
  newFileDownload: '/fleeingGoods/newFileDownload',
  // 业务办理  窜货举报申请上传图片
  upload: '/fleeingGoods/upload',
  // 业务办理  窜货举报申请空调引流上传图片
  newFileUpload: '/fleeingGoods/newFileUpload',
  loanOrders: '/supplyChainFinance/loanOrders',
  // 信用还款
  resultRepaymentMessage(customerName:string, customerId:string, money:string, remarks:string) {
    return `/supplyChainFinance/resultRepaymentMessage?customerName=${customerName}&customerId=${customerId}&money=${money}&remarks=${remarks}`;
  },
  getfinancerechargelist(a:string) {
    return `/supplyChainFinance/preLoanApply/${a}`;
  },
  // 信用还款记录
  repaymentMessageList(
    custCode:string,
    custName:string,
    currentPage:string,
    repaydate:string,
    repaystate:string,
    pageNo:string,
    pageSize:string,
    recordcount:string
  ) {
    return `/supplyChainFinance/getRepaymentList?custCode=${custCode}&custName=${custName}&currentPage=${currentPage}
    &repaydate=${repaydate}&repaystate=${repaystate}&pageNo=${pageNo}&pageSize=${pageSize}&recordcount=${recordcount}`;
  },
  // 融资记录查询
  financingrecords: '/supplyChainFinance/loanHistory',
  // 赎货试算
  redemptiontrial: '/supplyChainFinance/feePreCalculation',

  // 融资充值申请
  getLoanApply: '/supplyChainFinance/loanApply',
  // 融资充值利息与保证金试算
  loanInterestPreCalculation: '/supplyChainFinance/loanInterestPreCalculation',
  // 签约信息
  signedInf: '/rrsCrowdftoUnit/signPage',
  // 签约
  sign: '/rrsCrowdftoUnit/signed',
  // 设置默认
  relations(userId:string) {
    return `/customers/auxiliary/relations/${userId}/default`;
  },
  fukuanRelations(code1:string, code2:string) {
    return `/customers/auxiliary/default/${code1}?salesGroupCode=${code2}`;
  },
  payerBalance(payerCode:string, salesGroupCode:string) {
    return `/customers/payerBalance/inquire?payerCode=${payerCode}&salesGroupCode=${salesGroupCode}`;
  },
  // 立即赎货
  redemption: '/supplyChainFinance/redeemGoodsApply',
  // 整车关注商品
  addInterestProduct(account:string, customerCode:string, productCodeList:string) {
    return `/customer/addInterestProduct/${account}/${customerCode}/${productCodeList}`;
  },
  // 整车取消关注商品
  removeInterestProduct: '/customer/removeInterestProduct',
  // 整车查询关注
  getFocusProduct: '/customer/queryCustomerInterestProductByAccount',
  // 获取所有的付款方
  getAllPayer: '/customers/auxiliary/payer/all?status=1',
  // 获取用户信息
  getCustomerMasterInformation(customerCode:string) {
    return `/getCustomerMasterInformation/${customerCode}`;
  },
  // 获取付款方列表
  getSaleGroupList(customerCode:string, salesGroupCode:string, status:string, axAccount:string) {
    return `/customers/${customerCode}/payer/all?salesGroupCode=${salesGroupCode}&status=${status}&axAccount=${axAccount}`;
  },
  // 获取付款方余额列表
  getPayerBalanceList: '/customers/payerBalanceList/inquire',
  // 获取送达方信息
  getToAddressList(customerCode:string, status:string) {
    return `/customers/${customerCode}/addresses?status=${status}`;
  },
};
util.addPrefix(baseURL, urls);
export default urls;
