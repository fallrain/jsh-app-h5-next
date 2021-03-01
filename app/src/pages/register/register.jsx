import React, {
  useState
} from 'react';

import './register.scss';
import registerHead from '../../assets/img/register/registerHead.png';
import JSendCodeBtn from '../../componets/common/JSendCodeBtn/JSendCodeBtn';
import JInput from '../../componets/form/JInput/JInput';
import JButton from '../../componets/common/button/JButton';

function Register() {
  const [btnText, setBtnText] = useState('下一步');

  function sendCodeNext() {
    /**
     *  发送验证码页面的下一步
     *  */
    setBtnText(`${Math.random()}`);
  }
  return (
    <div className="register-wrap">
      <div className="register-head">
        <img
          className="register-head-img"
          src={registerHead}
        />
      </div>
      <div className="register-body">
        <div className="register-field-item">
          <JInput
            placeholder="请输入手机号"
          />
        </div>
        <div className="register-field-item">
          <JInput
            placeholder="请输入手机验证码"
            renderRight={(
              <JSendCodeBtn
                phone="15060000000"
                type="2"
              />
            )}
          />
        </div>
        <div className="register-field-item">
          <JButton
            onClick={sendCodeNext}
            text={btnText}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
