<template>
  <div class="attr">
    <!-- 三级联动所在卡片 -->
    <el-card class="card">
      <CategorySelect></CategorySelect>
    </el-card>

    <!-- 下部表格所在卡片 -->
    <el-card class="card">
      <!-- 添加按钮 -->
      <el-button type="primary" icon="el-icon-plus" size="mini">添加</el-button>

      <!-- 表格 -->
      <el-table border style="width: 100% ;margin-top:20px">
        <el-table-column type="index" label="序号" width="80" align="center">
        </el-table-column>

        <el-table-column
          prop="prop"
          label="属性名称"
          width="width"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="prop"
          label="属性值"
          width="width"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width" align="center">
          <template slot-scope="{ row, $index }">
            <el-button type="warning" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
            <el-button type="danger" size="mini" icon="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
};
</script>

<style scoped>
.card {
  margin: 20px;
}
</style>