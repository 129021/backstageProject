<template>
  <div class="trademark">
    <!-- 添加按钮 -->
    <el-button type="primary" icon="el-icon-plus" class="add-button"
      >添加</el-button
    >

    <!-- table表格 -->
    <el-table border style="width: 100%" >
      <el-table-column
        type="index"
        label="序号"
        sortable
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column label="品牌图标" width="140" align="center">
        <template slot-scope="{ row, $index }">
          <img src="" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="品牌名称" width="width" align="center">
      </el-table-column>
      <el-table-column label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button type="warning" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
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
      layout="prev, pager, next, jumper,->, sizes,total "
      :total="30"
      pager-count:7
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    return {};
  },
};
</script>

<style scoped>
.add-button {
  margin: 20px;
}
</style>