import React from 'react';
import PropTypes from 'prop-types';
import './jInput.scss';
import classNames from 'classnames';

class JInput extends React.Component {
  constructor(props) {
    super(props);
    const {
      name,
      value
    } = this.props;
    this.state = {
      $name: name,
      $value: value
    };
  }

  valChange = ({ target }) => {
    /* 值改变方法，组件受控方法 */
    const {
      handChange
    } = this.props;
    this.setState({
      $value: target.value
    });
    // 输入框额外的change事件
    handChange && (handChange({
      name: target.name,
      value: target.value
    }));
  };

  render() {
    const {
      $name,
      $value
    } = this.state;
    const {
      valChange
    } = this;
    const {
      type,
      className,
      placeholder,
    } = this.props;
    return (
      <div className={classNames(['jInput-wrap', className])}>
        <div className="jInput-left">
          {this.props.renderLeft}
        </div>
        <input
          className="jInput"
          type={type}
          name={$name}
          value={$value}
          onChange={valChange}
          placeholder={placeholder}
        />
        <div className="jInput-right">
          <i
            className="iconfont icon-guanbi jInput-clear"
          />
          {this.props.renderRight}
        </div>
      </div>
    );
  }
}

JInput.propTypes = {
  // 输入框name
  name: PropTypes.string,
  // 输入框的值
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  // change事件
  handChange: PropTypes.func,
  // 输入框类型
  type: PropTypes.string,
  placeholder: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  jkey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

JInput.defaultProps = {
  type: 'text',
  placeholder: '',
};

export default JInput;
