import util from '../util/index';

const baseURL = 'commodity/api';
const urls = {
  productDetail(code: string, codeSale: string, codeSend: string) { // 产品-基本信息
    return `/product/detail/${code}?saleTo=${codeSale}&sendTo=${codeSend}`;
  },
  productStock: '/productStock/stock', // 产品-库存
  catalog: '/catalog/list', // 分类类目
  productShare(code: string, name: string, phone: string) { // 分享
    return `/product/getStaticPage?productCode=${code}&contactPerson=${name}&contactNumber=${phone}`;
  }
};
util.addPrefix(baseURL, urls);
export default urls;
