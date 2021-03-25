import React, { FC } from 'react';
import classNames from 'classnames';
import './css/registerStep.scss';

interface IRegisterStep {
  // 步数
  step: number | string
}

const iconClassMap:Record<string, any> = {
  1: {
    icon: 'icon-dianhua',
    text: '验证手机号'
  },
  2: {
    icon: 'icon-icon-tianxiegenjin',
    text: '填写注册信息'
  },
  3: {
    icon: 'icon-hezuo',
    text: '合作意见填写'
  },
  4: {
    icon: 'icon-chenggong',
    text: '注册成功'
  }
};

const RegisterStep: FC<IRegisterStep> = function (props: IRegisterStep) {
  return (
    <div className="registerStep-wrap">
      <div className="registerStep">
        <i className={classNames([
          'iconfont registerStep-icon',
          iconClassMap[props.step].icon
        ])}
        />
        {iconClassMap[props.step].text}
      </div>
      <div className="registerStep-wrap-line" />
    </div>
  );
};

export default RegisterStep;
