// 这是trademark 请求API接口的组件

import request from '@/utils/request'


// 请求trademark数据
// GET /admin/product/baseTrademark/{page}/{limit}
export const reqBaseTrademark = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get',
})


// 删除某一项trademark数据
// /admin/product/baseTrademark/remove/{id} delete
export const reqDeleteBaseTrademark = (id) => request({
  url: `/admin/product/baseTrademark/remove/${id}`,
  method: 'delete',
})



// 新增 或者修改trademark
// /admin/product/baseTrademark/save post 

// /admin/product/baseTrademark/update  put
export const reqAddOrUpdateTrademark = (tmForm) => {
  if (tmForm.id) {
   return  request({
      url: '/admin/product/baseTrademark/update',
      method: 'put',
      data: tmForm,
    })
  } else {
  return   request({
      url: '/admin/product/baseTrademark/save',
      method: 'post',
      data: tmForm,
    })
  }

}
