import React, {
  useState,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import './jUpload.scss';
import classNames from 'classnames';
import {
  FilePond,
  registerPlugin
} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import SemipolarLoading from 'react-loadingg/lib/SemipolarLoading';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);
function JUpload(props) {
  // 图片地址
  const [imgSrcs, setImgSrcs] = useState([]);
  // 上传组件pond实例
  const [pond, setPond] = useState(null);
  // 加载对象
  const [loadingMap, setLoadingMap] = useState({});

  const onAdd = useCallback((ins) => {
    /**
     * 文件开始添加
     * */
    setLoadingMap({
      ...loadingMap,
      [ins.id]: true
    });
    props.onaddfilestart && props.onaddfilestart(ins);
  }, [props.onaddfilestart, loadingMap]);

  const onAddEnd = useCallback((error, ins) => {
    /**
     * 文件添加结束
     * */
    // 如果有错误，也结束loading
    if (error) {
      setLoadingMap({
        ...loadingMap,
        [ins.id]: false
      });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(ins.file);
      reader.onload = function (e) {
        setImgSrcs([
          ...imgSrcs,
          {
            src: e.target.result,
            key: ins.id
          }
        ]);
      };
    }
    props.onaddfile && props.onaddfile(error, ins);
  }, [imgSrcs, props.onaddfile, loadingMap, imgSrcs]);

  const processFileAbort = useCallback((ins) => {
    /**
     * 文件上传被打断
     * */
    setLoadingMap({
      ...loadingMap,
      [ins.id]: false
    });
    props.onprocessfileabort && props.onprocessfileabort(ins);
  }, [props.onprocessfileabort, loadingMap]);

  const onEnd = useCallback((error, ins) => {
    /**
     * 上传结束
     * */
    setLoadingMap({
      ...loadingMap,
      [ins.id]: false
    });
    props.onprocessfile && props.onprocessfile(error, ins);
  }, [props.onprocessfile, loadingMap]);

  const removeImg = useCallback((key, index) => {
    /**
     * 删除一个图片
     * */
    pond.removeFile(key);
    imgSrcs.splice(index, 1);
    setImgSrcs(imgSrcs);
  }, [pond, imgSrcs]);

  return (
    <div className="jUpload">
      {
        imgSrcs.map((item, index) => (
          <div
            className="jUpload-preview"
            key={item.key}
          >
            <img
              className="jUpload-preview-img"
              src={item.src}
            />
            {
              <div
                className="jUpload-preview-del-wrap"
                onClick={() => removeImg(item.key, index)}
              >
                <i
                  className="iconfont icon-guanbi jUpload-preview-del"
                />
              </div>
            }
            {
              loadingMap[item.key] && (
                <SemipolarLoading />
              )
            }
          </div>
        ))
       }
      <label
        className={classNames([
          'jUpload-wrap',
          props.maxFiles <= imgSrcs.length && 'hidden'
        ])}
      >
        <FilePond
          ref={(ref) => setPond(ref)}
          allowDrop={false}
          labelIdle=""
          {...props}
          chunkSize="100"
          onaddfilestart={onAdd}
          onaddfile={onAddEnd}
          onprocessfile={onEnd}
          onprocessfileabort={processFileAbort}
        />
        <i className="iconfont icon-13 jUpload-icon" />
      </label>
    </div>
  );
}

JUpload.propTypes = {
  customValid: PropTypes.func
};

JUpload.defaultProps = {};
export default JUpload;
