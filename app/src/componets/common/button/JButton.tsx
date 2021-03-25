import React, {
  useCallback
} from 'react';
import classNames from 'classnames';
import './jButton.scss';

interface IJButton {
  // 按钮文字
  text?: string,
  // 按钮类型
  type?: string,
  // 按钮样式类
  className?: string
  // 点击事件
  onClick?: { (...args: any[]): any }
}

function JButton(props:IJButton) {
  /* 公共按钮 */
  const {
    onClick
  } = props;
  const handleClick = useCallback(() => {
    /* 本按钮点击事件 */
    onClick && onClick();
  }, [onClick]);

  return (
    <button
      type="button"
      className={classNames([
        'jButton',
        props.type || 'default',
        props.className
      ])}
      onClick={handleClick}
    >{props.text}
    </button>
  );
}

export default JButton;
