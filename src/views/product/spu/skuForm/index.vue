<template>
  <div id="skuForm" class="skuForm">
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>

      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price"></el-input>
      </el-form-item>

      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            :label="attr.attrName"
            v-for="(attr, index) in skuAttrValueList"
            :key="attr.id"
            style="margin-bottom: 10px"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item
            :label="saleAttr.saleAttrName"
            v-for="(saleAttr, index) in skuSaleAttrValueList"
            :key="saleAttr.id"
          >
            <el-select
              placeholder="请选择"
              style="margin-bottom: 10px"
              v-model="saleAttr.attrIdAndValueId"
            >
              <el-option
                :label="attrValue.saleAttrValueName"
                :value="`${saleAttr.id}:${attrValue.id}`"
                v-for="(attrValue, index) in saleAttr.spuSaleAttrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table
          border
          style="width: 100%"
          :data="skuImageList"
          ref="multipleTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80" align="center">
          </el-table-column>

          <el-table-column
            prop="prop"
            label="图片"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <img
                :src="row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="imgName"
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
              <el-button
                type="primary"
                @click="defaultImg(row)"
                v-if="row.isDefault == 0"
                >设为默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveSku">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spu: {},

      // 收集与展示数据
      skuInfo: {
        // 第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类数据是要通过数据双向绑定v-model进行收集的
        skuName: "",
        price: 0,
        weight: "",
        skuDesc: "",

        // 第三类数据是需要自己书写代码的
        // 默认图片
        skuDefaultImg: "",
        // 收集图片的字段
        skuImageList: [
          {
            // id: 0,
            imgName: "string",
            imgUrl: "string",
            isDefault: "string",
            // skuId: 0,
            spuImgId: 0,
          },
        ],
        // 平台属性列表的数据
        // 这里只需收集两个id，即：attrId和valueId
        skuAttrValueList: [
          {
            attrId: 0,
            valueId: 0,
          },
        ],

        // 收集的是销售属性列表数据
        skuSaleAttrValueList: [
          {
            // id: 0,
            saleAttrId: 0,
            // saleAttrName: "",
            saleAttrValueId: 0,
            // saleAttrValueName: "",
            // skuId: 0,
            // spuId: 0,
          },
        ],
      },

      // 收集图片的属性（还没传给skuInfo的skuImageList）
      skuImageList: [],

      // 销售属性
      skuSaleAttrValueList: [],

      // 平台属性
      skuAttrValueList: [],

      // 暂时存放平台属性id和属性值id的地方
      attrIdAndValueId: "",

      // 存放选择的图片
      imgList: [],
    };
  },
  methods: {
    async addSku(category1Id, category2Id, row) {
      // console.log(category1Id);
      // console.log(category2Id);
      // console.log('成功在状态一调了状态三的方法');
      // console.log(row);
      // 将spu的信息保留下来
      this.spu = row;

      // 将父组件传过来的数据保存到spuInfo里
      // 收集父组件给的数据
      this.skuInfo.category3Id = row.category3Id;
      this.skuInfo.spuId = row.id;
      this.skuInfo.tmId = row.tmId;

      // 获取图片
      let imgRes = await this.$API.spu.reqSkuImageList(row.id);
      // console.log(imgRes);
      if (imgRes.code == 200) {
        let arr = imgRes.data;

        // 给每个图片加上isDefault属性
        arr.forEach((item) => {
          item.isDefault = 0;
        });

        this.skuImageList = arr;
      }

      // 获取销售属性

      let saleAttrRes = await this.$API.spu.reqSpuSaleAttrList(row.id);
      console.log(saleAttrRes);
      if (saleAttrRes.code == 200) {
        this.skuSaleAttrValueList = saleAttrRes.data;
      }

      // 获取平台属性
      let attrRes = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        row.category3Id
      );
      // console.log(attrRes);
      if (attrRes.code == 200) {
        this.skuAttrValueList = attrRes.data;
      }
    },

    // 设为默认图片按钮的回调
    defaultImg(row) {
      this.skuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.$refs.multipleTable.toggleRowSelection(row);
    },

    // 图片选择框的回调
    handleSelectionChange(params) {
      console.log(params);
      this.imgList = params;
    },

    // 保存按钮的回调
    async saveSku() {
      // 整理数据
      // 图片数据的整理
      this.skuInfo.skuImageList = this.imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,

          spuImgId: item.spuId,
        };
      });

      this.skuInfo.skuAttrValueList = this.skuAttrValueList.reduce(
        (prev, item) => {
          if (item.attrIdAndValueId) {
            const [attrId, valueId] = item.attrIdAndValueId.split(":");
            prev.push({ attrId, valueId });
          }
          return prev;
        },
        []
      );

      //  整理销售属性
      this.skuInfo.skuSaleAttrValueList = this.skuSaleAttrValueList.reduce(
        (prev, item) => {
          if (item.attrIdAndValueId) {
            const [saleAttrId, saleAttrValueId] =
              item.attrIdAndValueId.split(":");
            prev.push({ saleAttrId, saleAttrValueId });
          }
          return prev;
        },
        []
      );

      // 发请求
      let res = await this.$API.spu.reqAddSku(this.skuInfo);
      console.log(res);
      if (res.code == 200) {
        this.$message({ type: "success", message: "保存成功" });

        this.$emit("changeScene", { scene: 0, flag: "" });

        //  清空数据
        Object.assign(this._data, this.$options.data());
      } else {
        this.$message.error("保存失败");
      }
    },

    // 取消按钮的回调

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

<style>
</style>