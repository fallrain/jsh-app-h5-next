import React, {
  useCallback,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import './jSelect.scss';

interface IJSelectOption {
  /**
   * 传入的select的option
   * */
  key: string | number,
  value: string | number,
}

interface IJSelectChangeArgs {
  // select的name
  name: string | number,
  // key
  value: string | number,
  // 文本值
  text: string | number,
  // 选中option
  option: IJSelectOption
}

interface IJSelect {
  // select name
  name: string,
  // select value
  value: string | number
  // 选项
  options: IJSelectOption[]
  placeholder?: string,
  onChange?: { ({
    name, value, text, option
  }: IJSelectChangeArgs): any }
}

function JSelect(props: IJSelect) {
  // select 引用
  const selectRef = useRef(null);
  /**
   * 下拉框组件
   * */
  const handleChange = useCallback((e) => {
    /**
     * change事件
     * */
    const target = e.target;
    // selectedIndex-1 是因为有【请选择】option
    const option = props.options[target.selectedIndex - 1];
    if (!option) {
      return;
    }
    props.onChange && props.onChange({
      // select的name
      name: props.name,
      // key
      value: target.value,
      // 文本值
      text: option.value,
      // 选中option
      option
    });
  }, [props.onChange, props.options, props.name]);

  return (
    <div className="jSelect-wrap">
      <select
        name={props.name}
        ref={selectRef}
        value={props.value}
        className="jSelect"
        onChange={handleChange}
      >
        <option
          key=""
          value=""
          disabled
        >{props.placeholder}
        </option>
        {
          props.options.map(({
            key, value
          }) => (
            <option
              key={key}
              value={key}
            >{value}
            </option>
          ))
        }
        <optgroup disabled />
      </select>
      <i
        className="iconfont icon-you jSelect-icon"
      />
    </div>
  );
}

JSelect.defaultProps = {
  placeholder: '请选择'
};
export default JSelect;
