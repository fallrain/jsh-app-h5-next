import React from 'react';
import './css/registerSuccess.scss';

function RegisterSuccess() {
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
}

RegisterSuccess.propTypes = {};

RegisterSuccess.defaultProps = {};
export default RegisterSuccess;
