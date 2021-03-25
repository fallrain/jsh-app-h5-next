import React, { ReactNode } from 'react';
import './jFiledItem.scss';
import classNames from 'classnames';

interface IJFiledItem {
  // 标题
  title?: string | number
  // 额外的类名
  className?: string,
  // 是否有必填标记
  required?: boolean,
  // 是否有箭头
  arrow?: boolean,
  // 右箭头点击事件
  arrowClick?: { (): any },
  // 右侧节点
  renderRight?: string | ReactNode
  // 底部节点
  renderBottom?: string | ReactNode
}

function JFiledItem(props: IJFiledItem) {
  /**
   * 表单输入条目
   * */
  function handleArrow() {
    /**
     * 右箭头点击事件
     * */
    props.arrowClick && props.arrowClick();
  }

  return (
    <div className={classNames([
      'jFiledItem-wrap',
      props.className
    ])}
    >
      <div className="jFiledItem">
        <div className="jFiledItem-title">
          {props.required && (
            <span
              className="jFiledItem-title-star"
            >*
            </span>
          )}
          {props.title}
        </div>
        <div
          className="jFiledItem-right"
        >{props.renderRight}
        </div>
        {
          props.arrow && (
            <div
              className="jFiledItem-right-arrow"
              onClick={handleArrow}
            >
              <i
                className="iconfont icon-you"
              />
            </div>
          )
        }
      </div>
      {
        props.renderBottom && (
          <div
            className="jFiledItem-bottom"
          >{props.renderBottom}
          </div>
        )
      }
    </div>
  );
}

JFiledItem.defaultProps = {
  title: '',
  required: false,
  arrow: false,
  className: ''
};
export default JFiledItem;
