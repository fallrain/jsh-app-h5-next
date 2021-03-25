import {
  axGet,
  axPostJson
} from '../../lib/ajax';
import urls from './cocUrl';
import {
  ISendCode,
  ICheckVerifyCode,
  ICustomerPotential
} from './cocModule';

export default {
  sendVerifyCode(data:ISendCode) {
    /**
     *  发送验证码
     *  */
    return axGet(urls.sendVerifyCode, data);
  },
  checkVerifyCode(data:ICheckVerifyCode) {
    /**
     *  检查验证码
     *  */
    return axGet(urls.checkVerifyCode, data);
  },
  getProvinceList() {
    /**
     *  获取省数据
     *  */
    return axGet(urls.provinceList);
  },
  getCityList(id:string) {
    /**
     *  获取市数据
     *  */
    return axGet(urls.cityList, {
      // 省id
      laprovinceid: id
    });
  },
  getCountyList(id:string) {
    /**
     *  获取区数据
     *  */
    return axGet(urls.countyList, {
      // 市id
      lacityid: id
    });
  },
  getStreetList(id:string) {
    /**
     *  获取街道数据
     *  */
    return axGet(urls.streetList, {
      // 区id
      lacountyid: id
    });
  },
  saveCustomerPotential(data:ICustomerPotential) {
    /**
     *  注册
     *  */
    return axPostJson(
      urls.saveCustomerPotential,
      data,
      undefined,
      {
        method: 'PUT'
      }
    );
  },
};
