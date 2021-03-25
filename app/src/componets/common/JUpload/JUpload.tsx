import React, {
  useState,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import './jUpload.scss';
import classNames from 'classnames';
import {
  FilePond,
  FilePondProps,
  registerPlugin
} from 'react-filepond';
import 'filepond/dist/filepond.min.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SemipolarLoading from 'react-loadingg/lib/SemipolarLoading';
import FilePondPluginFileValidateSize, {
  FilePondPluginFileValidateSizeProps
} from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType, {
  FilePondPluginFileValidateTypeProps
} from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

// type Diff<T extends keyof any, U extends keyof any> =
//   ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
// type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

type IJUploadParent = FilePondProps &
  FilePondPluginFileValidateSizeProps &
  FilePondPluginFileValidateTypeProps & {
  // 最大上传文件数量
  maxFiles: number
}

// type IJUpload = Exclude<IJUploadParent, 'maxTotalFileSize'> & {
//   maxTotalFileSize?: string | null
// }
type IJUpload = Omit<IJUploadParent, 'maxTotalFileSize'> & {
  maxTotalFileSize?: string;
}

interface IImgSrc {
  // 图片路径
  src: string | ArrayBuffer | any
  // 图片key
  key: string | number
}

function JUpload(props: IJUpload) {
  // 图片地址
  const [imgSrcs, setImgSrcs]: [IImgSrc[], any] = useState([]);
  // 上传组件pond实例
  const [pond, setPond] = useState<FilePond | null>();
  // 加载对象
  const [loadingMap, setLoadingMap] = useState<Record<string, string | number>>({});

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
            src: (e.target && e.target.result) || '',
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
    pond && pond.removeFile(key);
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
            <div
              className="jUpload-preview-del-wrap"
              onClick={() => removeImg(item.key, index)}
            >
              <i
                className="iconfont icon-guanbi jUpload-preview-del"
              />
            </div>
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
          (props.maxFiles || 1) <= imgSrcs.length && 'hidden'
        ])}
      >
        <FilePond
          ref={(ref) => setPond(ref)}
          allowDrop={false}
          labelIdle=""
          maxTotalFileSize={props.maxTotalFileSize || null}
          {...props}
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

export default JUpload;
