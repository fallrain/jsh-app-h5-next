import propTypes from 'prop-types';
import classNames from 'classnames';
import './css/registerStep.scss';

function RegisterStep(props) {
  const iconClassMap = {
    1: {
      icon: 'icon-dianhua',
      text: '验证手机号',
    },
    2: {
      icon: 'icon-icon-tianxiegenjin',
      text: '验证手机号',
    },
    3: {
      icon: 'icon-hezuo',
      text: '验证手机号',
    },
    4: {
      icon: 'icon-chenggong',
      text: '验证手机号',
    },
  };
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
}

RegisterStep.propTypes = {
  // 步数
  step: propTypes.number.isRequired
};

export default RegisterStep;
