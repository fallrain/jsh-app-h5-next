import {
  lazy,
} from 'react';

interface IRouterMap {
  name?: string,
  path: string,
  component: any
}

const routers: IRouterMap[] = [
  // 主页
  {
    name: 'HomePage',
    path: '/',
    component: () => import(/* webpackChunkName: "HomePage" */ 'src/pages/homePage/HomePage')
  },
  // 注册页面
  {
    name: 'Register',
    path: '/register',
    component: () => import(/* webpackChunkName: "Register" */ 'src/pages/register/Register')
  },
  // 购物车页面
  {
    name: 'ShoppingCart',
    path: '/shoppingCart',
    component: () => import(/* webpackChunkName: "ShoppingCart" */ 'src/pages/shoppingCart/ShoppingCart')
  }
];

routers.forEach((routerItem) => {
  routerItem.component = lazy(routerItem.component);
});

export default routers;
