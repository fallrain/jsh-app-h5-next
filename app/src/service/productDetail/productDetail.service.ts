import {
  jGet,
  jPost,
  jPostJson
} from 'src/lib/request';
import url from './productDetail.url';
import urls from './productActivity.url';
import urles from './mineCustomer.url';
import { IProductDetailArgs } from './productDetail.module';
// import store from '@/store/index';

export default {
  productDetail(data: IProductDetailArgs) {
    // debugger
    /* 产品详情 */
    return jGet(url.productDetail(data.code, data.codeSale, data.codeSend));
  },
  productStock(data: any) {
    /* 产品-库存 */
    return jPostJson(url.productStock, data, { noLoading: true });
  },
  productHostList(codeSale: string, codeSend: string) {
    /* 产品详情 */
    return jGet(urls.productHotList(codeSale, codeSend), undefined, { noLoading: true });
  },
  productQueryInter(data: any) {
    /* 商品详情-查询是否已关注 */
    return jPostJson(urles.productQueryInter, data, { noLoading: true });
  },
  productAddInter(code1: string, code2: string, code: string) {
    /* 商品详情-添加关注 */
    // account不是售达方customerCode
    // todo 后期把code2去掉
    // const account = store.state.user.tokenUserInf.name;
    return jPost(urles.productAddInter(code1, code2, code));
  },
  productRemoveInter(data: any) {
    /* 商品详情-取消关注 */
    return jPostJson(urles.productRemoveInter, data);
  },
  productShare(productCode: string, name: string, phone: string) {
    /* 产品分享 lml */
    return jGet(url.productShare(productCode, name, phone));
  }
};
