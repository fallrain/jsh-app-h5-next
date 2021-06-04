import React, {
  useState,
  useEffect
} from 'react';

interface IStockOptions {
  stockType: string,
  // 库存数量
  qty: number,
  // 预计到货时间
  arrivalTime: string
}

export function useStockPicker(stock: any) {
  // 库存展示
  const [isStockPickerShow, setIsStockPickerShow] = useState<boolean>(false);
  // 库存数据
  const [stockOptions, setStockOptions] = useState<IStockOptions[]>([]);

  function genStockPickerOption() {
    /* 组合库存数据 */
    // this.stockOptions
    if (!stock) {
      return;
    }
    if (stock) {
      const options = stock.storeInfo.map((v: IStockOptions) => ({
        // 库存类型名称
        stockType: v.stockType,
        // 库存数量
        qty: v.qty,
        // 预计到货时间
        arrivalTime: v.arrivalTime ? v.arrivalTime.substring(0, 10) : '--'
      }));
      setStockOptions(options);
    }
  }

  useEffect(() => {
    genStockPickerOption();
  }, []);

  return {
    isStockPickerShow,
    setIsStockPickerShow,
    stockOptions,
    setStockOptions
  };
}
