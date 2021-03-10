import React, {
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './jButton.scss';

function JButton(props) {
  /* 公共按钮 */
  const {
    onClick
  } = props;
  const handleClick = useCallback(() => {
    /* 本按钮点击事件 */
    props.onClick();
  }, [onClick]);

  return (
    <button
      type="button"
      className={classNames([
        'jButton',
        props.type,
        props.className
      ])}
      onClick={handleClick}
    >{props.text}
    </button>
  );
}

JButton.propTypes = {
  // 按钮文字
  text: PropTypes.string,
  // 按钮类型
  type: PropTypes.string,
  // 按钮样式类
  className: PropTypes.string,
};
JButton.defaultProps = {
  // 按钮文字
  text: '',
  type: 'default',
  className: '',
};
export default JButton;
