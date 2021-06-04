import {
  Route,
} from 'react-router';
import React, {
  Suspense
} from 'react';
import routers from './routerData';

export default function (): React.ReactElement {
  return (
    <Suspense
      fallback=""
    >
      {
        routers.map((router) => (
          <Route
            key={router.name}
            path={router.path}
            component={router.component}
            exact
          />
        ))
      }
    </Suspense>
  );
}
