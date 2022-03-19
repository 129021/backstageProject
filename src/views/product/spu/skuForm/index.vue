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
          <el-form-item label="label">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>

   
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item label="label">
            <el-select placeholder="请选择" value="">
              <el-option label="label" value="value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table border style="width: 100%">
          <el-table-column type="selection" width="80" align="center">
          </el-table-column>

          <el-table-column
            prop="prop"
            label="图片"
            width="width"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <img src="" alt="" />
            </template>
          </el-table-column>

          <el-table-column
            prop="prop"
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
              <el-button type="primary">设为默认</el-button>
              <el-button>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
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
      // console.log(saleAttrRes);
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
  },
};
</script>

<style>
</style>