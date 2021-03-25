import React, { ChangeEvent } from 'react';
import './jInput.scss';
import classNames from 'classnames';

interface IJInput {
  // input name
  name: string
  // 输入框的值
  value: string | number
  // 输入框类型
  type: string
  className?: string
  placeholder?: string
  border?: boolean
  renderLeft?: React.ReactNode
  renderRight?: React.ReactNode
  handChange: {
    ({
      name,
      value
    }: {
      name: string,
      value: string | number
    }): any
  }
}

interface JInputState {
  $type: string
}

class JInput extends React.Component<IJInput, JInputState> {
  static defaultProps = {
    type: 'text',
    placeholder: '',
    border: true
  };

  constructor(props: IJInput) {
    super(props);
    const {
      type
    } = this.props;
    this.state = {
      $type: type
    };
  }

  valChange = (e:ChangeEvent<HTMLInputElement>) => {
    /**
     *  值改变方法，组件受控方法
     *  */
    const target = e.target;
    const {
      handChange
    } = this.props;
    handChange && (handChange({
      name: target.name,
      value: target.value
    }));
  };

  clearVal = () => {
    /**
     *  清空输入框的值
     *  */
    const {
      handChange
    } = this.props;
    // 输入框额外的change事件
    handChange && (handChange({
      name: this.props.name,
      value: ''
    }));
  };

  togglePassword = () => {
    /**
     * 切换输入框显示隐藏
     * 其实不应该改type，移动端弹出键盘会改变
     * */
    this.setState((pre) => ({
      $type: pre.$type === 'password' ? 'text' : 'password'
    }));
  };

  render() {
    const {
      $type
    } = this.state;
    const {
      valChange
    } = this;
    const {
      name,
      value,
      type,
      className,
      placeholder,
      border
    } = this.props;
    return (
      <div
        className={classNames([
          'jInput-wrap',
          className,
          !border && 'no-border'
        ])}
      >
        <div className="jInput-left">
          {this.props.renderLeft}
        </div>
        <input
          className="jInput"
          type={$type}
          name={name}
          value={value}
          onChange={valChange}
          placeholder={placeholder}
        />
        <div className="jInput-right">
          <i
            className={classNames([
              'iconfont icon-guanbi jInput-clear',
              value && 'show'
            ])}
            onClick={this.clearVal}
          />
          {type === 'password' && (
            <i
              className="iconfont icon-yanjing jInput-eye"
              onClick={this.togglePassword}
            />
          )}
          {this.props.renderRight}
        </div>
      </div>
    );
  }
}

export default JInput;
