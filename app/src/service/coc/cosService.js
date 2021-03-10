import {
  axGet,
  axPostJson
} from '../../lib/ajax';
import urls from './cocUrl';

export default {
  sendVerifyCode(data) {
    /**
     *  发送验证码
     *  */
    const {
      // 手机号
      telphone,
    } = data;
    return axGet(urls.sendVerifyCode, {
      telphone
    });
  },
  checkVerifyCode(data) {
    /**
     *  检查验证码
     *  */
    const {
      // 手机号
      telphone,
      // 验证码
      verifyCode
    } = data;
    return axGet(urls.checkVerifyCode, {
      telphone,
      verifyCode
    });
  },
  getProvinceList() {
    /**
     *  获取省数据
     *  */
    return axGet(urls.provinceList);
  },
  getCityList(id) {
    /**
     *  获取市数据
     *  */
    return axGet(urls.cityList, {
      // 省id
      laprovinceid: id
    });
  },
  getCountyList(id) {
    /**
     *  获取区数据
     *  */
    return axGet(urls.countyList, {
      // 市id
      lacityid: id
    });
  },
  getStreetList(id) {
    /**
     *  获取街道数据
     *  */
    return axGet(urls.streetList, {
      // 区id
      lacountyid: id
    });
  },
  saveCustomerPotential(data) {
    /**
     *  注册
     *  */
    const {
      // 区code
      addressArea,
      // 区名称
      addressAreaName,
      // 城市
      addressCity,
      // 城市名称
      addressCityName,
      // 省编码
      addressProvince,
      // 省名称
      addressProvinceName,
      // 街道乡镇编码
      addressTown,
      // 街道乡镇名称
      addressTownName,
      //
      businessLicenseUrl,
      // 经营范围
      businessScope,
      // 营业执照地址
      companyAddress,
      // 公司名称
      companyName,
      // 公司类型
      companyType,
      // 法定代表人
      legalPerson,
      // 经营结束日期
      operateEndDate,
      // 是否长期经营
      operatePeriodForeverFlag,
      // 经营开始日期
      operateStartDate,
      // 密码
      password,
      // 注册电话号码
      phone,
      // 期望和问题
      question,
      // 注册资本
      registeredCapital,
      // 详细地址
      specificAddress,
      // 统一社会信用代码
      taxCode,
      // 组织机构代码
      taxCodeDesc,
      // 联系人姓名
      userName,
    } = data;
    return axPostJson(urls.saveCustomerPotential, {
      addressArea,
      addressAreaName,
      addressCity,
      addressCityName,
      addressProvince,
      addressProvinceName,
      addressTown,
      addressTownName,
      businessLicenseUrl,
      businessScope,
      companyAddress,
      companyName,
      companyType,
      legalPerson,
      operateEndDate,
      operatePeriodForeverFlag,
      operateStartDate,
      password,
      phone,
      question,
      registeredCapital,
      specificAddress,
      taxCode,
      taxCodeDesc,
      userName,
    },
    null,
    {
      method: 'PUT'
    });
  },
};
