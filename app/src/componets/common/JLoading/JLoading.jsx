import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './jLoading.scss';
import TransverseLoading from 'react-loadingg/lib/TransverseLoading';

function JLoading(props) {
  return (
    <div
      className={classNames([
        'jLoading-wrap',
        !props.show && 'hide'
      ])}
    >
      <TransverseLoading />
    </div>
  );
}

JLoading.propTypes = {
  // 显示隐藏
  show: PropTypes.bool
};

JLoading.defaultProps = {
  show: false
};
export default JLoading;
