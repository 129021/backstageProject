import request from '@/utils/request'


// 获取spu列表
// GET /admin/product/{page}/{limit}
// params:category3Id

export const reqSpuList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  method: 'get',
  params: {
    category3Id
  },

})



// 获取某个spu的sku列表
// GET /admin/product/findBySpuId/{spuId}
export const reqSkuListBySpuId = (spuId) => request({
  url: `/admin/product/findBySpuId/${spuId}`,
  method: 'get',
})


// 删除某个spu
// DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete',

})


// 获取品牌列表
// GET /admin/product/baseCategoryTrademark/findTrademarkList/{category3Id}
export const reqTrademark = (category3Id) => request({
  url: '/admin/product/baseTrademark/getTrademarkList',
  method: 'get',

})


// 获取销售属性列表
export const reqBaseSaleAttrList = () => request({
  url: '/admin/product/baseSaleAttrList',
  method: 'get',
})




// 通过spu的id获取spu信息
// GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  method: 'get',
})




//   获取spu图片的接口
// GET /admin/product/spuImageList/{spuId}
// spuId 
export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get'
})




// 保存或者修改spuForm的接口
// POST /admin/product/saveSpuInfo

// POST /admin/product/updateSpuInfo

export const reqSaveOrUpdateSpu = (spu) => {
  if (spu.id) {
    return request({
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data: spu,
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spu,
    })
  }
}










// 添加或者修改SPU
// POST /admin/product/saveSpuInfo
// POST /admin/product/updateSpuInfo

export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({
      url: '/admin/product/updateSpuInfo',
      method: 'post',
      data: spuInfo,
    })
  } else {
    return request({
      url: '/admin/product/saveSpuInfo',
      method: 'post',
      data: spuInfo,
    })
  }

}




// 获取图片的接口
// /admin/product/spuImageList/{spuId}
// get 
export const reqSkuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  method: 'get',
})




// 获取销售属性的接口
// /admin/product/spuSaleAttrList/{spuId} get
export const reqSpuSaleAttrList = (spuId) => request({
  url: `/admin/product/spuSaleAttrList/${spuId}`,
  method: 'get',
})



// 获取平台属性的数据
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id} get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get',
})



// 添加sku的接口
// 添加sku
// /admin/product/saveSkuInfo
// post 
export const reqAddSku = (skuInfo) => request({
  url: '/admin/product/saveSkuInfo',
  method: 'post',
  data: skuInfo,
})
