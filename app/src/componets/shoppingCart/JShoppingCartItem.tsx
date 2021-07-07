import React, {
  FC,
  useState,
  useCallback,
  useMemo
} from 'react';
import {
  useHistory
} from 'react-router-dom';
import classNames from 'classnames';
import jshUtil from 'src/lib/util';
import JPopPicker from 'src/componets/common/jPopPicker/JPopPicker';
import {
  produce
} from 'immer';
// import JSwitch from '../form/JSwitch';
// import JVersionSpecifications from './JVersionSpecifications';
// import followGoodsMixin from '@/mixins/goods/followGoods.mixin';
// import shoppingCartMixin from '@/mixins/shoppingCart/shoppingCart.mixin';
import {
  getGoodsInCartPriceType,
  getYj
} from 'src/lib/dataDictionary';
// import AddNumberForm from '@/model/AddNumberForm';
// import JNumberBox from '../common/JNumberBox';
import {
  usePriceVersionData
} from 'src/hooks/shoppingCart/shoppingCart.hooks';
import JShoppingCartItemLike from './JShoppingCartItemLike';
import './css/JShoppingCartItem.scss';
import { AnyFun } from '../../interface';
import {
  useFollowGoods,
  useUnFollowGoods
} from '../../hooks/shoppingCart/follow.hook';
import { useStockPicker } from '../../hooks/shoppingCart/stockPicker.hook';
import { useWeekPicker } from '../../hooks/shoppingCart/weekPicker.hook';

interface IJShoppingCartItemProps {
  // 商品数据
  goods: Record<string, any>,
  // 不能选中
  disabledCheck?: boolean,
  // 商品索引
  index: string | number,
  // 仓库标志，云仓，异地云仓皆有值
  warehouseFlag: Record<string, any> | string,
  // 版本价格
  versionPrice: Record<string, any>,
  // 用户信息
  userInf: Record<string, any>,
  // 默认售达方信息
  defaultSendTo: Record<string, any>,
  creditQuotaList: Record<string, any>[],
  // 收藏状态
  followState: boolean,
  // 签约方法
  sign: AnyFun,
  // 移除购物车操作
  del: AnyFun,
  // 单属性改变
  propertyChange: AnyFun,
  // 更新总数
  updateTotal: AnyFun,
  // 删除版本
  choseOtherVersionsDel: AnyFun,
  // 选择其他版本
  choseOtherVersionsChange: AnyFun,
}

