import React from 'react';
import classNames from 'classnames';
import './jLoading.scss';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TransverseLoading from 'react-loadingg/lib/TransverseLoading';

interface IJLoading {
  // 显示隐藏
  show?: boolean
}

function JLoading(props: IJLoading): React.ReactElement {
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

JLoading.defaultProps = {
  show: false
};
export default JLoading;
