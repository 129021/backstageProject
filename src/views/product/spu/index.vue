<template>
  <div id="spu" class="spu">
    <el-card class="card">
      <CategorySelect></CategorySelect>
    </el-card>

    <el-card class="card">
      <el-button type="primary" class="button">添加SPU</el-button>

      <el-table border style="width: 100%">
        <el-table-column type="index" width="80" label="序号" align="center">
        </el-table-column>
        <el-table-column
          prop="prop"
          width="width"
          label="spu名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="prop"
          width="width"
          label="spu描述"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="prop" width="width" label="操作" align="center">
          <template slot-scope="{ row, $index }">
            <el-button
              type="primary"
              icon="el-icon-add"
              size="mini"
              title="添加sku"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              title="修改spu"
            ></el-button>
            <el-button type="info" icon="el-icon-info" size="mini"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              title="删除spu"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
      <el-pagination
        style="text-align: center; margin-top: 20px"
        :current-page="1"
        :page-sizes="[3, 5, 10]"
        :page-size="3"
        layout=" prev, pager, next, jumper, ->,sizes,total"
        :total="30"
      >
      </el-pagination>
    </el-card>

    <!-- SpuForm  -->
    <SpuForm></SpuForm>

    <!-- SkuForm -->
    <SkuForm></SkuForm>
  </div>
</template>

<script>
import SpuForm from "./spuForm";
import SkuForm from "./skuForm";

export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
};
</script>

<style scoped>
.card {
  margin: 20px;
}
.button {
  margin-bottom: 20px;
}
</style>