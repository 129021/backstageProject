<template>
  <div>
    <el-table style="margin: 20px; width: 100%" border :data="skuList">
      <el-table-column type="index" label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column prop="skuName" label="名称" width="width" align="center">
      </el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="默认图片" width="110" align="center">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80" align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="80" align="center">
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width" align="center">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-top"
            size="mini"
            v-if="row.isSale == 1"
            @click="cancel(row)"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-bottom"
            size="mini"
            @click="onSale(row)"
            v-else
          ></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="$message({type:'info',message:'正在开发中……'})"></el-button>
          <el-button
            type="warning"
            icon="el-icon-info"
            size="mini"
            @click="showDrawer(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteSku(row)"
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
      :current-page="page"
      :page-sizes="[10, 20, 30]"
      :page-size="limit"
      layout=" prev, pager, next, jumper, ->,sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="show" :show-close="false" size="40%">
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{ skuDetail.skuName }}</el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ skuDetail.skuDesc }}</el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{ skuDetail.price }}</el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <template>
            <el-tag
              style="margin-right: 10px"
              type="success"
              v-for="(skuAttr, index) in skuDetail.skuAttrValueList"
              :key="skuAttr.id"
              >{{ skuAttr.attrName }}:{{ skuAttr.valueName }}</el-tag
            >
          </template>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
          <!-- 轮播图 -->
          <el-carousel trigger="click" height="400px" width="400px">
            <el-carousel-item
              v-for="(img, index) in skuDetail.skuImageList"
              :key="img.id"
            >
              <img
                :src="img.imgUrl"
                style="height: 400px; width: 400px"
                alt=""
              />
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
  data() {
    return {
      page: 1,
      limit: 10,
      total: 30,
      sku: {},
      skuList: [],

      // 控制详情抽屉的显示与隐藏
      show: false,

      skuDetail: {},
    };
  },

  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList() {
      let res = await this.$API.sku.reqSku(this.page, this.limit);
      // console.log(res);
      if (res.code == 200) {
        // this.sku = res.data;
        this.total = res.data.total;
        this.limit = res.data.size;
        this.page = res.data.current;
        this.skuList = res.data.records;
      }
    },

    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },

    handleCurrentChange(page) {
      this.page = page;
      this.getSkuList();
    },

    // 点击上架按钮变为下架按钮（状态也变为下架）
    async cancel(row) {
      row.isSale = 0;
      let res = await this.$API.sku.reqCancel(row.id);
      // console.log(res);
      if (res.code == 200) {
        this.$message({ type: "success", message: "下架成功" });
      }
    },

    // 点击下架按钮变为上架按钮（状态变为上架）
    async onSale(row) {
      row.isSale = 1;
      let res = await this.$API.sku.reqSale(row.id);
      if (res.code == 200) {
        this.$message({ type: "success", message: "上架成功" });
      }
    },

    // 点击详情按钮的回调
    async showDrawer(row) {
      this.show = true;

      let res = await this.$API.sku.reqSkuById(row.id);
      if (res.code == 200) {
        this.skuDetail = res.data;
      }
    },

    // 点击删除按钮删除sku
    deleteSku(row) {
      this.$confirm(`确定删除${row.skuName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$API.sku.reqDeleteSku(row.id);

          console.log(res);

          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getSkuList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
</style>