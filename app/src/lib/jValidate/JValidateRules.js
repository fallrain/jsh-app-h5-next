const rules = {
  required(val) {
    return val != null && /\S+/.test(val);
  },
  objRequired(val, deepName) {
    // deepName: 'parent.child.value'
    deepName.split('.').forEach((key) => {
      val = val[key];
    });
    return val != null && /\S+/.test(val);
  },
  arrayRequired(val, deepName) {
    // deepName: 'parent.child.value'
    deepName.split('.').forEach((key) => {
      val = val[key];
    });
    return val && val.length;
  },
  number(val) {
    return /^\d+$/.test(val);
  },
  float(val) {
    return /^[+]?\d+(\.\d+)?$/.test(val);
  },
  mobile(val) {
    return /^(1[3456789]\d{9})?$/.test(val);
  },
  length(val, num) {
    /* 长度 */
    return val.replace(/\s/g, '').length === num;
  },
  maxLength(val, num) {
    /* 最大长度 */
    return val.replace(/\s/g, '').length <= num;
  },
  minLength(val, num) {
    /* 最大小长度 */
    return val.replace(/\s/g, '').length >= num;
  },
  max(val, num) {
    return val * 1 <= num * 1;
  },
  min(val, num) {
    return val * 1 >= num * 1;
  },
  encn(val) {
    /* 英语字母 汉字 */
    return /^[\u4E00-\u9FA5a-zA-Z]+$/.test(val);
  },
  cn(val) {
    /* 汉字 */
    return /^[\u4E00-\u9FA5]+$/.test(val);
  },
  en(val) {
    /* 字母 */
    return /^[a-zA-Z]+$/.test(val);
  },
  enOrNumber(val) {
    /* 数字字母 */
    return /^[a-zA-Z0-9]+$/.test(val);
  },
  IDCard(val) {
    /* 身份证号 */
    if (!val && val !== 0) {
      return true;
    }
    const aCity = {
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

    function cidInfo(sId) {
      let iSum = 0;
      if (!/^\d{17}(\d|x)$/i.test(sId)) {
        return false;
      }
      sId = sId.replace(/x$/i, 'a');
      if (aCity[sId.substr(0, 2) * 1] == null) {
        return false;// "Error:非法地区";
      }
      const sBirthday = `${sId.substr(6, 4)}-${Number(sId.substr(10, 2))}-${Number(sId.substr(12, 2))}`;
      const d = new Date(sBirthday.replace(/-/g, '/'));
      if (sBirthday !== (`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`)) {
        return false;// "Error:非法生日";
      }
      for (let i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
      }
      if (iSum % 11 !== 1) {
        return false;// "Error:非法证号";
      }
      return `${aCity[(sId.substr(0, 2)) * 1]},${sBirthday},${sId.substr(16, 1) % 2 ? '男' : '女'}`;
    }

    return cidInfo(val);
  },
  multiple(val, num) {
    /* 倍数 */
    return val % num === 0;
  },
  email(val) {
    return /^([A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)?$/.test(val);
  }
};
const messages = {
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
