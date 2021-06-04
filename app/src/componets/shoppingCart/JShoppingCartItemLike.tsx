import React from 'react';
import classNames from 'classnames';

interface IJShoppingCartItemLike {
  // 跟随状态
  followState: any
  // 状态改变函数
  change: { (args: boolean): void }
}

const JShoppingCartItemLike: React.FC<IJShoppingCartItemLike> = function ({
  followState = false,
  change
}) {
  const toggleFollow = () => {
    /**
     *  切换关注状态
     *  */
    change(!followState);
  };

  return (
    <div
      className={classNames([
        'jShoppingCartItem-cnt-like iconfont',
        followState ? 'iconicon3' : 'iconshoucang1'
      ])}
      onClick={toggleFollow}
    >
      {
        followState === 1 ? 22 : (
          followState && (<div>22</div>)
        )
      }
    </div>
  );
};

export default JShoppingCartItemLike;
