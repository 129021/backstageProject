<template>
  <div id="spuForm" class="spuForm">
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" value="">
          <el-option label="label" value="value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="SPU描述"></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>


      <el-form-item label="销售属性">
        <el-select placeholder="还有三项未选择" value="">
          <el-option label="label" value="value"></el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-plus" style="margin-left: 20px"
          >添加销售属性</el-button
        >
        <el-table border style="width: 100%;margin-top:20px">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性名" width="width"  align="center" >
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width"  align="center" >
            <template slot-scope="{ row, $index }">
              <el-tag
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width"  align="center" >
              <template slot-scope="{row,$index}">
               <el-button type="danger" icon="el-icon-delete"></el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      // 照片墙的两个属性
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },

  methods: {
    //   上传spu图片的方法（照片墙）
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // spu属性值的方法
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style scoped>
</style>


// tag的样式
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>