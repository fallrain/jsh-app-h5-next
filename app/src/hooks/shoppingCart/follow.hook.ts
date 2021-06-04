import productDetailService from 'src/service/productDetail/productDetail.service';

interface IUseFollowGoodsProps {
  // 售达方编码
  customerCode: string,
  // 产品编码
  productCode: string,
}

interface IUseUnFollowGoodsProps {
  // 账号
  account?: string,
  // 售达方编码
  customerCode: string,
  // 产品编码
  productCodeList: string[],
}

export function useFollowGoods() {
  /**
   *  添加关注
   *  */
  return async function (props: IUseFollowGoodsProps) {
    const {
      customerCode,
      productCode
    } = props;
    const { code, data } = await productDetailService.productAddInter(customerCode, customerCode, productCode);
    if (code === '200') {
      return data;
    }
  };
}

export function useUnFollowGoods() {
  /**
   *  取消关注
   *  */
  return async function (props: IUseUnFollowGoodsProps) {
    const { code, data } = await productDetailService.productRemoveInter(props);
    if (code === '1') {
      return data;
    }
  };
}
