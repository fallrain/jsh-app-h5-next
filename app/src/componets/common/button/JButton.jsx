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
        'jButton'
      ])}
      onClick={handleClick}
    >{props.text}
    </button>
  );
}

JButton.propTypes = {
  // 按钮文字
  text: PropTypes.string
};
JButton.defaultProps = {
  // 按钮文字
  text: ''
};
export default JButton;
