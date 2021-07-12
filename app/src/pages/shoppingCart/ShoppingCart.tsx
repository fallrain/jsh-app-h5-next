import React, {
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import './css/shoppingCart.scss';
import classNames from 'classnames';
import {
  getIndustryGroup
} from 'src/lib/dataDictionary';
import JShoppingCartItem from 'src/componets/shoppingCart/JShoppingCartItem';
import { useSelector } from 'react-redux';
import {
  produce
} from 'immer';
import JPopPicker from '../../componets/common/jPopPicker/JPopPicker';
import userSelector from '../../store/user/user.selector';
import { USER } from '../../store/actionTypes';

const ShoppingCart: FC = function () {
  // 产业picker显示隐藏
  const [isIndustryPickerShow, setIsIndustryPickerShow] = useState<boolean>(false);
  // 产业数据
  const [industryGroupData, setIndustryGroupData] = useState<{
    code: string,
    value: string
  }[]>([]);
  // 选中的产业keys
  const [choseIndustryOptions, setChoseIndustryOptions] = useState<string[]>(['*']);
  // 选中的送达方
  const [choseSendAddress, setChoseSendAddress] = useState<Record<string, any>>({});
  // 购物车列表
  const [shoppingList, setShoppingList] = useState<Record<string, any>[]>([]);
  // 信用额度列表（以产品大类为维度）
  const [creditQuotaList, setDreditQuotaList] = useState<Record<string, any>[]>([]);
  // 用户信息
  const userInf = useSelector(userSelector[USER.GET_SALE]);
  // 默认送达方
  const defaultSendTo = useSelector(userSelector[USER.GET_DEFAULT_SEND_TO]);
  const showIndustryPicker = useCallback(() => {
    /**
     *  展示产业picker
     *  */
    setIsIndustryPickerShow(true);
  }, []);

  const setIndustry = () => {
    // 获取产业并设置数据
    getIndustryGroup().then((data) => {
      const industryGroup = data.map((v: any) => ({
        code: v.code,
        value: v.codeName
      }));
      industryGroup.unshift({
        code: '*',
        value: '全部'
      });
      setIndustryGroupData(industryGroup);
    });
  };

  const validList = useMemo(() => {
    /**
     *  有效的商品列表
     *  */
    return shoppingList.filter((v) => v.isValid);
  }, [shoppingList]);

  const dataLength = useMemo(() => {
    /**
     *  购物车数据的长度
     *  */
    const validLength = validList.length;
    // 选择的产业的code
    const choseIndustryCode = choseIndustryOptions[0];
    const filterLength = validList.filter((v) => {
      if (v.$filterIndustryKey === choseIndustryCode) {
        return true;
      }
      return false;
    }).length;
    const notInFilterLength = validLength - filterLength;
    return {
      // 有效商品的长度
      validLength,
      // 有效商品的筛选出的长度
      filterLength,
      // 有效商品的排除筛选出的长度
      notInFilterLength
    };
  }, [validList, choseIndustryOptions]);

  const choseOtherVersionsChange = useCallback((checkedList, index) => {
    /**
     *  选择的版本change
     *  */
    const shoppingListTemp = [...shoppingList];
    shoppingListTemp[index].choseOtherVersions = checkedList;
    setShoppingList(shoppingListTemp);
  }, [shoppingList]);
  const choseOtherVersionsDel = useCallback((delIndex, index) => {
    /**
     *  选择的版本删除操作
     *  */
    const shoppingListTemp = [...shoppingList];
    shoppingListTemp[index].choseOtherVersions.splice(delIndex, 1);
    setShoppingList(shoppingListTemp);
  }, [shoppingList]);

  const changeObject = useCallback((data, map) => {
    /**
     *  根据字段改变数据
     *  */
    return produce(data, (draft:any) => {
      /* 根据字段改变数据 */
      Object.keys(map).forEach((key) => {
        let keyObj = draft;
        if (typeof key === 'string') {
          const keyAy = key.split('.');
          keyAy.forEach((v, index) => {
            if (index !== keyAy.length - 1) {
              keyObj = keyObj[v];
            }
          });
          keyObj[keyAy[keyAy.length - 1]] = map[key];
        } else {
          draft[key] = map[key];
        }
      });
    });
  }, []);
  const propertyChange = useCallback((val, index) => {
    /**
     *  单个属性改变
     *  */
    const shoppingListTemp = [...shoppingList];
    shoppingListTemp[index] = changeObject(shoppingListTemp[index], val);
    setShoppingList(shoppingListTemp);
  }, [changeObject, shoppingList]);
  useEffect(() => {
    /**
     * 初始化操作
     * */
    setIndustry();
  }, []);

  return (
    <div className="shoppingCart">
      <div className="shoppingCart-tab-wrap">
        <div
          onClick={showIndustryPicker}
          className="shoppingCart-tab-picker"
        >
          <span className="mr8">产业</span>
          <i className="iconfont icon-xia" />
        </div>
      </div>
      <div>
        <div className="shoppingCart-ads">
          <div className="shoppingCart-ads-total">共{dataLength.validLength}件宝贝</div>
          {/* <div */}
          {/*  onClick={showAdsPicker} */}
          {/*  className="shoppingCart-ads-detail" */}
          {/* > */}
          {/*  <i className="iconfont icon-local"></i> */}
          {/*  <text>配送至：{ choseSendAddress.name || '' }</text> */}
          {/* </div> */}
        </div>
        {
          (choseIndustryOptions[0] !== '*' || choseSendAddress.yunCangFlag) && (
            <div
              className="shoppingCart-list-filter-text"
            >
              共找到{dataLength.filterLength}件产品
            </div>
          )
        }
        <div
          className={classNames([
            'shoppingCart-list-filter',
            !dataLength.filterLength && 'dis-none'
          ])}
        >
          {
            shoppingList.map((goods, index) => (
              goods.isValid && goods.$filterIndustryKey === choseIndustryOptions[0] && (
                <div
                  key={goods.id}
                >
                  // 筛选出来的产业才显示
                  {/* <JShoppingCartItem */}
                  {/*  creditQuotaList={creditQuotaList} */}
                  {/*  defaultSendTo={defaultSendTo} */}
                  {/*  goods={goods} */}
                  {/*  index={index} */}
                  {/*  userInf={userInf} */}
                  {/*  versionPrice={versionPrice} */}
                  {/*  warehouseFlag={choseSendAddress.yunCangFlag} */}
                  {/*  followState={goods.followState} */}
                  {/*  // change={goodsChange} */}
                  {/*  choseOtherVersionsChange={choseOtherVersionsChange} */}
                  {/*  // numberChange={numberChange} */}
                  {/*  // choseOtherVersionsDel={choseOtherVersionsDel} */}
                  {/*  // propertyChange={propertyChange} */}
                  {/*  // updateTotal={updateTotal} */}
                  {/*  del={singleDeleteCart} */}
                  {/*  sign={toSign} */}
                  {/*  choseOtherVersionsDel={choseOtherVersionsDel} */}
                  {/*  propertyChange={propertyChange} */}
                  {/* /> */}
                </div>
              )
            ))
          }
        </div>
      </div>
      <JPopPicker
        keyName="code"
        title="产业"
        options={industryGroupData}
        show={isIndustryPickerShow}
        choseKeys={choseIndustryOptions}
        updateChoseKeys={setChoseIndustryOptions}
        change={setIsIndustryPickerShow}
        close={() => setIsIndustryPickerShow(false)}
      />
    </div>
  );
};

export default ShoppingCart;
