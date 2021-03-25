const rules: Record<string, (...[propName]: any) => boolean> = {
  custom(val: any, fun: (...[propName]: any) => any): boolean {
    /**
     * 自定义验证
     * */
    return fun(val);
  },
  required(val: any): boolean {
    return val != null && /\S+/.test(val);
  },
  objRequired(val: any, deepName: string): boolean {
    // deepName: 'parent.child.value'
    deepName.split('.').forEach((key) => {
      val = val[key];
    });
    return val != null && /\S+/.test(val);
  },
  arrayRequired(val: any, deepName: string): boolean {
    // deepName: 'parent.child.value'
    deepName.split('.').forEach((key) => {
      val = val[key];
    });
    return val && val.length;
  },
  number(val: any): boolean {
    return /^\d+$/.test(val);
  },
  float(val: any): boolean {
    return /^[+]?\d+(\.\d+)?$/.test(val);
  },
  mobile(val: any): boolean {
    return /^(1[3456789]\d{9})?$/.test(val);
  },
  length(val: any, num: number): boolean {
    /* 长度 */
    return val.replace(/\s/g, '').length === num;
  },
  maxLength(val: any, num: number): boolean {
    /* 最大长度 */
    return val.replace(/\s/g, '').length <= num;
  },
  minLength(val: any, num: number): boolean {
    /* 最大小长度 */
    return val.replace(/\s/g, '').length >= num;
  },
  max(val: any, num: number): boolean {
    return val * 1 <= num * 1;
  },
  min(val: any, num: number): boolean {
    return val * 1 >= num * 1;
  },
  encn(val: any): boolean {
    /* 英语字母 汉字 */
    return /^[\u4E00-\u9FA5a-zA-Z]+$/.test(val);
  },
  cn(val: any): boolean {
    /* 汉字 */
    return /^[\u4E00-\u9FA5]+$/.test(val);
  },
  en(val: any): boolean {
    /* 字母 */
    return /^[a-zA-Z]+$/.test(val);
  },
  enOrNumber(val: any): boolean {
    /* 数字字母 */
    return /^[a-zA-Z0-9]+$/.test(val);
  },
  IDCard(val: any): boolean {
    /* 身份证号 */
    if (!val && val !== 0) {
      return true;
    }
    const cityMap: {
      [propName: string]: string
    } = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    };

    function cidInfo(id: string): boolean {
      let iSum = 0;
      if (!/^\d{17}(\d|x)$/i.test(id)) {
        return false;
      }
      id = id.replace(/x$/i, 'a');
      if (!cityMap[id.substr(0, 2)]) {
        return false; // "Error:非法地区";
      }
      const sBirthday = `${id.substr(6, 4)}-${Number(id.substr(10, 2))}-${Number(id.substr(12, 2))}`;
      const d = new Date(sBirthday.replace(/-/g, '/'));
      if (sBirthday !== `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`) {
        return false; // "Error:非法生日";
      }
      for (let i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(id.charAt(17 - i), 11);
      }
      if (iSum % 11 !== 1) {
        return false; // "Error:非法证号";
      }
      return !!`${cityMap[id.substr(0, 2)]},${sBirthday},${+id.substr(16, 1) % 2 ? '男' : '女'}`;
    }

    return cidInfo(val);
  },
  multiple(val: any, num: number): boolean {
    /* 倍数 */
    return val % num === 0;
  },
  email(val: any): boolean {
    return /^([A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)?$/.test(val);
  }
};
const messages: Record<string, string> = {
  required: '不能为空',
  number: '必须为整数',
  float: '必须为数字',
  mobile: '请输入正确手机号',
  IDCard: '请输入正确的身份证',
  email: '请输入正确的邮箱',
  cn: '必须输入汉字',
  en: '必须输入英文'
};

export {
  rules,
  messages
};
