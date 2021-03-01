import {
  axGet
} from '../../lib/ajax';
import urls from './cocUrl';

export default {
  getValueSync(data) {
    /* 区域代码？ */
    const {
      parentValueLow,
      // type:Array
      value,
      valueSetId
    } = data;
    return axGet(urls.getValueSync, {
      parentValueLow,
      value,
      valueSetId
    });
  },
};
