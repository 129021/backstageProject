<template>
  <div class="trademark">
    <!-- 添加按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      class="add-button"
      @click="addTrademark"
      >添加</el-button
    >

    <!-- table表格 -->
    <el-table border style="width: 100%" :data="baseTrademark">
      <el-table-column
        type="index"
        label="序号"
        sortable
        width="80"
        align="center"
      >
      </el-table-column>

      <el-table-column
        label="品牌名称"
        width="width"
        align="center"
        prop="tmName"
      >
      </el-table-column>

      <el-table-column
        label="品牌图标"
        width="width"
        align="center"
        prop="logoUrl"
      >
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" class="img" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="width" align="center" prop="prop">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTrademark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteBaseTrademark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <!-- @size-change="handleSizeChange"
      @current-change="handleCurrentChange" -->
    <el-pagination
      style="text-align: center; margin-top: 20px"
      :current-page="current"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->, sizes,total "
      :total="total"
      pager-count:7
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 点击添加或者修改按钮会弹出dialog对话框： -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="tmForm">
        <el-form-item label="品牌名称" label-width="80px" prop="tmName">
          <el-input v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Trademark",
  data() {
    return {
      current: 1,
      limit: 3,
      baseTrademark: [],
      total: 30,

      // 控制添加品牌和修改品牌对话框显示与隐藏的属性
      dialogFormVisible: false,

      // 品牌logo
      imageUrl: "",

      // 收集添加或者修改trademark参数的属性
      tmForm: {
        logoUrl: "",
        tmName: "",
        id: undefined,
      },
    };
  },
  mounted() {
    this.getBaseTradeMark();
  },
  methods: {
    async getBaseTradeMark() {
      const { current, limit } = this;
      let res = await this.$API.trademark.reqBaseTrademark(current, limit);
      // console.log(res);
      if (res.code == 200) {
        this.baseTrademark = res.data.records;
        this.current = res.data.current;
        this.limit = res.data.size;
        this.total = res.data.total;
      }
    },

    // 点击分页器页码跳转到该页
    handleCurrentChange(pager) {
      // console.log(pager);
      // let{current,limit}=this;
      // current=pager;
      this.current = pager;
      this.getBaseTradeMark();
    },

    // 选择每页展示品牌数量
    handleSizeChange(limit) {
      // console.log(limit);
      this.limit = limit;
      this.getBaseTradeMark();
    },

    // 删除某一项数据
    deleteBaseTrademark(row) {
      this.$confirm(`确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$API.trademark.reqDeleteBaseTrademark(row.id);
          console.log(res);

          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getBaseTradeMark();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // console.log(row);
    },

    // 添加品牌logo的方法
    handleAvatarSuccess(res, file) {
      this.tmForm.logoUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 添加或者修改trademark
    async addOrUpdateTrademark() {
      this.dialogFormVisible = true;
      let res = await this.$API.trademark.reqAddOrUpdateTrademark(this.tmForm);
      // console.log(res);
      if (res.code == 200) {
        this.$message({
          type: "success",
          message: this.tmForm.id ? "修改成功" : "添加成功",
        });
        this.getBaseTradeMark();
        this.tmForm = {};
        this.dialogFormVisible = false;
      }
    },

    // 点击修改按钮的回调
    updateTrademark(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.tmForm.id = row.id;
      this.tmForm.logoUrl = row.logoUrl;
      this.tmForm.tmName = row.tmName;
    },

    // 点击添加按钮的回调
    addTrademark() {
      this.dialogFormVisible = true;
    },

    // 点击取消按钮的回调
    cancel() {
      this.tmForm = {};
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.add-button {
  margin: 20px;
}

.img {
  width: 100px;
  height: 100px;
}
</style>

// 添加品牌logo的样式
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>