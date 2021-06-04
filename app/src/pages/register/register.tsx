import React, {
  useState,
  useEffect,
  useCallback,
  FC
} from 'react';

import './register.scss';
import cocService from 'src/service/coc/coc.service';
import JValidate from 'src/lib/jValidate/JValidate';
import RegisterStep from 'src/componets/register/RegisterStep';
import registerHead from 'src/assets/img/register/registerHead.png';
import JSendCodeBtn from 'src/componets/common/JSendCodeBtn/JSendCodeBtn';
import JInput from 'src/componets/form/JInput/JInput';
import JButton from 'src/componets/common/button/JButton';
import RegisterUpload from 'src/componets/register/RegisterUpload';
import {
  errorToast
} from 'src/lib/util';
import RegisterSuccess from 'src/componets/register/RegisterSuccess';

const Register:FC = () => {
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
  const [vdt, setVdt] = useState<JValidate>();
  // 密码验证对象
  const [passwordVdt, setPasswordVdt] = useState<JValidate>();
  // 步骤
  const [step, setStep] = useState<number>(1);

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

  useEffect(() => {
    genVdt();
  }, [genVdt]);

  const validPassword = useCallback((val:any, isRepeat:boolean):boolean => {
    /**
     * 验证密码
     * */
    if (!/^(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)\S{8,20}$/.test(val)) {
      errorToast('密码为8-20个字符，由大写字母、小写字母、数字和符合的两种以上组合');
      return false;
    }
    // 如果是验证重复输入字段
    if (isRepeat && formData.password !== formData.passwordRepeat) {
      errorToast('两次输入的密码必须一致');
      return false;
    }
    return true;
  }, [formData.password, formData.passwordRepeat]);

  const genPasswordVdt = useCallback(() => {
    /**
     * 创建密码验证对象
     * */
    const curVdt = new JValidate({
      formData,
      rules: {
        // 密码
        password: {
          required: true,
          custom: validPassword
        },
        // 验证码
        passwordRepeat: {
          required: true,
          custom: (val:any) => validPassword(val, true)
        },
      },
      messages: {
        // 姓名
        password: {
          required: '请输入密码',
        },
        // 验证码
        passwordRepeat: {
          required: '请再次输入密码',
        },
      }
    });
    setPasswordVdt(curVdt);
  }, [
    formData.password,
    formData.passwordRepeat
  ]);

  useEffect(() => {
    /**
     * 组合验证码密码
     * */
    genPasswordVdt();
  }, [genPasswordVdt]);

  const valChange = useCallback(({
    name,
    value
  }) => {
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
    return cocService.sendVerifyCode({
      telphone: formData.telphone
    });
  }, [formData.telphone]);

  const sendCodeNext = useCallback(
    async () => {
      /**
       *  发送验证码页面的下一步
       *  */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (vdt.valid({
        includeKeys: {
          telphone: true,
          // 验证码
          verifyCode: true,
        }
      })) {
        // 检查验证码
        const { code } = await cocService.checkVerifyCode({
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

  const passwordNext = useCallback(() => {
    /**
       *  发送验证码页面的下一步
       *  */
    if (passwordVdt && passwordVdt.valid()) {
      setStep(3);
    }
  },
  [
    passwordVdt
  ]);

  const handlePre = useCallback(() => {
    /**
     * 上一步操作
     * */
    setStep(step - 1);
  }, [step]);

  const toNext = useCallback(() => {
    /**
     * 下一步操作
     * */
    if (step === 1) {
      sendCodeNext();
    } else if (step === 2) {
      passwordNext();
    }
  }, [
    step,
    sendCodeNext,
    passwordNext
  ]);

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
              <RegisterUpload
                step={step}
                setStep={setStep}
                password={formData.password}
                phone={formData.telphone}
              />
            </>
          )
        }
        {
          step === 4 && (
            <RegisterSuccess />
          )
        }
        {
          step < 3 && (
            <div
              className="register-field-item register-btn-wrap"
            >
              {
                step > 1 && (
                  <JButton
                    className="mr28"
                    type="primary"
                    onClick={handlePre}
                    text="上一步"
                  />
                )
              }
              <JButton
                onClick={toNext}
                text="下一步"
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Register;
