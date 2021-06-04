import cartService from 'src/service/cart/cart.service';
import { IIndexObj } from '../../interface';

interface ICommonGetProps {
  key: string,
  service: ICommonGetService
}

interface ICommonGetService {
  (...args: any[]): Promise<any>
}

const util = {
  commonGet({ key, service }: ICommonGetProps) {
    /* 公共获取数据字典 */
    // key：localStorage名称 service获取数据的服务名
    const localStorageKey = `common.${key}`;
    const localStorageTimeKey = `common.${key}.time`;
    const local = localStorage.getItem(localStorageKey);
    // 缓存超过6点之后更新
    if (local) {
      let time: any = localStorage.getItem(localStorageTimeKey);
      if (time) {
        // getTime防止ios下bug
        time *= 1;
        const curTime = new Date();
        let validTime = true;
        if (
          curTime.getTime() - time * 1 > 3600 * 1000 * 24
          || (curTime.getHours() >= 6 && new Date(time).getHours() < 6)
        ) {
          validTime = false;
        }
        if (validTime) {
          return Promise.resolve(JSON.parse(local));
        }
      }
    }
    return service().then(({ code, data }) => {
      if (code === '1') {
        localStorage.setItem(localStorageKey, JSON.stringify(data));
        localStorage.setItem(localStorageTimeKey, `${new Date().getTime()}`);
      }
      return data || [];
    });
  }
};

function getGoodsType(): IIndexObj {
  /* 商品类型 */
  return {
    isFlashSale: '抢单',
    isBigorder: '反向定制',
    isArbitrage: '套餐',
    isCompose: '组合',
    isNewProduct: '新品',
    isHotPattern: '爆款',
    isSpecialOffer: '特价',
    isProject: '工程',
    isSample: '样机',
    isScf: '融资'
  };
}

function getGoodsTag(): IIndexObj {
  /* 商品标签 */
  return {
    isCoProduct: '智能产品',
    isJike: '机壳',
    isResource: '巨划算',
    isAccessories: '附件',
    isTownSpecial: '乡镇专供',
    isThreeSpecial: '三专专供',
    isProjectSpecial: '工程专供'
  };
}

function getGoodsPriceType(): IIndexObj {
  /* 商品标签 */
  return {
    PT: '普通价格',
    TJ: '特价',
    GC: '工程',
    YJCY: '样机出样(折扣样机)',
    MFJK: '免费机壳',
    MFYJ: '免费样机',
    MFYJJS: '免费样机结算',
    YPJ: '样品机',
    CTYJ: '成套样机'
  };
}

function getGoodsInCartPriceType(): IIndexObj {
  /* 在购物车里的商品标签 */
  return {
    PT: '普通价格',
    TJ: '特价',
    GC: '工程',
    YJCY: '样机',
    MFJK: '样机',
    MFYJ: '样机',
    MFYJJS: '样机',
    YPJ: '样机',
    CTYJ: '样机'
  };
}

function getPriceKeyFromAllPrice(): IIndexObj {
  /* 获取从all price等接口获取的价格的key */
  return {
    PT: 'PT',
    TJ: 'TJ',
    GC: 'GC',
    YJCT: 'YJCY',
    YJCY: 'YJCY',
    MFJK: 'YJCY',
    MFYJ: 'YJCY',
    YJ: 'YJCY'
  };
}

function getYj(): IIndexObj {
  /* 获取样机 */
  return {
    YJCT: 'YJCY',
    YJCY: 'YJCY',
    MFJK: 'YJCY',
    MFYJ: 'YJCY',
    YJ: 'YJCY'
  };
}

function getIndustryGroup() {
  /* 获取全部产品组 */
  return util.commonGet({
    key: 'industryGroup',
    service: cartService.getIndustryList
  });
}

function getOrdinaryCartActivityType(): IIndexObj {
  /* 普通购物车活动类型映射 */
  // 活动类型：1单品2组合3抢购4套餐5成套
  // 普通购物车的活动只有抢单和反向定制
  // 反向定制接口返回5，但是当做抢单（3），所以传3（真是无语）
  return {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 3
  };
}

function getStockType(): IIndexObj {
  /* 库存类型 */
  return {
    RRS库存: 'RRS库存',
    TC库存: 'TC库存',
    基地仓库存: '基地仓库存',
    安防库存: '安防库存',
    生活家电: '生活家电'
  };
}

function getBigOrderSignInf() {
  /* 反向定制协议类型 */
  // bigOrder遵循后端命名规则
  return '';
}

function getAccountTransferType(): IIndexObj {
  /* 账户互转类型 */
  return {
    0: '未审核',
    1: '已审核',
    2: '扣款失败',
    6: '草稿',
    7: '扣款成功'
  };
}

function getAccountTransferCertificate() {
  /* 账户凭证抬头文本类型 */
  return [
    {
      value: '普通户转空调户',
      key: '普通户转空调户'
    }, {
      value: '普通户转ZGOJ户',
      key: '普通户转ZGOJ户'
    }, {
      value: 'ZGOJ转普通户',
      key: 'ZGOJ转普通户'
    }, {
      value: '直营转伞下店',
      key: '直营转伞下店'
    }, {
      value: '转款',
      key: '转款'
    }, {
      value: '金融综合户转金融空调户',
      key: '金融综合户转金融空调户'
    }, {
      value: '空调户转综合户',
      key: '空调户转综合户'
    }, {
      value: '空调户转空调户',
      key: '空调户转空调户'
    }
  ];
}

function getBankLimit(service: ICommonGetService) {
  /* 获取个人储蓄打款银行 */
  return util.commonGet({
    key: 'bankLimitList',
    service
  });
}

export {
  getAccountTransferCertificate,
  getAccountTransferType,
  getBankLimit,
  getBigOrderSignInf,
  getGoodsPriceType,
  getGoodsInCartPriceType,
  getGoodsTag,
  getGoodsType,
  getIndustryGroup,
  getOrdinaryCartActivityType,
  getPriceKeyFromAllPrice,
  getStockType,
  getYj
};
