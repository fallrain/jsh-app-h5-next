import {
  toast
} from 'react-toastify';
import {
  getPriceKeyFromAllPrice
} from 'src/lib/dataDictionary';

const util = {
  // 日期格式化
  formatDate(date?: Date | string, pattern?: string) {
    if (!date) {
      return '';
    }
    if (!(date instanceof Date)) {
      // ios端日期bug
      if (typeof date === 'string') {
        date = date.replace(/-/g, '/');
      }
      date = new Date(date);
    }
    const numToStr = function (num: number) {
      let numStr;
      if (num < 10) {
        numStr = `0${num}`;
      } else {
        numStr = `${num}`;
      }
      return numStr;
    };
    const obj = {
      year: date.getFullYear(),
      month: numToStr(date.getMonth() + 1),
      date: numToStr(date.getDate()),
      hours: numToStr(date.getHours()),
      minutes: numToStr(date.getMinutes()),
      seconds: numToStr(date.getSeconds())
    };
    let res = pattern || 'yyyy-MM-dd';
    res = res.replace(/yyyy/g, String(obj.year));
    res = res.replace(/MM/g, obj.month);
    res = res.replace(/dd/g, obj.date);
    res = res.replace(/HH/g, obj.hours);
    res = res.replace(/mm/g, obj.minutes);
    res = res.replace(/ss/g, obj.seconds);
    return res;
  },
  formatNumber(number: number, digit = 2) {
    /* 把一个数字四舍五入为一个指定精度的数字 */
    if (number === null || number === undefined) {
      return '';
    }
    const m = Math.pow(10, digit);
    const resetNum = `${Math.round(number * m) / m}`;
    const newNum = `${resetNum}.${new Array(digit).fill(0).join('')}`;
    return newNum.replace(/([\s\S]*)(\.)([\s\S]*)(\.)([\s\S]*)/g, (match, $1, $2, $3) => {
      let $3Temp = $3;
      if ($3Temp.length < digit) {
        $3Temp += new Array(digit - $3Temp.length).fill(0).join('');
      }
      return $1 + $2 + $3Temp;
    });
  },
  formatFloat(f: number, digit: number) {
    const m = Math.pow(10, digit);
    return Math.round(f * m) / m;
  },
  arithmetic(oldVal1: number, oldVal2: number, arithmetic: 1 | 2 | 3 | 4 = 1, floatNum = 2): number {
    /* 避免损失精度 */
    let val1 = oldVal1;
    let val2 = oldVal2;
    if (!val1) {
      val1 = 0;
    }
    if (!val2) {
      val2 = 0;
    }
    const val1Split = `${val1}`.split('.');
    const val2Split = `${val2}`.split('.');
    const val1Len = val1Split[1] ? val1Split[1].length : 0;
    const val2Len = val2Split[1] ? val2Split[1].length : 0;
    const multiple = Math.pow(10, val1Len > val2Len ? val1Len : val2Len);
    val1 *= multiple;
    val2 *= multiple;
    let returnValue;
    switch (arithmetic) {
      case 1:
        returnValue = (val1 + val2) / multiple;
        break;
      case 2:
        returnValue = (val1 - val2) / multiple;
        break;
      case 3:
        returnValue = (val1 * val2) / multiple / multiple;
        break;
      case 4:
        returnValue = val1 / val2;
        break;
    }
    return this.formatFloat(returnValue, floatNum);
  },
  multiArithmetic(numbers: number[], ...args: any[]) {
    /* n个数值的计算 */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return numbers.reduce((pre, cur) => this.arithmetic(pre, cur, ...args), 0);
  },
  genQueryStringByObj(obj: Record<string, any>, isFirst = true) {
    /* 根据一个对象组合查询字符串 */
    const args = [];
    for (const p in obj) {
      obj[p] !== undefined && (args.push(`${p}=${obj[p]}`));
    }
    let returnStr = '';
    if (args.length) {
      returnStr = (isFirst ? '?' : '') + args.join('&');
    }
    return returnStr;
  },
  findDifKey(obj1: Record<string, any>, obj2: Record<string, any>) {
    /* 查找不同的属性 */
    const map: {
      [key: string]: any
    } = {
      obj1,
      obj2
    };
    const keys: Record<string, any>[] = [];
    let keyName: string;
    let anotherKeyName: string;
    if (Object.keys(obj1).length > Object.keys(obj2).length) {
      keyName = 'obj1';
      anotherKeyName = 'obj2';
    } else {
      keyName = 'obj2';
      anotherKeyName = 'obj1';
    }
    Object.keys(map[keyName]).forEach((key) => {
      if (map[keyName][key] !== map[anotherKeyName][key]) {
        keys.push({
          key,
          value1: map[keyName][key],
          value2: map[anotherKeyName][key]
        });
      }
    });
    return keys;
  },
  getPriceType(type: string) {
    /* 获取价格类型 */
    const typeTemp = type.toUpperCase();
    return getPriceKeyFromAllPrice()[typeTemp];
  },
  getUrlVal(name: string, url: string) {
    /* 获取url参数 */
    const urlArgs = url || window.location.search;
    if (urlArgs) {
      const reg = new RegExp(`${name}=([^&]+)`);
      const results = urlArgs.match(reg);
      if (results) {
        return results[1];
      }
    }
  },
  getComponentParent(name = undefined) {
    /* 获取组件父组件 */
    // let parent = this.$parent;
    // // 通过while历遍，这里主要是为了H5需要多层解析的问题
    // while (parent) {
    //   // 父组件
    //   if (parent.$options && parent.$options.name !== name) {
    //     // 如果组件的name不相等，继续上一级寻找
    //     parent = parent.$parent;
    //   } else {
    //     return parent;
    //   }
    // }
    // return false;
  },
  parseMoney(val: string) {
    /* 转化金额 */
    let money: any;
    if (!/^\d+(\.\d{1,2})?$/.test(val)) {
      money = parseFloat(val) || '';
      if (money) {
        money = Math.floor(money * 100) / 100;
      }
    }
    return Promise.resolve(money);
  }
};

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

export default util;
