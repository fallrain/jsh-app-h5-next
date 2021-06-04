const prefix = 'commodity';
export default {
  // 商品有货商品分类列表
  GET_CATALOG_LIST: `${prefix}.getCatalogList`,
  // 更新商品有货商品分类列表
  UPDATE_CATALOG_LIST: `${prefix}.updateCatalogList`,
  // 接口取商品有货商品分类列表 并更新
  UPDATE_CATALOG_LIST_ASYNC: `${prefix}.updateCatalogListAsync`,
};
