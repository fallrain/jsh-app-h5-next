import classNames from 'classnames';
import React, {
  useState
} from 'react';
import PropTypes from 'prop-types';
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
    if (!phone || !phone.startsWith('1') || phone.length !== 11) {
      alert('请输入正确手机号');
      return;
    }
    // this.basicService.sendSms({ mobile: phone }).then((res) => {
    //   if (res.code === 1) {
    //     alert('验证码发送成功');
    //     if (callBack) {
    //       callBack();
    //     }
    //   } else if (errorCallBack) {
    //     errorCallBack();
    //   }
    // });

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
