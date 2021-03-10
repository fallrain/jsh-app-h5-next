import {
  toast
} from 'react-toastify';
import {
  rules,
  messages
} from './JValidateRules';

export default class {
  constructor(option) {
    this.option = option;
  }

  showError(msg) {
    /**
     *展示错误信息
     * */
    toast.error(msg, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  checkRuleType() {
    /**
     * 检查rule type，如果是函数的话，不使用
     * */
  }

  valid({
    includeKeys
  } = {}) {
    /**
     * 验证整个表单
     * @includeKeys 只验证包含的字段
     * */
    const vdtMap = this.option.rules;
    for (const p in vdtMap) {
      if (!includeKeys || (includeKeys && includeKeys[p])) {
        const regs = vdtMap[p];
        for (const i in regs) {
          if (regs[i] === false) {
            continue;
          }
          if (!rules[i](this.option.formData[p], regs[i])) {
            // 自定义验证不提示
            if (i !== 'custom') {
              this.showError((this.option.messages[p] && this.option.messages[p][i]) || messages[i]);
            }
            return false;
          }
        }
      }
    }
    return true;
  }

  validOne(name) {
    const regs = this.option.rules[name];
    for (const i in regs) {
      if (!rules[i](this.option.formData[name], regs[i])) {
        // 自定义验证不提示
        if (i !== 'custom') {
          this.showError((this.option.messages[name] && this.option.messages[name][i]) || messages[i]);
        }
        return false;
      }
    }
    return true;
  }
}
