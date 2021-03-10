import {
  toast
} from 'react-toastify';

function errorToast(content, option = {}) {
  /**
   * 默认的显示错误对话框
   * */
  return toast.error(content, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...option
  });
}

function warningToast(content, option = {}) {
  /**
   * 默认的显示错误对话框
   * */
  return toast.warning(content, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...option
  });
}

export {
  errorToast,
  warningToast
};
