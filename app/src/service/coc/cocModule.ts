interface ISendCode {
  /**
   * 发送验证码
   * */
  // 手机号
  telphone: string
}

interface ICheckVerifyCode {
  /**
   * 检查验证码
   * */
  // 手机号
  telphone: string
  // 验证码
  verifyCode: string
}

interface ICustomerPotential {
  /**
   * 注册对象
   * */
  // 区code
  addressArea: string,
  // 区名称
  addressAreaName: string,
  // 城市
  addressCity: string,
  // 城市名称
  addressCityName: string,
  // 省编码
  addressProvince: string,
  // 省名称
  addressProvinceName: string,
  // 街道乡镇编码
  addressTown: string,
  // 街道乡镇名称
  addressTownName: string,
  //
  businessLicenseUrl?: string,
  // 经营范围
  businessScope: string,
  // 营业执照地址
  companyAddress: string,
  // 公司名称
  companyName: string,
  // 公司类型
  companyType: string,
  // 法定代表人
  legalPerson: string,
  // 经营结束日期
  operateEndDate?: string,
  // 是否长期经营
  operatePeriodForeverFlag: string,
  // 经营开始日期
  operateStartDate?: string,
  // 密码
  password: string,
  // 注册电话号码
  phone: string,
  // 期望和问题
  question: string,
  // 注册资本
  registeredCapital: string,
  // 详细地址
  specificAddress: string,
  // 统一社会信用代码
  taxCode: string,
  // 组织机构代码
  taxCodeDesc: string,
  // 联系人姓名
  userName: string,
}

export type{
  ISendCode,
  ICheckVerifyCode,
  ICustomerPotential
};
