import React, {
  useState,
  useCallback,
  useEffect,
  FC
} from 'react';
import './css/registerUpload.scss';
import JFiledItem from 'src/componets/form/JFiledItem/JFiledItem';
import JInput from 'src/componets/form/JInput/JInput';
import cocService from 'src/service/coc/coc.service';
import JSelect from 'src/componets/form/JSelect/JSelect';
import JUpload from 'src/componets/common/JUpload/JUpload';
import {
  toast
} from 'react-toastify';
import 'date-fns';
import cnLocale from 'date-fns/locale/zh-CN';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker
} from '@material-ui/pickers';
import {
  Checkbox
} from '@material-ui/core';
import {
  warningToast
} from 'src/lib/util';
import JValidate from '../../lib/jValidate/JValidate';
import JButton from '../common/button/JButton';
// 营业执照验证对象
let vdt: JValidate;
// 联系人验证对象
let userVdt: JValidate;

interface IRegisterUpload {
  // 步骤
  step: number
  password: string
  phone: string
  setStep: { (...args: any[]): any }
}

const RegisterUpload: FC<IRegisterUpload> = function (props) {
  // 合作意向表单
  const [formData, setFormData] = useState({
    // 公司名称
    companyName: '',
    // 统一社会信用代码
    taxCode: '',
    // 组织机构代码
    taxCodeDesc: '',
    // 公司类型
    companyType: '',
    // 注册资本
    registeredCapital: '',
    // 注册日期
    createdDate: null,
    // 经营开始日期
    operateStartDate: null,
    // 经营结束日期
    operateEndDate: null,
    // 是否长期经营
    operatePeriodForeverFlag: false,
    // 法定代表人
    legalPerson: '',
    // 营业执照地址
    companyAddress: '',
    // 经营范围
    businessScope: '',
    // 上传的图片地址
    businessLicenseUrl: ''
  });
  // 结束时间是否禁用
  const [datePickerOperateEndDateDisabled, setDatePickerOperateEndDateDisabled] = useState(false);
  // 联系人表单
  const [userFormData, setUserFormData] = useState({
    // 联系人姓名
    userName: '',
    // 省编码
    addressProvince: '',
    // 省名称
    addressProvinceName: '',
    // 城市
    addressCity: '',
    // 城市名称
    addressCityName: '',
    // 区code
    addressArea: '',
    // 区名称
    addressAreaName: '',
    // 街道乡镇编码
    addressTown: '',
    // 街道乡镇名称
    addressTownName: '',
    // 详细地址
    specificAddress: '',
    // 期望和问题
    question: ''
  });
  // 省数据
  const [provinceOptions, setProvinceOptions] = useState<any[]>([]);
  // 市数据
  const [cityOptions, setCityOptions] = useState([]);
  // 区数据
  const [countryOptions, setCountryOptions] = useState([]);
  // 街道数据
  const [streetOptions, setStreetOptions] = useState([]);
  // 上传文件数据
  const [uploadOption, setUploadOption] = useState<{
    files: any[]
  }>({
    files: []
  });

  useEffect(() => {
    /**
     * 无依赖effect
     * */
    // 查询省的数据
    cocService.getProvinceList().then(({
      code,
      data
    }) => {
      if (code === '1' && data) {
        setProvinceOptions(data.map((v: any) => ({
          // 省id
          key: v.laprovinceid,
          // 省名称
          value: v.laprovince
        })));
      }
    });
  }, []);

  const genVdt = useCallback(() => {
    /**
     * 创建验证对象
     * */
    vdt = new JValidate({
      formData,
      rules: {
        companyName: {
          maxLength: 50
        },
        taxCode: {
          maxLength: 50
        },
        taxCodeDesc: {
          maxLength: 50
        },
        companyType: {
          maxLength: 50
        },
        registeredCapital: {
          maxLength: 20
        },
        legalPerson: {
          maxLength: 20
        },
        companyAddress: {
          maxLength: 1000
        },
        businessScope: {
          maxLength: 1000
        }
      },
      messages: {
        companyName: {
          maxLength: '公司名称长度不能超过50'
        },
        taxCode: {
          maxLength: '统一社会信用代码长度不能超过50'
        },
        taxCodeDesc: {
          maxLength: '组织机构代码长度不能超过50'
        },
        companyType: {
          maxLength: '公司类型长度不能超过50'
        },
        registeredCapital: {
          maxLength: '注册资本长度不能超过20'
        },
        legalPerson: {
          maxLength: '法定代表人长度不能超过20'
        },
        companyAddress: {
          maxLength: '营业执照地址长度不能超过1000'
        },
        businessScope: {
          maxLength: '经营范围长度不能超过1000'
        }
      }
    });
  }, [formData]);

  const genUserVdt = useCallback(() => {
    /**
     * 创建验证对象
     * */
    userVdt = new JValidate({
      formData: userFormData,
      rules: {
        // 联系人
        userName: {
          required: true,
          maxLength: 20
        },
        // 省
        addressProvince: {
          required: true
        },
        // 市
        addressCity: {
          required: true
        },
        // 区
        addressArea: {
          required: true
        },
        // 街道
        addressTown: {
          required: true
        },
        // 详细地址
        specificAddress: {
          required: true,
          maxLength: 100
        },
        // 问题和期望
        question: {
          maxLength: 60
        }
      },
      messages: {
        // 联系人
        userName: {
          required: '联系人姓名不能为空',
          maxLength: '最大长度为20'
        },
        // 省
        addressProvince: {
          required: '店铺地址的省不能为空'
        },
        // 市
        addressCity: {
          required: '店铺地址市不能为空'
        },
        // 区
        addressArea: {
          required: '店铺地址的区不能为空'
        },
        // 街道
        addressTown: {
          required: '店铺地址的街道不能为空'
        },
        // 详细地址
        specificAddress: {
          required: '店铺详细地址不能为空',
          maxLength: '最大长度为100'
        },
        // 问题和期望
        question: {
          maxLength: '最大长度为60'
        }
      }
    });
  }, [userFormData]);

  const formValChange = useCallback(({
    name,
    value,
    target
  }) => {
    /**
     *  值改变方法，组件受控方法
     * */
    let $name;
    let $value;
    if (name) {
      $name = name;
      $value = value;
    } else {
      $name = target.name;
      $value = target.value;
    }
    setFormData({
      ...formData,
      [$name]: $value
    });
  }, [formData]);

  const userFormValChange = useCallback(({
    name, value, target
  }) => {
    /**
     *  值改变方法，组件受控方法
     * */
    let $name;
    let $value;
    if (name) {
      $name = name;
      $value = value;
    } else {
      $name = target.name;
      $value = target.value;
    }
    setUserFormData({
      ...userFormData,
      [$name]: $value
    });
  }, [userFormData]);

  const foreverFlagChange = useCallback((e, value) => {
    /**
     *  是否长期change
     * */
    setFormData({
      ...formData,
      operatePeriodForeverFlag: value
    });
    // 设置是否禁用结束时间
    setDatePickerOperateEndDateDisabled(value);
  }, [formData]);

  const provinceChange = useCallback(async ({
    name, value, text
  }) => {
    /**
     * 省 select change
     * */
    // 设置省数据
    setUserFormData({
      ...userFormData,
      [name]: value,
      addressProvinceName: text,
      // 重置选中的城市
      addressCity: '',
      // 重置选中的城市名称
      addressCityName: '',
      // 重置选中的区code
      addressArea: '',
      // 重置选中的区名称
      addressAreaName: '',
      // 重置选中的街道乡镇编码
      addressTown: '',
      // 重置选中的街道乡镇名称
      addressTownName: ''
    });
    // 重置市option
    setCityOptions([]);
    // 重置区option
    setCountryOptions([]);
    // 重置街道option
    setStreetOptions([]);
    // 查询市数据
    const {
      code, data
    } = await cocService.getCityList(value);
    if (code === '1' && data) {
      setCityOptions(data.map((v: any) => ({
        // 市id
        key: v.lacityid,
        // 市名称
        value: v.lacity
      })));
    }
  }, [userFormData]);

  const cityChange = useCallback(async ({
    name, value, text
  }) => {
    /**
     * 市 select change
     * */
    // 设置市数据
    setUserFormData({
      ...userFormData,
      [name]: value,
      addressCityName: text,
      // 重置选中的区code
      addressArea: '',
      // 重置选中的区名称
      addressAreaName: '',
      // 重置选中的街道乡镇编码
      addressTown: '',
      // 重置选中的街道乡镇名称
      addressTownName: ''
    });
    // 重置区option
    setCountryOptions([]);
    // 重置街道option
    setStreetOptions([]);
    // 查询区数据
    const {
      code, data
    } = await cocService.getCountyList(value);
    if (code === '1' && data) {
      setCountryOptions(data.map((v: any) => ({
        // 区id
        key: v.lacountyid,
        // 市区名称
        value: v.lacounty
      })));
    }
  }, [userFormData]);

  const countryChange = useCallback(async ({
    name, value, text
  }) => {
    /**
     * 区 select change
     * */
    // 设置区数据
    setUserFormData({
      ...userFormData,
      [name]: value,
      addressAreaName: text,
      // 重置选中的街道乡镇编码
      addressTown: '',
      // 重置选中的街道乡镇名称
      addressTownName: ''
    });
    // 重置街道option
    setStreetOptions([]);
    // 查询街道数据
    const {
      code, data
    } = await cocService.getStreetList(value);
    if (code === '1' && data) {
      setStreetOptions(data.map((v: any) => ({
        // 街道id
        key: v.latownid,
        // 街道名称
        value: v.latown
      })));
    }
  }, [userFormData]);

  const streetChange = useCallback(async ({
    name, value, text
  }) => {
    /**
     * 街道 select change
     * */
    // 设置街道数据
    setUserFormData({
      ...userFormData,
      [name]: value,
      addressTownName: text
    });
  }, [userFormData]);

  const customValid = useCallback((error) => {
    /**
     * 自定义验证上传
     * */
    if (error) {
      const {
        main
      } = error;
      if (main === 'File is too large') {
        toast.error('只能上传10M以内图片', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }
    }
  }, []);

  const imgLoad = useCallback((str: any): number => {
    /**
     * 上传完成
     * */
    if (str) {
      const res = JSON.parse(str);
      const {
        code,
        data,
        msg
      } = res;
      if (code === '1') {
        // 开始时间
        if (isNaN(Date.parse(data.operateStartDate))) {
          data.operateStartDate = null;
        } else {
          // 成立日期
          data.createdDate = data.operateStartDate;
        }
        // 结束时间
        if (isNaN(Date.parse(data.operateEndDate))) {
          data.operateEndDate = null;
        }
        const {
          operatePeriodForeverFlag
        } = data;
        // 长期标志为boolean
        data.operatePeriodForeverFlag = operatePeriodForeverFlag === '1';
        // 设置是否禁用结束日期
        setDatePickerOperateEndDateDisabled(data.operatePeriodForeverFlag);
        setFormData({
          ...formData,
          ...data
        });
      } else {
        warningToast(msg);
      }
    }
    // 兼容
    return 1;
  }, [formData]);

  const toRegister = useCallback(() => {
    /**
     * 注册
     * */
    // 现场构建验证对象，避免每次form变化都构建
    genVdt();
    // 验证执照
    if (!vdt.valid()) {
      return Promise.resolve(false);
    }
    // 验证联系人
    genUserVdt();
    if (!userVdt.valid()) {
      return Promise.resolve(false);
    }

    return cocService.saveCustomerPotential({
      // 联系人姓名
      userName: userFormData.userName,
      // 区code
      addressArea: userFormData.addressArea,
      // 区名称
      addressAreaName: userFormData.addressAreaName,
      // 城市
      addressCity: userFormData.addressCity,
      // 城市名称
      addressCityName: userFormData.addressCityName,
      // 省编码
      addressProvince: userFormData.addressProvince,
      // 省名称
      addressProvinceName: userFormData.addressProvinceName,
      // 街道乡镇编码
      addressTown: userFormData.addressTown,
      // 街道乡镇名称
      addressTownName: userFormData.addressTownName,
      // 期望和问题
      question: userFormData.question,
      // 详细地址
      specificAddress: userFormData.specificAddress,
      // 上传后图片地址
      businessLicenseUrl: formData.businessLicenseUrl,
      // 经营范围
      businessScope: formData.businessScope,
      // 营业执照地址
      companyAddress: formData.companyAddress,
      // 公司名称
      companyName: formData.companyName,
      // 公司类型
      companyType: formData.companyType,
      // 法定代表人
      legalPerson: formData.legalPerson,
      // 经营结束日期
      operateEndDate: formData.operatePeriodForeverFlag ? '' : (formData.operateEndDate || undefined),
      // 是否长期经营
      operatePeriodForeverFlag: formData.operatePeriodForeverFlag ? '1' : '0',
      // 经营开始日期
      operateStartDate: formData.operateStartDate || undefined,
      // 注册资本
      registeredCapital: formData.registeredCapital,
      // 统一社会信用代码
      taxCode: formData.taxCode,
      // 组织机构代码
      taxCodeDesc: formData.taxCodeDesc,
      // 密码
      password: props.password,
      // 注册电话号码
      phone: props.phone
    }).then(({ code }) => {
      return code === '1';
    });
  }, [
    formData,
    userFormData,
    genVdt,
    genUserVdt,
    props.password,
    props.phone
  ]);

  const next = useCallback(() => {
    /**
     * 下一步
     * */
    toRegister().then((state) => {
      if (state) {
        // 进行下一步
        props.setStep(4);
      }
    });
  }, [toRegister]);
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      locale={cnLocale}
    >
      <div className="registerUpload">
        <JFiledItem
          title="上传营业执照"
          renderRight={(
            <JUpload
              files={uploadOption.files}
              allowMultiple
              maxFiles={1}
              server={{
                process: {
                  url: '/new/api/coc/api/cocCustomerPotentialCustomers/info',
                  withCredentials: false,
                  onload: imgLoad
                }
              }}
              name="file"
              onupdatefiles={(fileItems) => {
                setUploadOption({
                  files: fileItems.map((fileItem) => fileItem.file)
                });
              }}
              acceptedFileTypes={['image/png', 'image/jpeg']}
              maxFileSize="10MB"
              onaddfile={customValid}
            />
          )}
        />
        <JFiledItem
          title="公司名称"
          renderRight={(
            <JInput
              name="companyName"
              value={formData.companyName}
              handChange={formValChange}
              placeholder="请按照营业执照填写准确信息"
              border={false}
            />
          )}
        />
        <JFiledItem
          title="统一社会信用代码"
          renderRight={(
            <JInput
              name="taxCode"
              value={formData.taxCode}
              handChange={formValChange}
              placeholder="请按照营业执照填写准确信息"
              border={false}
            />
          )}
        />
        <JFiledItem
          title="组织机构代码"
          renderRight={(
            <JInput
              name="taxCodeDesc"
              value={formData.taxCodeDesc}
              handChange={formValChange}
              placeholder="请按照营业执照填写准确信息"
              border={false}
            />
          )}
        />
        <JFiledItem
          title="公司类型"
          renderRight={(
            <JInput
              name="companyType"
              value={formData.companyType}
              handChange={formValChange}
              placeholder="请按照营业执照填写准确信息"
              border={false}
            />
          )}
        />
        <JFiledItem
          title="注册资本(万元)"
          renderRight={(
            <JInput
              name="registeredCapital"
              value={formData.registeredCapital}
              handChange={formValChange}
              placeholder="请按照营业执照填写准确信息"
              border={false}
            />
          )}
        />
        <JFiledItem
          title="法定代表人"
          renderRight={(
            <JInput
              name="legalPerson"
              value={formData.legalPerson}
              handChange={formValChange}
              placeholder="请按照营业执照填写准确信息"
              border={false}
            />
          )}
        />
        <JFiledItem
          className="registerUpload-filedItem"
          title="成立日期"
          renderRight={(
            <DatePicker
              margin="normal"
              id="datePickerCreatedDate"
              format="yyyy-MM-dd"
              value={formData.createdDate}
              cancelLabel="取消"
              okLabel="确定"
              clearable
              clearLabel="清除"
              placeholder="请选择成立日期"
              onChange={(date) => formValChange({
                name: 'createdDate',
                value: date
              })}
            />
          )}
        />
        <JFiledItem
          className="registerUpload-filedItem"
          title="经营期限(开始)"
          renderRight={(
            <DatePicker
              margin="normal"
              id="datePickerOperateStartDate"
              format="yyyy-MM-dd"
              value={formData.operateStartDate}
              cancelLabel="取消"
              okLabel="确定"
              clearable
              clearLabel="清除"
              placeholder="请选择开始日期"
              onChange={(date) => formValChange({
                name: 'operateStartDate',
                value: date
              })}
            />
          )}
        />
        <JFiledItem
          className="registerUpload-filedItem"
          title="经营期限(结束)"
          renderRight={(
            <DatePicker
              margin="normal"
              id="datePickerOperateEndDate"
              format="yyyy-MM-dd"
              value={formData.operateEndDate}
              cancelLabel="取消"
              okLabel="确定"
              clearable
              clearLabel="清除"
              placeholder="请选择结束日期"
              disabled={datePickerOperateEndDateDisabled}
              onChange={(date) => formValChange({
                name: 'operateEndDate',
                value: date
              })}
            />
          )}
        />
        <JFiledItem
          className="registerUpload-filedItem"
          title="是否长期"
          renderRight={(
            <Checkbox
              checked={formData.operatePeriodForeverFlag}
              onChange={foreverFlagChange}
              color="primary"
            />
          )}
        />
        <JFiledItem
          title="营业执照地址"
          renderRight={(
            <JInput
              name="companyAddress"
              value={formData.companyAddress}
              handChange={formValChange}
              placeholder="请按照营业执照填写准确信息"
              border={false}
            />
          )}
        />
        <JFiledItem
          title="经营范围"
          renderBottom={(
            <textarea
              className="registerUpload-ta"
              name="businessScope"
              value={formData.businessScope}
              maxLength={1000}
              onChange={formValChange}
              placeholder="请按照营业执照填写准确信息"
            />
          )}
        />
        <JFiledItem
          title="联系人姓名"
          required
          renderRight={(
            <JInput
              name="userName"
              value={userFormData.userName}
              handChange={userFormValChange}
              placeholder="请输入姓名"
              border={false}
            />
          )}
        />
        <JFiledItem
          title="省"
          required
          renderRight={(
            <JSelect
              name="addressProvince"
              options={provinceOptions}
              value={userFormData.addressProvince}
              onChange={provinceChange}
            />
          )}
        />
        <JFiledItem
          title="市"
          required
          renderRight={(
            <JSelect
              name="addressCity"
              options={cityOptions}
              value={userFormData.addressCity}
              onChange={cityChange}
            />
          )}
        />
        <JFiledItem
          title="区"
          required
          renderRight={(
            <JSelect
              name="addressArea"
              options={countryOptions}
              value={userFormData.addressArea}
              onChange={countryChange}
            />
          )}
        />
        <JFiledItem
          title="街道"
          required
          renderRight={(
            <JSelect
              name="addressTown"
              options={streetOptions}
              value={userFormData.addressTown}
              onChange={streetChange}
            />
          )}
        />
        <JFiledItem
          title="详细地址"
          required
          renderRight={(
            <JInput
              name="specificAddress"
              value={userFormData.specificAddress}
              handChange={userFormValChange}
              placeholder="请输入店铺的街道/门牌号等详细地址"
              border={false}
            />
          )}
        />
        <JFiledItem
          title="期望和问题"
          renderBottom={(
            <textarea
              className="registerUpload-ta"
              name="question"
              maxLength={60}
              value={userFormData.question}
              onChange={userFormValChange}
              placeholder="请输入内容"
            />
          )}
        />
        <div
          className="register-field-item register-btn-wrap"
        >
          {
            props.step > 1 && (
              <JButton
                className="mr28"
                type="primary"
                onClick={() => props.setStep(2)}
                text="上一步"
              />
            )
          }
          <JButton
            onClick={next}
            text="注册"
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

RegisterUpload.defaultProps = {};
export default RegisterUpload;
