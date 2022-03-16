<template>
  <div class="attr">
    <!-- 三级联动所在卡片 -->
    <el-card class="card">
      <CategorySelect></CategorySelect>
    </el-card>

    <!-- 下部表格所在卡片 -->
    <el-card class="card">
      <!-- 下部卡片第一个状态：平台属性列表展示 -->
      <div v-show="scene">
        <!-- 添加按钮 -->
        <el-button type="primary" icon="el-icon-plus" size="mini"
          >添加</el-button
        >

        <!-- 表格 -->
        <el-table border style="width: 100%; margin-top: 20px">
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
            <template slot-scope="{ row, $index }">
              <el-tag type="success"></el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
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
      </div>

      <!-- 下部卡片第二个状态：添加属性form -->
      <el-form ref="form" label-width="80px" v-show="!scene">
        <el-form-item label="属性名">
          <el-input placeholder="请输入属性名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
          <el-button>取消</el-button>

          <el-table border style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center"
            >
            </el-table-column>

            <el-table-column prop="prop" label="属性值名称" width="width">
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
              <template slot-scope="{ row, $index }">
                <el-button type="danger" icon="el-icon-delete"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      scene: false,
    };
  },
};
</script>

<style scoped>
.card {
  margin: 20px;
}
</style>