// 这是总仓库
import Vue from 'vue';
import Vuex from 'vuex';


// 将小仓库引入
import trademark from './trademark';
import attr from './attr'
import spu from './spu'
import sku from './sku'



// 对外暴露Store类的一个实例
export default new Vuex.Store({
  modules: {
    trademark,
    attr,
    spu,
    sku
  }
})
