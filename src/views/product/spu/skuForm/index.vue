<template>
  <div id="skuForm" class="skuForm">
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="label">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="label2">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          
          <el-form-item label="label">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>



      <el-form-item label="图片列表">
        <el-table border style="width: 100%">
          <el-table-column    type="selection" width="80" align="center">
          </el-table-column>

          <el-table-column
            prop="prop"
            label="图片"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <img src="" alt="" />
            </template>
          </el-table-column>

          <el-table-column
            prop="prop"
            label="名称"
            width="width"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-button type="primary">设为默认</el-button>
              <el-button>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item >
     <el-button type="primary">保存</el-button>
     <el-button >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
};
</script>

<style>
</style>