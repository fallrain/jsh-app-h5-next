import util from '../util/index';

const baseURL = 'activity/api';
const urls = {
  productHotList(codeSale: string, codeSend: string) { // 产品详情-热门推荐列表
    return `/product/hot/list?sendtoCode=${codeSend}&saletoCode=${codeSale}`;
  },
};
util.addPrefix(baseURL, urls);
export default urls;
