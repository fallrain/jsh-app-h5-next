import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import './register.scss';
import cosService from 'src/service/coc/cosService';
import JValidate from 'src/lib/jValidate/JValidate.js';
import RegisterStep from 'src/componets/register/RegisterStep';
import registerHead from 'src/assets/img/register/registerHead.png';
import JSendCodeBtn from 'src/componets/common/JSendCodeBtn/JSendCodeBtn';
import JInput from 'src/componets/form/JInput/JInput';
import JButton from 'src/componets/common/button/JButton';
import RegisterUpload from 'src/componets/register/RegisterUpload.jsx';

function Register() {
  const [formData, setFormData] = useState({
    // 手机号码
    telphone: '',
    // 验证码
    verifyCode: '',
    // 密码
    password: '',
    // 密码重复
    passwordRepeat: '',
  });
  // 验证对象
  const [vdt, setVdt] = useState(null);
  // 步骤
  const [step, setStep] = useState(3);

  useEffect(() => {
    genVdt();
  }, [formData]);

  const genVdt = useCallback(() => {
    /**
     * 创建验证对象
     * */
    const curVdt = new JValidate({
      formData,
      rules: {
        // 电话
        telphone: {
          required: true,
          mobile: true
        },
        // 验证码
        verifyCode: {
          required: true,
        },
        password: {
          required: true,
        }
      },
      messages: {
        // 姓名
        telphone: {
          required: '请输入手机号',
          mobile: '请输入正确的手机号'
        },
        // 验证码
        verifyCode: {
          required: '请输入验证码',
        },
        // 密码为8-20个字符，由大写字母、小写字母、数字和符合的两种以上组合
      }
    });
    setVdt(curVdt);
  }, [formData]);

  const valChange = useCallback(({ name, value }) => {
    /**
     *  值改变方法，组件受控方法
     * */
    setFormData({
      ...formData,
      [name]: value
    });
  }, [formData]);

  const sendCode = useCallback(() => {
    /**
     * 发送验证码
     * */
    return cosService.sendVerifyCode({
      telphone: formData.telphone
    });
  }, [formData.telphone]);

  const sendCodeNext = useCallback(
    async () => {
      /**
       *  发送验证码页面的下一步
       *  */
      if (vdt.valid({
        includeKeys: {
          telphone: true,
          // 验证码
          verifyCode: true,
        }
      })) {
        // 检查验证码
        const { code } = await cosService.checkVerifyCode({
          telphone: formData.telphone,
          verifyCode: formData.verifyCode,
        });
        if (code === '1') {
          // 设置跳转下一步
          setStep(2);
        }
      }
    },
    [
      formData.telphone,
      formData.verifyCode,
      vdt
    ]
  );

  return (
    <div className="register-wrap">
      <div className="register-head">
        <img
          className="register-head-img"
          src={registerHead}
        />
      </div>
      <div className="register-body">
        <div className="mb60">
          <RegisterStep
            step={step}
          />
        </div>
        {
          step === 1 && (
            <>
              <div className="register-field-item">
                <JInput
                  name="telphone"
                  value={formData.telphone}
                  handChange={valChange}
                  placeholder="请输入手机号"
                />
              </div>
              <div className="register-field-item">
                <JInput
                  name="verifyCode"
                  value={formData.verifyCode}
                  placeholder="请输入手机验证码"
                  handChange={valChange}
                  renderRight={(
                    <JSendCodeBtn
                      phone={formData.telphone}
                      send={sendCode}
                      type="2"
                    />
                  )}
                />
              </div>
            </>
          )
        }
        {
          step === 2 && (
            <>
              <div className="register-field-item">
                <JInput
                  name="password"
                  value={formData.password}
                  handChange={valChange}
                  placeholder="设置新密码"
                  type="password"
                />
              </div>
              <div className="register-field-item">
                <JInput
                  name="passwordRepeat"
                  value={formData.passwordRepeat}
                  handChange={valChange}
                  placeholder="确认新密码"
                  type="password"
                />
              </div>
            </>
          )
        }
        {
          step === 3 && (
            <>
              <RegisterUpload />
            </>
          )
        }
        {
          step === 4 && (
            <>
            </>
          )
        }
        <div className="register-field-item mt30">
          <JButton
            onClick={sendCodeNext}
            text="下一步"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
