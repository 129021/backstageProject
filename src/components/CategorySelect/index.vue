<template>
  <div>
    <el-form ref="form" :model="cForm" label-width="80px" :inline="true">
      <el-form-item label="一级分类">
        <el-select
          placeholder="请选择一级分类"
          v-model="cForm.category1Id"
          class="select"
          @change="handler1"
          :disabled="show"
        >
          <el-option
            :value="category1.id"
            :label="category1.name"
            v-for="(category1, index) in category1List"
            :key="category1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择二级分类"
          v-model="cForm.category2Id"
          class="select"
          @change="handler2"
          :disabled="show"
        >
          <el-option
            :value="category2.id"
            :label="category2.name"
            v-for="(category2, index) in category2List"
            :key="category2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择三级分类"
          v-model="cForm.category3Id"
          class="select"
          @change="handler3"
          :disabled="show"
        >
          <el-option
            :value="category3.id"
            :label="category3.name"
            v-for="(category3, index) in category3List"
            :key="category3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['show'],
  data() {
    return {
      select: "",
      // 收集三级分类下拉框列表数据
      category1List: [],
      category2List: [],
      category3List: [],

      // 收集三级分类选择的id
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    // 获取一级分类列表
    this.getCategory1List();
  },
  methods: {
    async getCategory1List() {
      let res = await this.$API.categorySelect.reqCategory1List();

      // console.log(res);
      if (res.code == 200) {
        this.category1List = res.data;
      }
    },

    // 选择一级分类的回调
    async handler1() {
      // 清除二三级分类的数据
      this.category2List = [];
      this.category3List = [];
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";

      const { category1Id } = this.cForm;

      this.$emit("getCategory", { id: category1Id, level: 1 });

      // 获取二级分类下拉框的数据category2List
      let res = await this.$API.categorySelect.reqCategory2List(category1Id);
      // console.log(res);
      if (res.code == 200) {
        this.category2List = res.data;
      }
    },

    async handler2() {
      // console.log("选择二级分类回调");
      // 清除三级分类的数据
      this.category3List = [];
      this.cForm.category3Id = "";
      const { category2Id } = this.cForm;

      // 将选择的二级分类的id发给父组件attr
      this.$emit("getCategory", { id: category2Id, level: 2 });

      // 获取三级分类列表的数据
      let res = await this.$API.categorySelect.reqCategory3List(category2Id);
      // console.log(res);
      if (res.code == 200) {
        this.category3List = res.data;
      }
    },

    handler3() {
      // console.log("选择三级分类回调");
      // 将选择的三级分类的id发给父组件attr
      this.$emit("getCategory", { id: this.cForm.category3Id, level: 3 });
    },
  },
};
</script>

<style scoped>
.title {
  margin-right: 15px;
}
.select {
  margin-right: 40px;
}
</style>