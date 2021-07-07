const prefix = 'shoppingCart';
const SHOPPING_CART = {
  // 购物车数量
  GET_CART_NUM: `${prefix}.getCartNum`,
  UPDATE_CART_NUM: `${prefix}.updateCartNum`,
  UPDATE_CART_NUM_ASYNC: `${prefix}.updateCartNumAsync`,
  // 拆单信息
  GET_SPLIT_ORDER_DATA: `${prefix}.getSplitOrderData`,
  UPDATE_SPLIT_ORDER_DATA: `${prefix}.updateSplitOrderData`,
};

export default SHOPPING_CART;
