<template>
  <div>
    <span class="title">一级分类</span>
    <el-select placeholder="请选择一级分类" v-model="select" class="select">
      <el-option value=""></el-option>
    </el-select>

    <span class="title">二级分类</span>
    <el-select placeholder="请选择二级分类" v-model="select" class="select">
      <el-option value=""></el-option>
    </el-select>

    <span class="title">三级分类</span>
    <el-select placeholder="请选择三级分类" v-model="select" class="select">
      <el-option value=""></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      select: "",
    };
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