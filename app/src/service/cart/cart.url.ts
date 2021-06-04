import util from '../util/index';
import {
  IGetShoppingCartList,
  IGetSpecialPrice
} from './cart.module';

const baseURL = 'cart';

const urls = {
  // 添加到购物车
  addToCart: '/shoppingCart/add/cart',
  // 获取购物车数据,刷新缓存
  getShoppingCartList(data: IGetShoppingCartList) {
    const {
      // 售达方code
      saletoCode,
      // 送达方code
      sendtoCode,
      // 子账号code
      saletoCodeSub
    } = data;
    return `/shoppingCart/get/list/${saletoCode}/${sendtoCode}/${saletoCodeSub}`;
  },
  // 从缓存获取购物车数据
  getShoppingCartListFromCache(saletoCodeSub: string) {
    /**
     * 子账号
     *@saletoCodeSub: String
     * */
    return `/shoppingCart/get/list/cache/${saletoCodeSub}`;
  },
  // 获取版本价格
  getSpecialPrice(
    {
      saletoCode,
      sendtoCode,
      account
    }: IGetSpecialPrice
  ) {
    return `/price/get/specialPrice/${saletoCode}/${sendtoCode}/${account}`;
  },
  // 售达方详细信息
  shoppingCart(uid: string) {
    return `/shoppingCart/getNumberByValid/${uid}`;
  },
  // 从购物车里移除商品
  deleteCart: '/shoppingCart/delete/cart',
  // 查询产业
  getIndustryList: '/shoppingCart/get/industryList',
  // 更新购物车数量
  updateProductNumber: '/shoppingCart/add/cart/updateProductNumber',
  // 获取云仓权限信息
  getCloudStockState: (customerCode: string) => `/shoppingCart/get/agreement/status/${customerCode}`,
  // 获取购物车数量
  getShoppingCartNum: (saletoCodeSub: string) => `/shoppingCart/getNumberByValid/${saletoCodeSub}`
};
util.addPrefix(baseURL, urls);
export default urls;
