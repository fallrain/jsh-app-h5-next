import React, {
  FC,
  useMemo,
  useState
} from 'react';
import {
  Drawer
} from '@material-ui/core';
import classNames from 'classnames';
import './css/jPopPicker.scss';
import { AnyFun } from '../../../interface';

// import JSearchInput from './JSearchInput';

interface IJPopPickerChoseKey {
  /**
   * 选中的key
   * */
  key: string | number
  value: any
  isCanChecked?: boolean
}

interface IJPopPickerOption {
  /**
   * picker option
   * */
  key?: string | number
  value?: any
  isCanChecked?: boolean

  [propsName: string]: any
}

interface IJPopPicker {
  // 类型：radio/checkbox
  type?: string,
  // 显示隐藏
  show?: boolean,
  // 可否被点击
  isCanBeCheck?: boolean,
  // picker 标题
  title?: string | number,
  keyName?: string,
  // picker选项
  options?: IJPopPickerOption[]
  // 选中的key
  choseKeys?: (string | number) [],
  // 是否显示value
  isShowValue?: boolean,
  // 是否显示搜索框
  isShowSearch?: boolean,
  // 搜索的key
  searchKeys?: (string | number) [],
  // 是否显示确定
  isShowSure?: boolean,
  // 是否显示 x
  isShowClose?: boolean,
  // 头部自定义node
  headNode?: React.ReactNode,
  children?: { (...args: any[]): React.ReactNode },
  // 不能点击时候的回调
  cantCheckedCallback?: AnyFun,
  // 确定
  confirm?: AnyFun,
  // 关闭事件
  close: AnyFun,
  // 更新选中的key
  updateChoseKeys: AnyFun,
  // change 事件
  change?: AnyFun,
}

const JPopPicker: FC<IJPopPicker> = function ({
  type = 'radio',
  show = false,
  isCanBeCheck = true,
  title = '',
  keyName = 'key',
  options = [],
  choseKeys = [],
  isShowValue = true,
  isShowSearch = false,
  searchKeys = ['value'],
  isShowSure = false,
  isShowClose = true,
  headNode,
  children,
  cantCheckedCallback,
  confirm,
  close,
  updateChoseKeys,
  change
}) {
  // 选中的选项
  const [choseOptions, setChoseOptions] = useState<IJPopPickerOption[]>();

  const handleConfirm = function () {
    /**
     *  确定按钮
     *  */
    handleClose();
    confirm && confirm();
  };

  const handleClose = function () {
    /**
     *  关闭
     *  */
    close(false);
  };

  const check = function (item: IJPopPickerOption) {
    /**
     *  选中
     *  */
    // 不能被选中的时候直接返回
    if (item.isCanChecked === false) {
      if (cantCheckedCallback) {
        cantCheckedCallback(item);
      }
      return;
    }
    const {
      [keyName]: key
    } = item;
    let choseKeysAy: (string | number)[] = [];
    const index = choseKeys.findIndex((v) => v === key);
    if (type === 'radio') {
      // 已经选中的不做操作
      if (index > -1) {
        return;
      }
      choseKeysAy = [key];
    } else {
      if (index > -1) {
        choseKeysAy.splice(index, 1);
      } else {
        choseKeysAy.push(key);
      }
    }
    // choseOptions只有在check之后才组合数据，减少watch
    if (choseKeysAy.length) {
      setChoseOptions(options.filter((option) => choseKeysAy.find((v) => v === option[keyName])));
    } else {
      setChoseOptions([]);
    }
    // 上一次选中的key
    const oldChoseKeys = [...choseKeys];
    // 更新选中的keys
    updateChoseKeys(choseKeysAy);
    change && change(choseKeysAy, choseOptions, oldChoseKeys);
    handleClose();
  };

  const isEmpty = useMemo(() => {
    /* 是否是空的 */
    const opts = options;
    return !(opts && opts.length && opts.filter((v) => !v.isHide).length);
  }, [options]);

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={show}
      >
        <div className="jPopPicker-pop">
          <div className="jPopPicker-pop-head">
            <div className="jPopPicker-pop-head-title">{title}</div>
            {
              isShowSure && (
                <div
                  className="jPopPicker-pop-head-icon"
                  onClick={handleConfirm}
                >确定
                </div>
              )
            }
            {
              isShowClose && (
                <div
                  className="jPopPicker-pop-head-icon iconfont icon-cross j-common-icon-close-wrap"
                  onClick={handleClose}
                />
              )
            }
          </div>
          {
            isShowSearch && (
              <div
                className="jPopPicker-pop-search-wrap"
              >
                {/* <j-search-input
                  @change="search"
                  @search="search"
                  placeholder="请输入搜索信息"
                  v-model="searchValue"
                ></j-search-input> */}
              </div>
            )
          }
          <>
            {headNode}
          </>
          <div
            className="jPopPicker-pop-item-wrap"
          >
            {/* !item.isHide */}
            {
              options.map((item) => (
                <div
                  className={classNames([
                    'jPopPicker-pop-item',
                    choseKeys.find((v) => v === item[keyName]) && 'active',
                    item.isHide && 'hide'
                  ])}
                  key={item[keyName]}
                  onClick={() => check(item)}
                >
                  <div
                    className={classNames([
                      'jPopPicker-pop-item-icon iconfont icon-tick'
                    ])}
                  />
                  <div className="jPopPicker-pop-item-cnt">
                    {
                      isShowValue && (
                        <span>{item.value}</span>
                      )
                    }
                    {
                      children && (
                        children(item)
                      )
                    }
                  </div>
                </div>
              ))
            }
          </div>
          {
            isEmpty && (
              <div
                className="jPopPicker-pop-item-empty"
              >没有匹配的相关数据~
              </div>
            )
          }
        </div>
      </Drawer>
    </div>
  );
};

export default JPopPicker;
