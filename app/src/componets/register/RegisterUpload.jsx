import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import './css/registerUpload.scss';
import classNames from 'classnames';
import JFiledItem from 'src/componets/form/JFiledItem/JFiledItem.jsx';
import JInput from 'src/componets/form/JInput/JInput.jsx';
import cosService from 'src/service/coc/cosService';
import JSelect from 'src/componets/form/JSelect/JSelect.jsx';
import JUpload from 'src/componets/common/JUpload/JUpload';
import {
  toast
} from 'react-toastify';
import 'date-fns';
import cnLocale from 'date-fns/locale/zh-CN';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import JValidate from '../../lib/jValidate/JValidate';

function RegisterUpload() {
  // 合作意向表单
  const [formData, setFormData] = useState({
    // 上传的图片地址
    businessLicenseUrl: '',
    // 经营范围
    businessScope: '',
    // 营业执照地址
    companyAddress: '',
    // 公司名称
    companyName: '',
    // 公司类型
    companyType: '',
    // 法定代表人
    legalPerson: '',
    // 经营开始日期
    operateStartDate: null,
    // 经营结束日期
    operateEndDate: null,
    // 是否长期经营
    operatePeriodForeverFlag: '',
    // 密码
    password: '',
    // 注册电话号码
    phone: '',
    // 注册资本
    registeredCapital: '',
    // 统一社会信用代码
    taxCode: '',
    // 组织机构代码
    taxCodeDesc: '',
  });
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
    question: '',
  });
  // 验证对象
  const [vdt, setVdt] = useState(null);
  // 省数据
  const [provinceOptions, setProvinceOptions] = useState([]);
  // 市数据
  const [cityOptions, setCityOptions] = useState([]);
  // 区数据
  const [countryOptions, setCountryOptions] = useState([]);
  // 街道数据
  const [streetOptions, setStreetOptions] = useState([]);
  // 上传文件数据
  const [uploadOption, setUploadOption] = useState({
    files: []
  });

  useEffect(() => {
    /**
     * 无依赖effect
     * */
    // 查询省的数据
    cosService.getProvinceList().then(({ code, data }) => {
      if (code === '1') {
        setProvinceOptions(data.map((v) => ({
          // 省id
          key: v.laprovinceid,
          // 省名称
          value: v.laprovince,
        })));
      }
    });
  }, []);

  const genVdt = useCallback(() => {
    /**
     * 创建验证对象
     * */
    const curVdt = new JValidate({
      userFormData,
      rules: {
        // 电话
        telphone: {
          required: true,
          mobile: true
        },
        // 验证码
        verifyCode: {
          required: true,
        },
        password: {
          required: true,
        }
      },
      messages: {
        // 姓名
        telphone: {
          required: '请输入手机号',
          mobile: '请输入正确的手机号'
        },
        // 验证码
        verifyCode: {
          required: '请输入验证码',
        },
        // 密码为8-20个字符，由大写字母、小写字母、数字和符合的两种以上组合
      }
    });
    setVdt(curVdt);
  }, [userFormData]);

  useEffect(() => {
    /**
     * 组合验证对象effect
     * */
    genVdt();
  }, [genVdt]);

  const valChange = useCallback(({ name, value, target }) => {
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

  const provinceChange = useCallback(async ({ name, value, text }) => {
    /**
     * 省 select change
     * */
    // 设置省数据
    setFormData({
      ...formData,
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
      addressTownName: '',
    });
    // 重置市option
    setCityOptions([]);
    // 重置区option
    setCountryOptions([]);
    // 重置街道option
    setStreetOptions([]);
    // 查询市数据
    const { code, data } = await cosService.getCityList(value);
    if (code === '1') {
      setCityOptions(data.map((v) => ({
        // 市id
        key: v.lacityid,
        // 市名称
        value: v.lacity,
      })));
    }
  }, [formData]);

  const cityChange = useCallback(async ({ name, value, text }) => {
    /**
     * 市 select change
     * */
    // 设置市数据
    setFormData({
      ...formData,
      [name]: value,
      addressCityName: text,
      // 重置选中的区code
      addressArea: '',
      // 重置选中的区名称
      addressAreaName: '',
      // 重置选中的街道乡镇编码
      addressTown: '',
      // 重置选中的街道乡镇名称
      addressTownName: '',
    });
    // 重置区option
    setCountryOptions([]);
    // 重置街道option
    setStreetOptions([]);
    // 查询区数据
    const { code, data } = await cosService.getCountyList(value);
    if (code === '1') {
      setCountryOptions(data.map((v) => ({
        // 区id
        key: v.lacountyid,
        // 市区名称
        value: v.lacounty,
      })));
    }
  }, [formData]);

  const countryChange = useCallback(async ({ name, value, text }) => {
    /**
     * 区 select change
     * */
    // 设置区数据
    setFormData({
      ...formData,
      [name]: value,
      addressAreaName: text,
      // 重置选中的街道乡镇编码
      addressTown: '',
      // 重置选中的街道乡镇名称
      addressTownName: '',
    });
    // 重置街道option
    setStreetOptions([]);
    // 查询街道数据
    const { code, data } = await cosService.getStreetList(value);
    if (code === '1') {
      setStreetOptions(data.map((v) => ({
        // 街道id
        key: v.latownid,
        // 街道名称
        value: v.latown,
      })));
    }
  }, [formData]);

  const streetChange = useCallback(async ({ name, value, text }) => {
    /**
     * 街道 select change
     * */
    // 设置街道数据
    setFormData({
      ...formData,
      [name]: value,
      addressTownName: text
    });
  }, [formData]);

  const customValid = useCallback((error) => {
    /**
     * 自定义验证上传
     * */
    if (error) {
      const {
        main,
      } = error;
      if (main === 'File is too large') {
        toast.error('只能上传10M以内图片', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, []);

  const imgLoad = useCallback((str) => {
    /**
     * 上传完成
     * */
    if (str) {
      const res = JSON.parse(str);
      const {
        code,
        data
      } = res;
      if (code === '1') {
        if (isNaN(Date.parse(data.operateStartDate))) {
          data.operateStartDate = null;
        }
        if (isNaN(Date.parse(data.operateEndDate))) {
          data.operateEndDate = null;
        }
        setFormData({
          ...formData,
          ...data
        });
      }
    }
  }, [formData]);

  const toRegister = useCallback(() => {
    cosService.saveCustomerPotential({
      // 区code
      addressArea: formData.addressArea,
      // 区名称
      addressAreaName: formData.addressArea,
      // 城市
      addressCity: formData.addressArea,
      // 城市名称
      addressCityName: formData.addressArea,
      // 省编码
      addressProvince: formData.addressArea,
      // 省名称
      addressProvinceName: formData.addressArea,
      // 街道乡镇编码
      addressTown: formData.addressArea,
      // 街道乡镇名称
      addressTownName: formData.addressArea,
      //
      businessLicenseUrl: formData.addressArea,
      // 经营范围
      businessScope: formData.addressArea,
      // 营业执照地址
      companyAddress: formData.addressArea,
      // 公司名称
      companyName: formData.addressArea,
      // 公司类型
      companyType: formData.addressArea,
      // 法定代表人
      legalPerson: formData.addressArea,
      // 经营结束日期
      operateEndDate: formData.addressArea,
      // 是否长期经营
      operatePeriodForeverFlag: formData.addressArea,
      // 经营开始日期
      operateStartDate: formData.addressArea,
      // 密码
      password: formData.addressArea,
      // 注册电话号码
      phone: formData.addressArea,
      // 期望和问题
      question: formData.addressArea,
      // 注册资本
      registeredCapital: formData.addressArea,
      // 详细地址
      specificAddress: formData.addressArea,
      // 统一社会信用代码
      taxCode: formData.addressArea,
      // 组织机构代码
      taxCodeDesc: formData.addressArea,
      // 联系人姓名
      userName: formData.addressArea,
    });
  }, [formData]);
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
                  onload: imgLoad,
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
              handChange={valChange}
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
              handChange={valChange}
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
              handChange={valChange}
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
              handChange={valChange}
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
              handChange={valChange}
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
              handChange={valChange}
              placeholder="请按照营业执照填写准确信息"
              border={false}
            />
          )}
        />
        <JFiledItem
          className="registerUpload-filedItem"
          title="经营期限(开始)"
          renderRight={(
            <DatePicker
              margin="normal"
              id="date-picker-dialog"
              format="yyyy-MM-dd"
              value={formData.operateStartDate}
              cancelLabel="取消"
              okLabel="确定"
              clearable
              clearLabel="清除"
              placeholder="请选择开始时间"
              onChange={(date) => valChange({
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
              id="operateEndDate"
              format="yyyy-MM-dd"
              value={formData.operateEndDate}
              cancelLabel="取消"
              okLabel="确定"
              clearable
              clearLabel="清除"
              placeholder="请选择结束时间"
              onChange={(date) => valChange({
                name: 'operateEndDate',
                value: date
              })}
            />
          )}
        />
        <JFiledItem
          title="营业执照地址"
          renderRight={(
            <JInput
              name="companyAddress"
              value={formData.companyAddress}
              handChange={valChange}
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
              onChange={valChange}
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
              value={formData.userName}
              handChange={valChange}
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
              value={formData.addressProvince}
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
              value={formData.addressCity}
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
              value={formData.addressArea}
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
              value={formData.addressTown}
              onChange={streetChange}
            />
          )}
        />
        <JFiledItem
          title="详细地址"
          renderRight={(
            <JInput
              name="specificAddress"
              value={formData.specificAddress}
              handChange={valChange}
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
              value={formData.question}
              onChange={valChange}
              placeholder="请输入内容"
            />
          )}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
}

RegisterUpload.propTypes = {};

RegisterUpload.defaultProps = {};
export default RegisterUpload;
