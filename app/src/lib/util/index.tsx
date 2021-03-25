import {
  toast
} from 'react-toastify';

function errorToast(content: string, option = {}): void {
  /**
   * 默认的显示错误对话框
   * */
  toast.error(content, {
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

function warningToast(content: string, option = {}): void {
  /**
   * 默认的显示错误对话框
   * */
  toast.warning(content, {
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
