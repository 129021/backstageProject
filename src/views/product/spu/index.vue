<template>
  <div id="spu" class="spu">
    <!-- 上部分卡片：三级联动 -->
    <el-card class="card">
      <CategorySelect></CategorySelect>
    </el-card>

    <!-- 下部卡片：三个场景切换 -->
    <el-card class="card">
      <!-- 场景一：spu列表展示(带分页器) scene=0 -->
      <div v-show="scene == 0">
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
          <el-table-column
            prop="prop"
            width="width"
            label="操作"
            align="center"
          >
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
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
              ></el-button>
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
      </div>

      <!-- 场景二：添加/修改spu scene=2 -->
      <!-- SpuForm  -->
      <SpuForm v-show="scene == 1"></SpuForm>

      <!-- 场景三：添加sku -->
      <!-- SkuForm -->
      <SkuForm v-show="scene == 2"></SkuForm>
    </el-card>
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
  data() {
    return {
      scene:2,

    }
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