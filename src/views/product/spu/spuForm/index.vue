<template>
  <div id="spuForm" class="spuForm">
    <!-- 这里的:model是收集数据，将数据收集到spu身上 -->
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName"></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" value="" v-model="spu.tmId">
          <!-- value是要收集的数据 -->
          <el-option
            :label="trademark.tmName"
            :value="trademark.id"
            v-for="(trademark, index) in trademarkList"
            :key="trademark.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>

      <!-- :file-list="spuImageList"照片墙展示数据的来源 -->
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload/"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}项未选择`"
          value=""
          v-model="attrIdAndAttrName"
        >
          <el-option
            :label="saleAttr.name"
            :value="`${saleAttr.id}:${saleAttr.name}`"
            v-for="(saleAttr, index) in unSelectSaleAttr"
            :key="saleAttr.id"
          ></el-option>
        </el-select>

        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-left: 20px"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table
          border
          style="width: 100%; margin-top: 20px"
          :data="spu.spuSaleAttrList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="width"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值名称"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <!-- @close="handleClose(tag)" -->
              <!-- :disable-transitions="false" -->
              <!-- :key="tag" -->
              <el-tag
                closable
                v-for="(tag, index) in row.spuSaleAttrValueList"
                :key="tag.id"
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
                >{{ tag.saleAttrValueName }}
              </el-tag>

              <!-- 
                  @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm" -->
              <!-- v-if="inputVisible"
                v-model="inputValue" -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                @blur="handleInputConfirm(row)"
              ></el-input>

              <!-- @click="showInput" -->
              <el-button
                class="button-new-tag"
                size="small"
                icon="el-icon-plus"
                v-else
                @click="addSaleAttrValue(row)"
                >添加属性值</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { forEach } from 'mock/user';
