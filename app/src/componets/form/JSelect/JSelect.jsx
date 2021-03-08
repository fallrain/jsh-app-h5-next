import React, {
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import './jSelect.scss';
import classNames from 'classnames';

function JSelect(props) {
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
        className="jSelect"
        value={props.value}
        onChange={handleChange}
      >
        {
          <option
            key=""
            value=""
            disabled
          >{props.placeholder}
          </option>
        }
        {
          props.options.map(({ key, value }) => (
            <option
              key={key}
              value={key}
            >{value}
            </option>
          ))
        }
      </select>
      <i
        className="iconfont icon-you jSelect-icon"
      />
    </div>
  );
}

JSelect.propTypes = {
  // 选项
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  })).isRequired,
  // select name
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

JSelect.defaultProps = {
  placeholder: '请选择'
};
export default JSelect;