const JShoppingCartItem: FC<IJShoppingCartItemProps> = ({
  goods,
  disabledCheck = false,
  propertyChange,
  updateTotal,
  versionPrice,
  followState = false,
  warehouseFlag,
  userInf,
  ...props
}) => {
  // 路由历史对象
  const history = useHistory();
  // 版本价格
  const choseVersions = usePriceVersionData(goods, versionPrice);
  // 收藏
  const $mFollowGoods = useFollowGoods();
  // 取消收藏
  const $mUnFollowGoods = useUnFollowGoods();
  // 选择的远周次key
  const [choseWeekKeys, setChoseWeekKeys] = useState<string[]>(['']);
  // 版本信息
  const [specificationsList, setSpecificationsList] = useState<any[]>([]);
  // 是否显示版本规格
  const [isShowSpecifications, setIsShowSpecifications] = useState(false);
  // 选中的库存数据
  const [choseStockOptions, setChoseStockOptions] = useState(['']);

  const thisProduct = useMemo(() => {
    /**
     *  获取产品
     *  */
    return goods.productList && goods.productList[0];
  }, [goods.productList]);

  const {
    // 库存展示
    isStockPickerShow,
    setIsStockPickerShow,
    // 库存数据
    stockOptions
  } = useStockPicker(thisProduct.stock);

  const handleSign = () => {
    /**
     *  反向定制签约
     *  */
    props.sign();
  };

  const handleDel = () => {
    /**
     *  移除购物车操作
     *  */
    props.del(goods);
  };

  const choose = () => {
    /**
     *  选中本商品
     *  */
    if (disabledCheck) {
      return;
    }
    const {
      checked
    } = goods;
    propertyChange({
      checked: !checked
    });
    // 更新选中的商品数量和商品总价
    updateTotal();
  };

  const goDetail = (item: any) => {
    /**
     * 跳转产品详情
     * */
    history.push(`/pages/productDetail/productDetail?productCode=${item.productList[0].productCode}`);
  };

  const chosePrice = useMemo(() => {
    /**
     *  选择的用来显示价格的版本信息
     *  */
    const versions = choseVersions;
    // 非版本调货的才显示
    let v = versions.find((vs: any) => vs.priceType && !vs.$isRealProduct);
    if (!v) {
      if (versions.length) {
        // 说明有版本调货,版本调货无价格，需要取普通价
        v = goods.productList[0].priceInfo.commonPrice;
      } else {
        v = {};
      }
    }
    v = JSON.parse(JSON.stringify(v));
    v.invoicePrice = jshUtil.formatNumber(v.invoicePrice, 2);
    v.supplyPrice = jshUtil.formatNumber(v.supplyPrice, 2);
    v.rebateMoney = jshUtil.formatNumber(v.rebateMoney, 2);
    v.rebateRate = jshUtil.formatNumber(jshUtil.arithmetic(v.rebateRate, 100, 3), 2);
    return v;
  }, [
    choseVersions,
    goods
  ]);

  const totalChosePrice = useMemo(() => {
    /**
     *  本产品的总价格
     *  */
    let total = 0;
    if (chosePrice && chosePrice.invoicePrice) {
      total = jshUtil.arithmetic(chosePrice.invoicePrice, goods.number, 3);
    }
    return jshUtil.formatNumber(total, 2);
  }, [
    chosePrice.invoicePrice,
    goods.number
  ]);

  async function followGoods() {
    /* 添加关注 */
    const {
      customerCode
    } = userInf;
    await $mFollowGoods({
      customerCode,
      productCode: goods.productList[0].productCode
    });

    propertyChange({
      followState: true
    });
  }

  async function unFollowGoods() {
    /* 取消关注 */
    const {
      customerCode
    } = userInf;
    await $mUnFollowGoods({
      customerCode,
      productCodeList: [goods.productList[0].productCode]
    });
    propertyChange({
      followState: false
    });
  }

  const toggleFollow = (state: boolean) => {
    /**
     *  切换关注状态
     *  */
    if (state) {
      unFollowGoods();
    } else {
      followGoods();
    }
  };

  const showStockPicker = () => {
    /**
     *  库存picker 展示
     *  */
    // 有库存类型才显示
    if (stockOptions.length) {
      setIsStockPickerShow(true);
    }
  };

  const getVersionPriceState = () => {
    /**
     *  versionPrice是否有值
     *  */
    return !(!versionPrice || JSON.stringify(versionPrice) === '{}');
  };

  const isCreditModel = useMemo(() => {
    /**
     *  是否支持信用模式
     *  */
    // 传统渠道不支持信用模式
    if (userInf.channelGroup === 'CT') {
      return false;
    }
    // 未签约不展示信用模式
    if (!props.creditQuotaList || props.creditQuotaList.length === 0) {
      return false;
    }
    const {
      activityType,
      productList
    } = goods;
    // 库存信息
    if (thisProduct && thisProduct.stock && thisProduct.stock.storeInfo) {
      const storeInfo = thisProduct.stock.storeInfo;
      // 如果存在备货库存，且有数量，则不支持信用模式
      if (storeInfo.find((v: any) => v.stockTypeCode === '100' && v.qty > 0)) {
        return false;
      }
    }
    let state = false;
    // 异地云仓 抢购、反向定制都不支持信用模式
    state = productList[0].creditModel === '1'
      && !warehouseFlag
      && (activityType !== 3 || activityType !== 5);
    if (choseVersions && choseVersions.length) {
      // 查找是否有非普通版本，非普通除工程版本外也没有信用模式
      state = state && !choseVersions.find((v) => {
        const priceType = v.priceType;
        return !!(
          (priceType && (priceType.toUpperCase() !== 'PT' && priceType.toUpperCase() !== 'GC'))
          || v.$isTransfer
        );
      });
    }
    return state;
  }, [
    choseVersions,
    goods,
    props.creditQuotaList,
    thisProduct,
    userInf.channelGroup,
    warehouseFlag
  ]);

  const isFundsFirst = useMemo(() => {
    /**
     *  是否款先
     *  */
    let state = false;
    if (Object.keys(versionPrice).length) {
      const {
        kuanXian
      } = versionPrice;
      if (kuanXian && Object.keys(kuanXian).length && kuanXian[goods.productList[0].productCode] === '1') {
        state = true;
      }
    }
    // 传统渠道样机不支持选择款先，默认款先
    if (userInf.channelGroup === 'CT' && chosePrice) {
      const isContainYj = getYj()[chosePrice.priceType];
      state = state && !isContainYj;
    }
    // 异地云仓不支持选择款先，默认款先
    if (warehouseFlag === 'ydyc') {
      state = false;
    }

    return state;
  }, [
    chosePrice,
    goods.productList,
    userInf.channelGroup,
    versionPrice,
    warehouseFlag
  ]);

  const isDirect = useMemo(() => {
    /* 直发 */
    const product = thisProduct;
    if (!product) {
      return false;
    }
    // 符合显示直发的产品组
    const directProducts = ['BA', 'BB', 'BD'];
    const {
      productGroup
    } = product;
    const inProductGroup = directProducts.find((v) => v === productGroup);
    // 如果选中了工程版本，也会显示【直发】switch
    return inProductGroup
      || !!(choseVersions.find((v) => v.priceType === 'GC') && !choseVersions.find((v) => v.$isTransfer));
  }, [choseVersions, thisProduct]);

  const {
    // 远周次picker show
    isWeekPickerShow,
    setIsWeekPickerShow,
    // 远周次数据
    weekOptions
  } = useWeekPicker(goods.productList[0].productCode, versionPrice.week, getVersionPriceState);

  const isWeek = useMemo(() => {
    /**
     *  是否显示远周次
     *  */
    return !!weekOptions.length && !choseVersions.find((v) => v.$isTransfer);
  }, [choseVersions, weekOptions.length]);

  const isShowSpecificationsBtn = useMemo(() => {
    /* 是否显示【版本规格】按钮 */
    // console.log(specificationsList);
    // 信用模式下  版本规格中如果有工程版本则显示【版本规格】按钮
    if ((specificationsList.filter((v) => v.title === '工程版本' && !v.isHide).length) && goods.isCreditMode) return true;
    return !!(specificationsList.filter((v) => !v.isHide).length) && !goods.isCreditMode;
  }, [
    goods.isCreditMode,
    specificationsList
  ]);

  const genSpecificationsList = useCallback(() => {
    /* 组合版本规格信息 */
    // 重置版本信息
    setSpecificationsList([]);
    if (!getVersionPriceState()) {
      return;
    }
    const specificationsAy = [];
    const product = goods.productList[0];
    const {
      productCode,
      priceInfo,
      // 版本调货号，以此来判断是否有版本调货
      stockVersion
    } = product;
    // 是否存在备货库存
    let isStockUp = false;
    if (thisProduct && thisProduct.stock && thisProduct.stock.storeInfo) {
      const storeInfo = thisProduct.stock.storeInfo;
      // 如果存在备货库存，且有数量，则只能选工程版本
      if (storeInfo.find((v: any) => v.stockTypeCode === '100' && v.qty > 0)) {
        isStockUp = true;
      }
    }
    let {
      priceType
    } = product;
    const {
      TJ: tj,
      GC: gc,
      YJCY: yjList
    } = versionPrice.activity[productCode];
    // priceType转为大写
    priceType && (priceType = priceType.toUpperCase());
    const {
      activityType,
      productList
    } = goods;
    // (priceType)特价版本信息，已经有非普通版本价格的不可选择（调货除外）
    if (stockVersion || priceType === 'PT') {
      // 是否有特价
      let hasTj = true;
      // 如果是抢单或者反向定制，则specialPrice需要为Y才行
      if ((activityType === 3 || activityType === 5) && productList[0].specialPrice === 'N') {
        hasTj = false;
      }
      // 有备货库存只能选工程版本
      if (hasTj && !isStockUp) {
        const tjList = tj;
        if (tjList && tjList.length) {
          const tjVersion = {
            id: 'special',
            title: '特价版本',
            isExpand: true,
            isHide: false,
            list: []
          };
          tjVersion.list = tjList.map((v: any) => ({
            ...v,
            priceVersion: v.versionCode,
            name: v.versionCode,
            price: jshUtil.formatNumber(v.invoicePrice, 2),
            time: v.endDate && v.endDate.substring(0, 10),
            num: v.usableQty,
            priceType: v.priceType,
            checked: false
          }));
          specificationsAy.push(tjVersion);
        }
      }

      // (activityType)如果加入类型为抢单或者反向定制，则没有工程和样机
      if (activityType !== 3 && activityType !== 5) {
        // 工程版本信息
        if (gc && gc.length) {
          const version = {
            id: 'project',
            title: '工程版本',
            isExpand: true,
            isHide: false,
            list: []
          };
          version.list = gc.map((v: any) => ({
            ...v,
            priceVersion: v.versionCode,
            name: v.versionCode,
            price: jshUtil.formatNumber(v.invoicePrice, 2),
            time: v.endDate && v.endDate.substring(0, 10),
            num: v.usableQty,
            priceType: v.priceType,
            checked: false
          }));
          specificationsAy.push(version);
        }
        // 样机版本信息
        // 已有版本调货不可选样机
        // 有备货库存只能选工程版本
        if (!stockVersion && yjList && yjList.length && !isStockUp) {
          const version = {
            id: 'example',
            title: '样机版本',
            isExpand: true,
            isHide: false,
            list: []
          };
          version.list = yjList.map((v: any) => ({
            ...v,
            priceVersion: v.versionCode,
            name: v.versionCode,
            price: jshUtil.formatNumber(v.invoicePrice, 2),
            time: v.endDate && v.endDate.substring(0, 10),
            num: v.usableQty,
            priceType: v.priceType,
            checked: false
          }));
          specificationsAy.push(version);
        }
      }
    }
    // 自有渠道才有版本调货
    // 有备货库存只能选工程版本
    if (userInf.channelGroup === 'ZY' && !isStockUp) {
      // 调货 选的是普通、特价、工程的时候，还可选个调货
      if (!stockVersion && ['PT', 'TJ', 'GC'].find((v) => v === priceType)) {
        const transformVersionList = versionPrice.version.version[productCode];
        if (transformVersionList && transformVersionList.length) {
          const version = {
            id: 'transfer',
            title: '调货版本',
            isExpand: true,
            isHide: false,
            list: []
          };
          version.list = transformVersionList.map((v: any) => ({
            ...v,
            priceVersion: v.versionCode,
            name: v.versionCode,
            price: jshUtil.formatNumber(priceInfo.commonPrice.invoicePrice, 2),
            time: v.endDate && v.endDate.substring(0, 10),
            num: v.number,
            checked: false
          }));
          specificationsAy.push(version);
        }
      }
    }
    setSpecificationsList(specificationsAy);
  }, [
    getVersionPriceState,
    goods,
    thisProduct,
    userInf.channelGroup,
    versionPrice.activity,
    versionPrice.version.version
  ]);

  const choseVersionInf = useMemo(() => {
    /* 选择的版本信息 */
    const curVersions = choseVersions;
    // !!(product && product.priceType === 'PT');
    return curVersions.map((curVersion, index): {
      $parentId?: string,
      $choseIndex: string | number,
      $origin?: string,
      content: string
    } => {
      // 普通价格不额外显示
      const {
        // 版本类型
        priceType,
        $origin,
        $isTransfer
      } = curVersion;
      if (JSON.stringify(curVersion) === '{}' || (priceType === 'PT' && !$isTransfer) || curVersion.$isRealProduct) {
        return {
          $choseIndex: new Date().getTime() + index,
          content: ''
        };
      }
      const {
        // 版本名
        // priceTypeName,
        // 版本编号
        versionCode,
        // 版本发票价
        invoicePrice,
        // 版本可用数量
        usableQty,
        // 版本调货可用数量
        number,
        // 更新的版本的picker父id
        $parentId,
        // 更新的版本在picker里的index
        $choseIndex
      } = curVersion;
      const inf = {
        $parentId,
        $choseIndex,
        $origin,
        content: ''
      };
      if (priceType) {
        inf.content = `${getGoodsInCartPriceType()[priceType.toUpperCase()]}
        版本：${versionCode} ￥${invoicePrice} 数量：${usableQty}`;
      } else {
        inf.content = `版本调货：${versionCode} 数量：${number}`;
      }
      return inf;
    });
  }, [choseVersions]);

  const handleDelVersion = useCallback((item) => {
    /**
     *  移除一个版本操作
     *  */
    const {
      // 在picker里的版本id
      $parentId,
      // 在picker里的子版本条目index
      $choseIndex
    } = item;
    // 重置选中状态
    setSpecificationsList(produce(specificationsList, (list) => {
      const choseItem = list.find((v) => v.id === $parentId);
      choseItem.list[$choseIndex].checked = false;
    }));

    // 删除已选版本里的数据
    const delIndex = goods.choseOtherVersions.findIndex((v: any) => v.$parentId === $parentId && v.$choseIndex === $choseIndex);
    if (delIndex > -1) {
      props.choseOtherVersionsDel && props.choseOtherVersionsDel(delIndex);
    }
  }, []);

  return (
    <div>
      <div className="jShoppingCartItem j-fix-u-numberBox">
        {
          goods.productList[0].signWith ? (
            <div
              className="jShoppingCartItem-title jShoppingCartItem-title-other"
            >
              卖方:{goods.productList[0].signWith}
            </div>
          ) : (
            <div
              className="jShoppingCartItem-title jShoppingCartItem-title-default"
            >
              卖方:海尔集团
            </div>
          )
        }
        <div className="jShoppingCartItem-head">
          // 组合类型(1单品2组合3抢购4套餐5成套)
          {
            goods.activityType === 3 ? (
              <>
                <button
                  className="jShoppingCartItem-btn-primary mr12"
                  type="button"
                >抢购
                </button>
                <span className="jShoppingCartItem-head-text">活动到期日：{goods.expTime}</span>
                <div className="jShoppingCartItem-head-line" />
                <span className="jShoppingCartItem-head-text">活动数量：{goods.canBuy}</span>
              </>
            ) : (
              // 普通购物车5代表反向定制，属于抢购=。=
              goods.activityType === 5 && (
                <>
                  <button
                    className={classNames([
                      'jShoppingCartItem-btn-primary mr12',
                      goods.signed !== true && 'disabled'
                    ])}
                    type="button"
                  >反向定制
                  </button>
                  {
                    goods.signed !== true ? (
                      <>
                        <div className="j-flex-aic">
                          <div className="jShoppingCartItem-head-span">
                            未签约不能购买活动
                          </div>
                          <div
                            onClick={handleSign}
                            className="j-flex-aic ml20 jShoppingCartItem-head-to-sign"
                          >
                            <div
                              className="iconfont icongoahead jShoppingCartItem-head-to-sign-icon mr6"
                            />
                            前往签约
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="jShoppingCartItem-head-text">活动到期日：{goods.expTime}</span>
                        <div className="jShoppingCartItem-head-line" />
                        {
                          goods.intentionMoney && (
                            <>
                              <span className="jShoppingCartItem-head-text">预定金比例：{goods.intentionMoney}%</span>
                              <div className="jShoppingCartItem-head-line" />
                              <span className="jShoppingCartItem-head-text">直发订单</span>
                            </>
                          )
                        }
                      </>
                    )
                  }
                </>
              )
            )
          }
          <div
            onClick={handleDel}
            className="jShoppingCartItem-head-close iconfont icon-cross"
          />
        </div>
        <div className="jShoppingCartItem-cnt">
          <div
            className="jShoppingCartItem-cnt-check"
            onClick={choose}
          >
            {
              disabledCheck ? (
                <i
                  className="['iconfont icon-tabledisable disabled']"
                />
              ) : (
                <i
                  className={classNames([
                    'iconfont',
                    goods.checked ? 'icon-radio active' : 'icon-radio1'
                  ])}
                />
              )
            }
          </div>
          <div
            className="jShoppingCartItem-cnt-img-wrap"
            onClick={() => goDetail(goods)}
          >
            {/* <u-lazy-load */}
            {/*  :error-img="errorImg" */}
            {/*  :image="goods.productList && goods.productList[0].productImageUrl" */}
            {/*  onClick="goDetail(goods)" */}
            {/* ></u-lazy-load> */}
            <img
              src={goods.productList && goods.productList[0].productImageUrl}
            />
          </div>
          <div className="jShoppingCartItem-cnt-inf">
            <div className="jShoppingCartItem-cnt-inf-title">
              {goods.productList && goods.productList[0].productName}
            </div>
            <div className="jShoppingCartItem-cnt-price-inf">
              <div className="jShoppingCartItem-cnt-price">
                ¥{chosePrice.invoicePrice || '价格待公布！'}
              </div>
              <div className="jShoppingCartItem-cnt-price-inf-item">
                小计：¥{totalChosePrice || '0.00'}
              </div>
              {/* <j-number-box */}
              {/*  :max="maxGoodsNumber" */}
              {/*  :min="minGoodsNumber" */}
              {/*  :value="goods.number" */}
              {/*  @blur="goodsNumChange" */}
              {/*  @minus="goodsNumChange" */}
              {/*  @plus="goodsNumChange" */}
              {/* ></j-number-box> */}
            </div>
          </div>
          <JShoppingCartItemLike
            followState={followState}
            change={toggleFollow}
          />
        </div>
        <div className="jShoppingCartItem-btm">
          <div className="jShoppingCartItem-btm-options-wrap">
            <div className="jShoppingCartItem-btm-tags mr34">
              {
                goods.productList[0].swrhFlag === 'Y' && !warehouseFlag && (
                  <div
                    className="jShoppingCartItem-btm-tag"
                  >统
                  </div>
                )
              }
              {
                goods.productList[0].signStatus === 'Y' && warehouseFlag !== 'ydyc' && (
                  <div
                    className="jShoppingCartItem-btm-tag"
                  >云
                  </div>
                )
              }
              {
                goods.productList[0].ydzfFlag === 'Y' && warehouseFlag !== 'yc' && (
                  <div
                    className="jShoppingCartItem-btm-tag"
                  >异
                  </div>
                )
              }
            </div>
            <div
              onClick={showStockPicker}
              className="jShoppingCartItem-btm-text"
            >
              库存：{goods.productList[0].productStock}
              {
                stockOptions.length && (
                  <div
                    className="iconfont iconxia"
                  />
                )
              }
            </div>
            <div className="j-flex-aic">
              {
                isCreditModel && (
                  <div
                    className="jShoppingCartItem-btm-switch-wrap"
                  >
                    {/* <j-switch */}
                    {/*  :active="goods.isCreditMode" */}
                    {/*  :beforeChange="handleBeforeCreditModeChange" */}
                    {/*  @change="switchModeChange('isCreditMode',$event)" */}
                    {/* > */}
                    {/* </j-switch> */}
                    <span className="jShoppingCartItem-btm-switch-text mr32 ml8">信用模式</span>
                  </div>
                )
              }
              {
                isFundsFirst && (
                  <div
                    className="jShoppingCartItem-btm-switch-wrap"
                  >
                    {/* <j-switch */}
                    {/*  :active="goods.isFundsFirstMode" */}
                    {/*  @change="switchModeChange('isFundsFirstMode',$event)" */}
                    {/* > */}
                    {/* </j-switch> */}
                    <span className="jShoppingCartItem-btm-switch-text mr32 ml8">款先</span>
                  </div>
                )
              }
              {
                isDirect && (
                  <div
                    className="jShoppingCartItem-btm-switch-wrap"
                  >
                    {/* <j-switch */}
                    {/*  :active="goods.isDirectMode" */}
                    {/*  @change="switchModeChange('isDirectMode',$event)" */}
                    {/* > */}
                    {/* </j-switch> */}
                    <span className="jShoppingCartItem-btm-switch-text mr32 ml8">直发</span>
                  </div>
                )
              }
              {
                isWeek && (
                  <div
                    className="jShoppingCartItem-btm-switch-wrap"
                  >
                    {/* <j-switch */}
                    {/*  :active="goods.isWeekMode" */}
                    {/*  @change="switchModeChange('isWeekMode',$event)" */}
                    {/* > */}
                    {/* </j-switch> */}
                    <span
                      className="jShoppingCartItem-btm-switch-text ml8"
                    >远周次
                    </span>
                    {
                      goods.isWeekMode && (
                        <>
                          <span
                            onClick={() => setIsWeekPickerShow(true)}
                            className="jShoppingCartItem-btm-week-text mr4 ml8"
                          >{choseWeekKeys.join('') || '请选择时间'}
                          </span>
                          <div
                            onClick={() => setIsWeekPickerShow(true)}
                            className="iconfont iconxia mr32"
                          />
                        </>
                      )
                    }
                  </div>
                )
              }
            </div>
            {
              isShowSpecificationsBtn && (
                <div
                  className={classNames([
                    'jShoppingCartItem-btm-version-picker',
                    goods.choseOtherVersions.length && 'active'
                  ])}
                  onClick={() => {
                    setIsShowSpecifications(true);
                  }}
                >
                  <span>版本规格</span>
                  <i className="iconfont icon-xia" />
                </div>
              )
            }
          </div>
          {
            choseVersionInf && choseVersionInf.length && (
              <>
                {
                  choseVersionInf.map((inf, index) => (
                    <div
                      key={inf.$choseIndex}
                    >
                      {
                        inf && inf.content && (
                          <div
                            className="jShoppingCartItem-btm-inf-wrap"
                          >
                            {
                              inf.$origin === 'update' && (
                                <div
                                  className="jShoppingCartItem-btm-inf-close"
                                  onClick={() => {
                                    handleDelVersion(inf);
                                  }}
                                >
                                  <div className="iconfont icon-cross" />
                                </div>
                              )
                            }
                            <div className="jShoppingCartItem-btm-inf-icon">
                              <div className="iconfont icon-i" />
                            </div>
                            <div>{inf.content}</div>
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </>
            )
          }
          <div>
            {
              choseVersions.map((item, index) => (
                <>
                  {
                    item.$isRealProduct && (
                      <div
                        key={item.id}
                        className="jShoppingCartItem-btm-inf-real-wrap"
                      >
                        <div
                          className="jShoppingCartItem-btm-inf-real-icon mr10"
                        >
                          <i className="iconfont icon-calculator" />
                        </div>
                        <div className="jShoppingCartItem-btm-inf-real-cnt">
                          <div className="jShoppingCartItem-btm-inf-real-title j-text-ellipsis">
                            样机版本：{item.versionCode}
                          </div>
                          <div className="jShoppingCartItem-btm-inf-real-text-wrap">
                            <span className="mr20">价格：¥{item.invoicePrice || '价格待公布！'}</span>
                            <span className="mr20">数量：{item.usableQty}</span>
                            <span className="mr20">小计：¥{item.$realProductTotalPrice || '0.00'}</span>
                          </div>
                        </div>
                        {
                          item.$origin === 'update' && (
                            <div
                              className="jShoppingCartItem-btm-inf-real-close-wrap"
                            >
                              <i
                                onClick={() => handleDelVersion(item)}
                                className="jShoppingCartItem-btm-inf-real-close iconfont icon-cross"
                              />
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                </>
              ))
            }
          </div>
        </div>
      </div>
      <div className="jShoppingCartItem-stock-picker-par">
        <JPopPicker
          title="库存"
          keyName="stockTypeCode"
          close={() => { setIsStockPickerShow(false); }}
          updateChoseKeys={setChoseStockOptions}
          choseKeys={choseStockOptions}
          isCanBeCheck={false}
          isShowValue={false}
          options={stockOptions}
          show={isStockPickerShow}
        >
          {
            (slotProps: any) => (
              <>
                <div className="jShoppingCartItem-stock-picker-wrap">
                  <div
                    className="jShoppingCartItem-stock-picker-l"
                  >
                    <div className="jShoppingCartItem-stock-picker-dot" />
                    <span className="jShoppingCartItem-stock-picker-text">{slotProps.data.stockType}</span>
                    <span>{slotProps.data.qty}</span>
                    台
                  </div>
                  <div
                    className="jShoppingCartItem-stock-picker-r"
                  >预计到货时间：{slotProps.data.arrivalTime}
                  </div>
                </div>
              </>
            )
          }
        </JPopPicker>
      </div>
      <JPopPicker
        close={() => setIsWeekPickerShow(false)}
        updateChoseKeys={setChoseWeekKeys}
        choseKeys={choseWeekKeys}
        options={weekOptions}
        show={isWeekPickerShow}
        title="远周次"
      />
      // end
    </div>
  );
};
export default JShoppingCartItem;
