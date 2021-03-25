import React from 'react';
import './css/registerSuccess.scss';

const RegisterSuccess: React.FC = function () {
  return (
    <div>
      <div className="registerSuccess-icon-wrap">
        <i
          className="iconfont icon-tijiao registerSuccess-icon"
        />
      </div>
      <div className="registerSuccess-text">恭喜注册成功</div>
    </div>
  );
};

RegisterSuccess.defaultProps = {};
export default RegisterSuccess;
