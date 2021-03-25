import { toast } from 'react-toastify';
import {
  rules,
  messages
} from './JValidateRules';

interface JValidateOption {
  formData: Record<string, any>;
  rules: {
    [propName:string]:any
  };
  messages: Record<string, Record<string, string>>;
}

interface JValidFunOption{
  includeKeys?: Record<string, boolean>;
  [propName:string]:any
}

export default class {
  option: JValidateOption;

  constructor(option: JValidateOption) {
    this.option = option;
  }

  showError(msg: string): void {
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

  checkRuleType(): void {
    /**
     * 检查rule type，如果是函数的话，不使用
     * */
  }

  valid({ includeKeys }:JValidFunOption = {}): boolean {
    /**
     * 验证整个表单
     * @includeKeys 只验证包含的字段
     * */
    const vdtMap = this.option.rules;
    for (const p in vdtMap) {
      if (!includeKeys || (includeKeys && includeKeys[p])) {
        const regs:any = vdtMap[p];
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

  validOne(name: string): boolean {
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

export type {
  JValidateOption,
  JValidFunOption
};
