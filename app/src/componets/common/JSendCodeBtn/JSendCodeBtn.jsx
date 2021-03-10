import classNames from 'classnames';
import React, {
  useState
} from 'react';
import PropTypes from 'prop-types';
import {
  toast
} from 'react-toastify';
import {
  rules
} from 'src/lib/jValidate/JValidateRules.js';
import './jSendCodeBtn.scss';

function JSendCodeBtn(props) {
  /**
   * 发送验证码按钮
   * */
  const [disabled, setDisabled] = useState(false);
  const [btnText, setBtnText] = useState(props.btnText);

  async function sendCode() {
    /* 发送验证码 */
    const {
      send,
      beforeSend,
      callBack,
      afterSend,
      errorCallBack,
      time,
    } = props;
    if (beforeSend && !beforeSend()) {
      return;
    }
    const phone = props.phone.trim();
    if (!phone) {
      toast.error('请输入手机号', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (!rules.mobile(phone)) {
      toast.error('请输入正确手机号', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    // 调用发送验证码函数，send需要返回promise
    if (send) {
      send().then(({ code }) => {
        if (code === '1') {
          toast('验证码发送成功');
          if (callBack) {
            callBack();
          }
        } else if (errorCallBack) {
          errorCallBack();
        }
      });
    }

    if (afterSend) {
      afterSend();
    }
    let trueTime = time;
    setDisabled(true);
    setBtnText(`${trueTime}秒后可重发`);
    const interval = setInterval(() => {
      setBtnText(`${--trueTime}秒后可重发`);
      if (trueTime < 1) {
        setBtnText('获取验证码');
        setDisabled(false);
        clearInterval(interval);
      }
    }, 1000);
  }

  return (
    <button
      className={classNames([
        'jSendCodeBtn-send-code',
        disabled && 'disabled',
        props.type ? `type${props.type}` : ''
      ])}
      type="button"
      onClick={sendCode}
      disabled={disabled}
    >{btnText}
    </button>
  );
}

JSendCodeBtn.propTypes = {
  // 按钮文字
  btnText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  time: PropTypes.number,
  // 按钮类型
  type: PropTypes.string,
  // 发送前
  beforeSend: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.any,
  ]),
  // 发送验证码函数
  send: PropTypes.func,
  // 接口调用后
  callBack: PropTypes.func,
  // 接口报错
  errorCallBack: PropTypes.func,
  // 发送后
  afterSend: PropTypes.func,
};

JSendCodeBtn.defaultProps = {
  btnText: '获取验证码',
  time: 60,
  type: ''
};
export default JSendCodeBtn;
