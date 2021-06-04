import {
  useState,
  useEffect
} from 'react';
import { AnyFun } from '../../interface';

interface IWeekOptions {
  key: string,
  value: string,
}

export function useWeekPicker(productCode: string, week: any, getVersionPriceState: AnyFun) {
  // 远周次picker show
  const [isWeekPickerShow, setIsWeekPickerShow] = useState<boolean>(false);
  // 远周次数据
  const [weekOptions, setWeekOptions] = useState<IWeekOptions[]>([]);

  function genWeekOptions() {
    /**
     *  组合远周次数据
     *  */
    setWeekOptions([]);
    if (!getVersionPriceState()) {
      return;
    }
    const weekOptionsTemp:any[] = [];
    if (week) {
      const productWeeks = week[productCode];
      if (productWeeks) {
        // 远周次数据
        productWeeks.forEach((v: any) => {
          // fix ios time bug
          const fixTime = v.replace('-', '/');
          const curDate = new Date();
          // 调用getTime也是fix ios bug
          if (curDate.getTime() < new Date(fixTime).getTime()) {
            weekOptionsTemp.push({
              key: v,
              value: v
            });
          }
        });
      }
    }
    setWeekOptions(weekOptionsTemp);
  }

  useEffect(() => {
    genWeekOptions();
  }, []);

  return {
    isWeekPickerShow,
    setIsWeekPickerShow,
    weekOptions,
    setWeekOptions
  };
}
