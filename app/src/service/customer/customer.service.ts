import {
  IResult,
  jGet,
  jPostJson,
} from 'src/lib/request';
import urls from './customer.url';
import { IDefaultSendTo } from './customer.service.module';

const customerService = {
  queryYilihuoVideoToken(data: any) {
    return jGet(urls.queryYilihuoVideoToken, data);
  },
  experience(data: any) {
    return jPostJson(urls.experience, data);
  },
  addressesList(data: any) {
    /* 地址列表 */
    return jGet<IDefaultSendTo[]>(
      urls.addressesList(data),
      null,
      {
        noLoading: true
      }
    );
  },
  getCustomer() {
    /* 获取售达方 */
    return jGet(urls.getCustomer);
  },
  getSendCustomer(params: any) {
    /* 获取送达方 */
    return jGet(urls.getSendCustomer, params, { noLoading: true });
  },
  getWarehouse(data: any) {
    /* 获取送达方 */
    const {
      customerCode,
      ...params
    } = data;
    return jGet(urls.getWarehouse(customerCode), params);
  },
  // pos缴费申请
  posappforpay(cid: any, no: any, rid: any) {
    return jGet(urls.posappliforpay(cid, no, rid));
  },
  // 绑定网商银行获取合同编号
  genProtocolNumber(data: any) {
    return jGet(urls.genProtocolNumber, data);
  },
  bindBankApply(data: any) {
    return jPostJson(urls.bindBankApply, data);
  },
  getcustomersList(code: any, data: any) {
    /* 获取付款方列表 */
    return jGet(urls.getcustomersList(code), data, { noLoading: true });
  },
  // 收藏的商品的数据
  queryCustomerInterestProductByAccount(data: any) {
    return jPostJson(urls.queryCustomerInterestProductByAccount, data, { noLoading: true });
  },
  // // 添加收藏
  // addInterestProduct(data) {
  //   const account = store.state.user.tokenUserInf.name;
  //   return jPostJson(`${urls.addInterestProduct}/${data.customerCode}/${account}/${data.productCode}`);
  // },
  // // 取消收藏
  // removeInterestProduct(data) {
  //   return jPostJson(urls.removeInterestProduct, data);
  // },
  // 余额支付信息
  inquire(data: any) {
    return jPostJson(urls.inquire, data, { noLoading: true });
  },
  getSecretkey(data: any) {
    return jPostJson(urls.getSecretkey, data);
  },
  queryCustomerInterestProduct(data: any) {
    /* 获取关注商品 */
    const {
      // 账户
      account,
      // 默认售达id
      sendtoCode,
      // 客户id
      customerCode,
      // 产品名
      productName
    } = data;
    return jGet(
      urls.queryCustomerInterestProduct, {
        account,
        sendtoCode,
        customerCode,
        productName
      }, {
        noToast: true
      }
    );
  },
  changeDefaultSendTo(data: any) {
    /* 更改默认送达方 */
    const {
      // 送达方code
      sendToCode,
    } = data;
    return jGet(urls.changeDefaultSendTo(sendToCode));
  },
  signedInf(data: any) {
    /* 签约信息 */
    const {
      // 送达方code
      sendtoCode,
    } = data;
    return jGet(urls.signedInf, {
      sendtoCode
    });
  },
  sign(data: any) {
    /* 签约 */
    const {
      // 送达方code
      sendtoCode,
    } = data;
    return jGet(urls.sign, {
      sendtoCode
    });
  },
  relations(userId: any) {
    return jGet(urls.relations(userId));
  },
  fukuanRelations(code1: any, code2: any) {
    return jGet(urls.fukuanRelations(code1, code2));
  },
  payerBalance(payerCode: any, salesGroupCode: any) {
    return jGet(urls.payerBalance(payerCode, salesGroupCode));
  },
  getAccountMsg(data: any) {
    /* 售后登录用户信息 */
    return jGet(urls.getAccountMsg, data);
  },
  afterSalePayer(queryStr: any) {
    /* 售后付款方列表 */
    return jGet(urls.afterSalePayer + queryStr);
  },
  invoicer(customerCode: any) {
    return jGet(urls.invoicer(customerCode));
  },
  infoSerialNoCheck(data: any) {
    /* 机器编码校验 */
    return jGet(urls.infoSerialNoCheck, data);
  },
  ZYProductRepairSubmit(data: any) {
    /* 不良品提交 */
    return jPostJson(urls.ZYProductRepairSubmit, data);
  },
  queryZYProductRepair(query: any, data: any) {
    /* 退货进度查询 */
    return jPostJson(urls.queryZYProductRepair(query), data);
  },
  queryProductGroupList(data: any) {
    /* 产品组查询 */
    return jGet(urls.queryProductGroupList, data);
  },
  tallyFirmRepairSubmit(data: any) {
    /* 理货商提交报修 */
    return jGet(urls.tallyFirmRepairSubmit, data);
  },
  queryTallyFirm(data: any) {
    /* 理货商确认分页查询 */
    return jGet(urls.queryTallyFirm, data);
  },
  tallyFirmReturnApply(data: any) {
    /* 理货商打回申请 */
    return jGet(urls.tallyFirmReturnApply, data);
  },
  // 哪买哪退确认按钮获取数据信息
  queryBuyReturnConfirm(params: any) {
    return jPostJson(urls.queryBuyReturnConfirm, params);
  },
  // 哪买哪退确认按钮获取数据信息
  getBuyReturnConfirmMsg(params: any) {
    return jGet(urls.getBuyReturnConfirmMsg, params);
  },
  // 哪买哪退确认按钮获取数据信息
  buyReturnConfirm(params: any) {
    return jPostJson(urls.buyReturnConfirm, params);
  },
  queryZYProductRepair2(params: any) {
    return jPostJson(urls.QueryZYProductRepair2, params);
  },
  queryNetworkList(params: any) {
    return jPostJson(urls.queryNetworkList, params);
  },
  queryNetworkApplyNode(params: any) {
    return jGet(urls.queryNetworkApplyNode, params);
  },
  evaluationSubmit(data: any) {
    return jPostJson(urls.evaluationSubmit, data);
  },
  appendEvaluationSubmit(data: any) {
    return jPostJson(urls.appendEvaluationSubmit, data);
  },
  // 验证是否进行过售后网点申请
  checkIsApply(data: any) {
    return jPostJson(urls.checkIsApply, data);
  },
  // 验证当前客户是否签约
  checkSignContract(data: any) {
    return jGet(urls.checkSignContract, data);
  },
  // 售后网点申请
  networkApply(data: any) {
    return jPostJson(urls.networkApply, data, {
      noToast: true
    });
  },
  // 获取HCC省
  queryHCCProvince(data: any) {
    return jGet(urls.queryHCCProvince, data);
  },
  // 获取HCC市
  queryHCCCity(data: any) {
    return jGet(urls.queryHCCCity, data);
  },
  // 获取HCC区
  queryHCCDistrict(data: any) {
    return jGet(urls.queryHCCDistrict, data);
  },
  // 获取HCC乡镇街道
  queryHCCTown(data: any) {
    return jGet(urls.queryHCCTown, data);
  },
  // 查询售后的工贸
  queryHCCTrade(data: any) {
    return jGet(urls.queryHCCTrade, data);
  },
  judgeProductCodeSpecial(data: any) {
    return jGet(urls.judgeProductCodeSpecial, data);
  },
  // 业务办理  统仓统配账单列表
  weeklibillList(data: any) {
    return jGet(urls.weeklibillList, data);
  },
  // 业务办理  窜货举报申请提交
  fleeingSubmit(data: any) {
    return jPostJson(urls.fleeingSubmit, data); // 请求未知
  },
  resubmit(data: any) {
    return jPostJson(urls.resubmit, data);
  },
  // 业务办理 窜货举报详情列表
  showFleeingGoodsList(data: any) {
    return jPostJson(urls.showFleeingGoodsList, data);
  },
  showNewFleeingGoodsList(data: any) {
    return jPostJson(urls.showNewFleeingGoodsList, data);
  },
  // 业务办理  窜货举报详情
  fleeingGoodsDetail(data: any) {
    return jPostJson(urls.fleeingGoodsDetail, data);
  },
  // 业务办理  空气引流窜货举报详情
  newFleeingGoodsDetail(data: any) {
    return jGet(urls.newFleeingGoodsDetail, data);
  },
  // 业务办理  窜货举报查看图片
  getImage(id: any) {
    return jGet(urls.getImage(id));
  },
  // 业务办理 空调引流 窜货举报查看图片
  newFileDownload(data: any) {
    return jGet(urls.newFileDownload, data);
  },
  // 信用还款
  resultRepaymentMessage(customerName: any, customerId: any, money: any, remarks: any) {
    /* 信用还款 */
    return jGet(urls.resultRepaymentMessage(customerName, customerId, money, remarks));
  },
  // 信用还款记录
  repaymentMessageList(
    custCode: any,
    custName: any,
    currentPage: any,
    repaydate: any,
    repaystate: any,
    pageNo: any,
    pageSize: any,
    recordcount: any
  ) {
    /* 信用还款 */
    return jGet(urls.repaymentMessageList(custCode, custName, currentPage, repaydate, repaystate, pageNo, pageSize, recordcount));
  },
  // 融资充值列表获取接口
  getfinancerechargelist(a: any) {
    return jGet(urls.getfinancerechargelist(a));
  },
  getfinancingrecordeslist(data: any) {
    return jPostJson(urls.financingrecords, data);
  },
  // 赎货试算
  getredemptiontrial(data: any) {
    return jPostJson(urls.redemptiontrial, data);
  },
  // 融资充值申请
  getLoanApply(data: any) {
    return jPostJson(urls.getLoanApply, data);
  },
  // 融资充值利息与保证金试算
  loanInterestPreCalculation(data: any) {
    return jPostJson(urls.loanInterestPreCalculation, data);
  },
  // 立即赎货
  redemption(data: any) {
    return jPostJson(urls.redemption, data);
  },
  // 整车关注商品
  addInterestProduct(account: any, customerCode: any, productCodeList: any) {
    return jPostJson(urls.addInterestProduct(account, customerCode, productCodeList));
  },
  // 整车取消关注商品
  removeInterestProduct(data: any) {
    return jPostJson(urls.removeInterestProduct, data);
  },
  // 整车查询关注
  getFocusProduct(data: any) {
    return jPostJson(urls.getFocusProduct, data, { noLoading: true });
  },
  // 获取所有的付款方
  getAllPayer(data: any, option: any) {
    return jGet(urls.getAllPayer, data, option);
  },
  // 获取用户信息
  getCustomerMasterInformation(customerCode: any) {
    return jGet(urls.getCustomerMasterInformation(customerCode));
  },
  // 获取付款方列表
  getSaleGroupList(customerCode: any, salesGroupCode: any, status: any, axAccount: any) {
    return jGet(urls.getSaleGroupList(customerCode, salesGroupCode, status, axAccount));
  },
  // 获取付款方余额列表
  getPayerBalanceList(params: any) {
    return jPostJson(urls.getPayerBalanceList, params);
  },
  // 获取送达方信息
  getToAddressList(customerCode: any, status: any) {
    return jGet(urls.getToAddressList(customerCode, status));
  },
};
export default customerService;
