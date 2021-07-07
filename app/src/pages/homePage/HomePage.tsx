import React, {
  FC,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
// import { USER } from '../../store/actionTypes';
import { Link } from 'react-router-dom';
import {
  getSaleInf,
  getTokenUserInf
} from '../../store/user/user.reduser';
import routerMap from '../../router/routerData';
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   [USER.UPDATE_SALE_ASYNC]: () => dispatch(getSaleInf)
// });
// useUnFollowGoods
const HomePage: FC = function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSaleInf);
    dispatch(getTokenUserInf);
  }, []);
  return (
    <div>
      {
        routerMap.map((router) => (
          <div key={router.name}>
            <Link to={router.path}>{router.name}</Link>
          </div>
        ))
      }
    </div>
  );
};

HomePage.defaultProps = {};

export default HomePage;
