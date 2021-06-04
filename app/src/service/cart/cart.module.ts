export interface IGetShoppingCartList {
  // 售达方code
  saletoCode: string
  // 送达方code
  sendtoCode: string
  // 子账号code
  saletoCodeSub: string
}

export interface IGetSpecialPrice {
  // 售达方code
  saletoCode: string
  // 送达方code
  sendtoCode: string
  // 账号
  account: string
}
