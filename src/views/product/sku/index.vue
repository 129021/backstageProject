<template>
  <div>
    <el-table style="margin: 20px; width: 100%" border>
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="描述" width="width">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110">
        <template slot-scope="{ row, $index }">
          <img src="" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="重量" width="80"> </el-table-column>
      <el-table-column prop="prop" label="价格" width="80"> </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button type="success" icon="el-icon-top" size="mini"></el-button>
          <el-button type="info" icon="el-icon-bottom" size="mini"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="warning" icon="el-icon-info" size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
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

    <!-- 抽屉 -->
    <el-drawer>
      <el-row :gutter="10">
        <el-col :span="6">名称</el-col>
        <el-col :span="18"></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">描述</el-col>
        <el-col :span="18"></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">价格</el-col>
        <el-col :span="18"></el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <template>
            <el-tag type="success"></el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
          <!-- 轮播图 -->
          <el-carousel trigger="click" height="500px" width="500px">
            <el-carousel-item>
              <img src="" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
};
</script>

<style>
</style>