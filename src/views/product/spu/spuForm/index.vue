<template>
  <div id="spuForm" class="spuForm">
      <el-form ref="form"  label-width="80px">
          <el-form-item label="SPU名称">
              <el-input ></el-input>
          </el-form-item>

          <el-form-item label="品牌">
              <el-select placeholder="请选择品牌" value=''>
                  <el-option label="label" value="value"></el-option>
              </el-select>
          </el-form-item>
          
          <el-form-item label="SPU描述">
          <el-input type="textarea" placeholder="SPU描述" ></el-input>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
};
</script>

<style scoped>
</style>