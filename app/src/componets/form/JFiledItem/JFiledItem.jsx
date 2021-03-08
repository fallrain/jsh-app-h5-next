import React from 'react';
import PropTypes from 'prop-types';
import './jFiledItem.scss';
import classNames from 'classnames';

function JFiledItem(props) {
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

JFiledItem.propTypes = {
  // 标题
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  // 额外的类名
  className: PropTypes.string,
  // 是否有必填标记
  required: PropTypes.bool,
  // 是否有箭头
  arrow: PropTypes.bool,
  // 右箭头点击事件
  arrowClick: PropTypes.func,
};

JFiledItem.defaultProps = {
  title: '',
  required: false,
  arrow: false,
  className: ''
};
export default JFiledItem;
