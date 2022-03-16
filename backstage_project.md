## login业务
### 修改login的API
原先API为mock接口，现在要换为真实接口，即：`/admin/acl/index/login`.
退出登录，获取用户信息的接口也可同时更换
### 配置proxy
因为不是使用mock数据，使用真实数据必然要解决跨域的问题，这时候就要配置proxy，

在`vue.cofig.js`中 :
```js
 proxy: {
      '/dev-api': {
        target: 'http://39.98.123.211',
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    },
```
## 商品管理
### 结构搭建
商品管理有四个组件：attr,trademark,spu,sku,分别搭建其vue骨架，待书写静态组件
### 商品管理配置路由
注意一：商品管理组件属于Layout子组件，
```js
component:Layout
```

注意二：hidden属性控制组件的显示与隐藏，所以这里要设为true 


### 商品管理/平台属性管理静态组件搭建
el-pagination居中：
```js
style="text-align:center"
```


### 平台属性管理
将三级联动设置为全局组件：
CategorySelect：
```js
// 将CategorySelect注册为全局组件
import CategorySelect from '@/components/CategorySelect'
Vue.component(CategorySelect.name,CategorySelect)
```
