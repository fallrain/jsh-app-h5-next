import store from 'src/store/index';
import axios, {
  AxiosResponse
} from 'axios';
import qs from 'qs';
import {
  toast
} from 'react-toastify';

export interface IResult {
  code: string
  data?: Record<string, any> | Array<Record<string, any>> | Array<any>
  msg?: any
  response?: AxiosResponse
}

const ax = axios.create();

ax.defaults = Object.assign(
  ax.defaults,
  {
    baseURL: process.env.REACT_APP_BASE_URL,
    method: 'post',
    timeout: 60 * 1000
  }
);
const loadingAy = [];

function closeLoading() {
  const {
    dispatch
  } = store;
  // 关闭遮罩
  if (loadingAy.length === 1) {
    dispatch({
      type: 'hideLoading'
    });
  }
  loadingAy.length--;
}

function showLoading() {
  /* 打开遮罩 */
  const {
    dispatch
  } = store;
  dispatch({
    type: 'showLoading'
  });
  return new Date().getTime();
}

function showError(msg?: string | Record<string, any>): void {
  let errorMsg;
  // 无错误返回请求失败
  // 对象类型解析错误
  if (msg) {
    if (typeof msg === 'string') {
      errorMsg = msg;
    } else {
      // 以后存在不只是通过message来判断的情况
      if (msg.message) {
        const errorMessage = msg.message;
        if (/^timeout of/.test(errorMessage)) {
          errorMsg = '请求超时';
        }
      }
    }
  }
  toast.warning(errorMsg || '请求失败', {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
}

ax.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {};
  }
  if (config.headers && !config.params.noToken) {
    config.headers.Authorization = `Bearer  ${localStorage.getItem('token')}`;
  }
  if (!config.params.noLoading) {
    loadingAy.push(showLoading());
  }
  return config;
}, (error) => {
  if (!error.config.params.noLoading) {
    closeLoading();
  }
  showError(error);
  return {
    code: '-1'
  };
});

ax.interceptors.response.use((response) => {
  const customOptions = response.config.params;
  // 关闭遮罩
  if (!response.config.params.noLoading) {
    closeLoading();
  }
  const {
    code,
    msg
  } = response.data;
  if (!(response.config.params && response.config.params.requestNoToast)) {
    if (code !== '1') {
      showError(msg);
    }
  }
  if (customOptions && customOptions.returnResponse) {
    // 返回类型必须符合AxiosResponse
    return {
      ...response,
      data: response,
    };
  }
  return response;
}, (error) => {
  if (!error.config.params.noLoading) {
    closeLoading();
  }
  showError(error);
  return {
    data: {
      code: '-1'
    }
  };
});

const jGet = function (
  url: string,
  params?: Record<string, any> | null,
  options?: Record<string, any>
): Promise<IResult> {
  return ax({
    headers: { 'content-type': 'application/x-www-form-urlencoded,charset=UTF-8' },
    method: 'get',
    url,
    params,
    ...options
  }).then((res) => res.data);
};

const jPost = function (
  url: string,
  data?: Record<string, any>,
  params?: Record<string, any>,
  options?: Record<string, any>
): Promise<IResult> {
  return ax({
    method: 'post',
    url,
    data: qs.stringify(data),
    params,
    ...options
  }).then((res) => res.data);
};

const jPostJson = function (
  url: string,
  data?: Record<string, any>,
  params?: Record<string, any>,
  options?: Record<string, any>
): Promise<IResult> {
  return ax({
    method: 'post',
    url,
    data,
    params,
    ...options
  }).then((res) => res.data);
};
export default ax;

export {
  jGet,
  jPost,
  jPostJson
};