export default {
  name: "SpuForm",
  data() {
    return {
      // 照片墙的两个属性
      dialogImageUrl: "",
      dialogVisible: false,

      category3Id: "",

      // 获取品牌信息
      trademarkList: [],

      // 获取销售属性
      saleAttrList: [],

      // 未选择的销售属性
      attrIdAndAttrName: "",
      // 存储spu图片的属性
      spuImageList: [],

      // 添加spu：如果是添加spu的时候并没有向服务器发请求，数据也是收集到spu，收集数据的时候有哪些字段可以参考API文档
      spu: {
        // 三级分类的id，在添加spu的时候需要收集
        category3Id: 0,

        // spu描述
        description: "",
        // 收集spu图片的信息
        spuImageList: [
          {
            // id: 0,
            imgName: "",
            imgUrl: "",
            // spuId: 0,
          },
        ],

        // spu名称
        spuName: "",

        // 品牌的id
        tmId: "",

        // 销售属性
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "string",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    // 计算出还未选择的销售属性
    unSelectSaleAttr() {
      // 整个平台的销售尺寸一共有三个：分别是颜色，尺寸，版本（saleAttrList)
      // 当前spu自己拥有的属于自己的销售属性spu.spuSaleAttrList

      // 数组的过滤的方法：可以从已有的数组当中过滤出用户需要的元素，并返回一个新的数组
      let result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          // every是数组的一个方法，会返回一个布尔值
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },

  methods: {
    //   上传spu图片的方法（照片墙）
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // fileList是删除照片之后剩余的照片
      this.spuImageList = fileList;
    },

    // 照片墙图片预览的回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 照片墙图片上传成功的回调
    handlerSuccess(response, file, fileList) {
      // 收集图片的信息
      this.spuImageList = fileList;
    },

   

    // 点击添加spu按钮（在第一个状态上）的回调
    async addSpu(category3Id) {
      this.category3Id = category3Id;
      // console.log('成功从第一个状态调到第二个状态的方法');

      // 发请求获取品牌列表在品牌下拉框展示
      let res = await this.$API.spu.reqTrademark();
      // console.log(res);
      if (res.code == 200) {
        this.trademarkList = res.data;
      }

      // 发请求获取销售属性列表
      let res1 = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(res1);
      if (res1.code == 200) {
        this.saleAttrList = res1.data;
      }
    },

    // 点击修改spu按钮（在第一个状态）的回调
    async initSpuForm(row) {
      // console.log('成功地在第一个状态调了第二个状态的回调函数');
      // console.log(row);
      // this.spu.spuName=row.spuName;
      // 通过row拿到这个spu的id，再通过id 发请求获取spu的信息
      let spuRes = await this.$API.spu.reqSpu(row.id);

      // console.log(spuRes);
      if (spuRes.code == 200) {
        this.spu = spuRes.data;
      }

      // 获取品牌列表
      let trademarkRes = await this.$API.spu.reqTrademark();
      // console.log(res);
      if (trademarkRes.code == 200) {
        this.trademarkList = trademarkRes.data;
      }

      // 获取销售属性列表
      let saleAttrRes = await this.$API.spu.reqBaseSaleAttrList();
      // console.log(res1);
      if (saleAttrRes.code == 200) {
        this.saleAttrList = saleAttrRes.data;
      }

      // 获取spu图片
      let imgRes = await this.$API.spu.reqSpuImageList(row.id);
      // console.log(imgRes);
      if (imgRes.code == 200) {
        // this.spu.imgName = imgRes.data.imgName;
        // this.spu.imgUrl = imgRes.data.imgUrl;
        // this.spuImageList = imgRes.data;
        // 由于照片墙显示图片的数据的数组里面必须有name和url字段，所以需要把服务器返回的数组进行修改
        let arr = imgRes.data;
        arr.forEach((item) => {
          // 将imgName,imgUrl修改为name和url(其实不是修改，而是新增了name和url这两个属性，原来的imgName和imgUrl还在)
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // 把整理好的数据赋值给spuImageList
        this.spuImageList = arr;
      }
    },

    // 点击添加销售属性按钮的回调
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");

      // 这里是将销售属性列表中的数据直接添加到spu.spuSaleAttrList中
      let nweSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };

      // 向spu.spuSaleAttrList中添加新的销售属性
      this.spu.spuSaleAttrList.push(nweSaleAttr);

      // 清空数据
      this.attrIdAndAttrName = "";
    },

    // 添加属性值按钮失去焦点由input变为button的事件
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row;

      // 新增的销售属性值不能为空
      if (inputValue.trim() == "") {
        this.$message("属性值不能为空");
        return;
      }

      // 属性值不能重复
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName != inputValue
      );
      if (!result) return;
      let newsaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue };
      // 修改inputVisible为false
      row.spuSaleAttrValueList.push(newsaleAttrValue);
      row.inputVisible = false;
    },

    // 点击添加属性值按钮的回调
    addSaleAttrValue(row) {
      // 挂载在销售属性身上的响应式数据inputVisible,控制着button与input两者的切换
      this.$set(row, "inputVisible", true);

      // 通过响应式数据inputValue字段收集新增的销售属性值
      this.$set(row, "inputValue", "");
    },

    // 点击保存按钮的回调
    async saveOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          id: item.id,
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url,
          spuId: item.spuId,
        };
      });
      // 发请求提交
      let res = await this.$API.spu.reqSaveOrUpdateSpu(this.spu);
      // console.log(res);
      if (res.code == 200) {
        this.$message({ type: "success", message: "保存成功" });
        // 清除数据
        // 清除数据
        Object.assign(this._data, this.$options.data());

        // 回到父组件
        this.$emit("changeScene", {
          scene: 0,
          flag: this.spu.id ? "modify" : "add",
        });
      } else {
        this.$message.error("保存失败");
      }
    },

    // 点击取消按钮的回调
    cancel() {
      // 回到场景1
      this.$emit("changeScene", { scene: 0, flag: "" });

      // 清空数据
      //  清空数据
      Object.assign(this._data, this.$options.data());
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