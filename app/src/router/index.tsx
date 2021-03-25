import {
  Route
} from 'react-router';
import React, {
  lazy,
  Suspense
} from 'react';
// 注册页面
const Register = lazy(() => import('../pages/register/register'));
export default function ():React.ReactElement {
  return (
    <Suspense
      fallback=""
    >
      <Route
        path="/register"
        component={Register}
      />
    </Suspense>
  );
}
