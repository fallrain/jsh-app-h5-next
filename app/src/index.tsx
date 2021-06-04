import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
  Provider,
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
        <App />
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
