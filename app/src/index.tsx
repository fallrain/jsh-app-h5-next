import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  connect, Provider
} from 'react-redux';
import {
  createMuiTheme, ThemeProvider
} from '@material-ui/core/styles';
import { zhCN } from '@material-ui/core/locale';

import store from 'src/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
// css 区域
import './assets/font/iconfont.css';
import './assets/css/base.scss';
import './assets/css/common.scss';
import './index.scss';

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  },
  zhCN
);
const mapStateToProps = (state: any) => ({
  app: state.app,
});

const AppContainer = connect(mapStateToProps)(App);
ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter
    basename={process.env.PUBLIC_URL}
    keyLength={2}
  >
    <ThemeProvider
      theme={theme}
    >
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
