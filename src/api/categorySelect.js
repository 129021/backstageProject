import request from '@/utils/request';


// 获取category1
// /admin/product/getCategory1 get
export const reqCategory1List=()=>request({
    url:'/admin/product/getCategory1',
    method:'get',
})

// 获取category2
// /admin/product/getCategory2/{category1Id} get 
export const reqCategory2List=(category1Id)=>request({
    url:`/admin/product/getCategory2/${category1Id}`,
    method:'get',
})



// 获取category3
// GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List=(category2Id)=>request({
    url:`/admin/product/getCategory3/${category2Id}`,
    method:'get',
})