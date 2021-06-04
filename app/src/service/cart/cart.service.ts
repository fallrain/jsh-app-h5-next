import {
  jGet,
  jPostJson
} from 'src/lib/request';
import urls from './cart.url';

export default {
  // addToCart(data) {
  //   /* 添加到购物车 */
  //   return jPostJson(urls.addToCart, data);
  // },
  // getShoppingCartList(data) {
  //   /* 从获取购物车数据  */
  //   const {
  //     saletoCode,
  //     sendtoCode,
  //     saletoCodeSub
  //   } = data;
  //   return jGet(
  //     urls.getShoppingCartList({
  //       saletoCode,
  //       sendtoCode,
  //       saletoCodeSub
  //     }),
  //     null,
  //     {
  //       noLoading: true
  //     }
  //   );
  // },
  // getShoppingCartListFromCache(data) {
  //   /* 从缓存获取购物车数据 */
  //   const {
  //     code,
  //     ...params
  //   } = data;
  //   return jGet(urls.getShoppingCartListFromCache(code), params);
  // },
  // getSpecialPrice(data) {
  //   /* 获取版本价格 */
  //   const {
  //     // 售达方code
  //     saletoCode,
  //     // 送达方code
  //     sendtoCode,
  //     // 账户（售达方code?）
  //     account
  //   } = data;
  //   return jGet(urls.getSpecialPrice({
  //     saletoCode,
  //     sendtoCode,
  //     account
  //   }),
  //   null,
  //   {
  //     noToast: true
  //   });
  // },
  // shoppingCart(uid: string) {
  //   return jGet(urls.shoppingCart(uid));
  // },
  // deleteCart(ids: string[]) {
  //   /* 从购物车里删除一个商品 */
  //   /**
  //    * 商品在购物车里的id集合
  //    * @ids:array
  //    * */
  //   return jPostJson(urls.deleteCart, ids);
  // },
  getIndustryList() {
    /* 获取产业 */
    return jGet(urls.getIndustryList);
  }
  // updateProductNumber(data) {
  //   /* 更新购物车数量 */
  //   return jPostJson(urls.updateProductNumber, data, { noLoading: true });
  // },
  // getCloudStockState(customerCode: string) {
  //   /* 获取云仓权限 */
  //   /**
  //    * 售达方编码
  //    * @customerCode:string
  //    * */
  //   return jGet(urls.getCloudStockState(customerCode), null, { noLoading: true });
  // },
  // getShoppingCartNum(customerCode: string) {
  //   /* 获取购物车商品数量 */
  //   /**
  //    * 售达方编码
  //    * @customerCode:string
  //    * */
  //   return jGet(urls.getShoppingCartNum(customerCode));
  // }
};
