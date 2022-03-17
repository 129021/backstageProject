import request from '@/utils/request'


// 拿到三级联动分类列表的三个id，获取attrInfoList
// /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get',
})


// 删除选定的attrInfo
// DELETE /admin/product/deleteAttr/{attrId}
export const reqRemoveAttr = (attrId) => request({
  url: `/admin/product/deleteAttr/${attrId}`,
  method: 'delete',
})


// 添加或者修改attr
// POST /admin/product/saveAttrInfo

export const reqAddOrUpdateAttr = (data) => request({
  url: '/admin/product/saveAttrInfo',
  method: "post",
  data
})
