import classNames from 'classnames';
import React, {
  useState,
  useEffect,
} from 'react';
import {
  toast
} from 'react-toastify';
import {
  rules
} from 'src/lib/jValidate/JValidateRules';
import './jSendCodeBtn.scss';

interface IJSendCodeBtn {
  // 时间
  time?: number,
  // 按钮类型
  type?: string,
  // 发送验证码函数
  send?: () => Promise<{ code: string }>,
  // 按钮文字
  btnText?: string,
  phone: string,
  beforeSend?: { (...args: any[]): any }
  // 接口调用后
  callBack?: { (...args: any[]): any }
  // 发送后
  afterSend?: { (...args: any[]): any }
  // 接口报错
  errorCallBack?: { (...args: any[]): any }
}

function JSendCodeBtn(props: IJSendCodeBtn) {
  /**
   * 发送验证码按钮
   * */
  const [disabled, setDisabled] = useState<boolean>(false);
  const [btnText, setBtnText] = useState<string>(props.btnText || '发送验证码');
  const [sendCodeInterval, setSendCodeInterval] = useState<number>();
  useEffect(() => {
    return () => {
      clearInterval(sendCodeInterval);
    };
  }, [sendCodeInterval]);
  async function sendCode() {
    /* 发送验证码 */
    const {
      send,
      beforeSend,
      callBack,
      afterSend,
      errorCallBack,
      time
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
        progress: undefined
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
        progress: undefined
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
    let trueTime = time || 60;
    setDisabled(true);
    setBtnText(`${trueTime}秒后可重发`);
    const interval = window.setInterval(() => {
      setBtnText(`${--trueTime}秒后可重发`);
      if (trueTime < 1) {
        setBtnText('获取验证码');
        setDisabled(false);
        clearInterval(interval);
      }
    }, 1000);
    setSendCodeInterval(interval);
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

export default JSendCodeBtn;
