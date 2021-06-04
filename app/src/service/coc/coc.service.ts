import {
  jGet,
  jPostJson
} from '../../lib/request';
import urls from './coc.url';
import {
  ISendCode,
  ICheckVerifyCode,
  ICustomerPotential
} from './coc.module';

export default {
  sendVerifyCode(data:ISendCode) {
    /**
     *  发送验证码
     *  */
    return jGet(urls.sendVerifyCode, data);
  },
  checkVerifyCode(data:ICheckVerifyCode) {
    /**
     *  检查验证码
     *  */
    return jGet(urls.checkVerifyCode, data);
  },
  getProvinceList() {
    /**
     *  获取省数据
     *  */
    return jGet(urls.provinceList);
  },
  getCityList(id:string) {
    /**
     *  获取市数据
     *  */
    return jGet(urls.cityList, {
      // 省id
      laprovinceid: id
    });
  },
  getCountyList(id:string) {
    /**
     *  获取区数据
     *  */
    return jGet(urls.countyList, {
      // 市id
      lacityid: id
    });
  },
  getStreetList(id:string) {
    /**
     *  获取街道数据
     *  */
    return jGet(urls.streetList, {
      // 区id
      lacountyid: id
    });
  },
  saveCustomerPotential(data:ICustomerPotential) {
    /**
     *  注册
     *  */
    return jPostJson(
      urls.saveCustomerPotential,
      data,
      undefined,
      {
        method: 'PUT'
      }
    );
  },
};
