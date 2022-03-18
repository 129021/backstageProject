<template>
  <div id="spu" class="spu">
    <!-- 上部分卡片：三级联动 -->
    <el-card class="card">
      <CategorySelect
        @getCategory="getCategory"
        :show="scene != 0"
      ></CategorySelect>
    </el-card>

    <!-- 下部卡片：三个场景切换 -->
    <el-card class="card">
      <!-- 场景一：spu列表展示(带分页器) scene=0 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          class="button"
          @click="addSpu"
          :disabled="!category3Id"
          >添加SPU</el-button
        >

        <el-table border style="width: 100%" :data="spuList">
          <el-table-column type="index" width="80" label="序号" align="center">
          </el-table-column>
          <el-table-column
            prop="spuName"
            width="width"
            label="spu名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            width="width"
            label="spu描述"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            width="width"
            label="操作"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的sku列表"
                @click="getSkuList(row)"
              >
              </el-button>

              <el-popconfirm
                :title="`确定删除${row.spuName}吗？`"
                @onConfirm="deleteSpu(row)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                  style="margin-left: 10px"
                  title="删除spu"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align: center; margin-top: 20px"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper, ->,sizes,total"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>

      <!-- 场景二：添加/修改spu scene=2 -->
      <!-- SpuForm  -->
      <SpuForm
        v-show="scene == 1"
        ref="spuForm"
        @changeScene="changeScene"
      ></SpuForm>

      <!-- 场景三：添加sku -->
      <!-- SkuForm -->
      <SkuForm v-show="scene == 2" ref="skuForm"></SkuForm>
    </el-card>

    <!-- 点击查看当前spu的sku列表弹出的dialog对话框结构 -->
    <el-dialog
      :title="`${spu.spuName}的sku列表`"
      :visible.sync="dialogTableVisible"
    >
      <el-table :data="skuList" border>
        <el-table-column
          label="名称"
          width="width"
          prop="skuName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="价格"
          width="width"
          prop="price"
          align="center"
        ></el-table-column>
        <el-table-column
          label="重量"
          width="width"
          prop="weight"
          align="center"
        ></el-table-column>
        <el-table-column label="默认图片" width="width" align="center">
          <template slot-scope="{ row, $index }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./spuForm";
import SkuForm from "./skuForm";

export default {
  name: "Spu",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      scene: 0,
      page: 1,
      limit: 3,
      total: 30,
      category3Id: "",
      spuList: [],

      skuList: [],

      // diaglog显示与隐藏
      dialogTableVisible: false,

      // 点击“查看当前spu的sku列表”按钮的spu信息的储存属性
      spu: {},
    };
  },
  methods: {
    // 获取category3Id
    getCategory({ id, level }) {
      if (level == 3) {
        this.category3Id = id;
        // console.log('成功获得3ID');

        this.getSpuList();
      }
    },

    // 获取spuList
    async getSpuList() {
      const { page, limit, category3Id } = this;
      let res = await this.$API.spu.reqSpuList(page, limit, category3Id);
      // console.log(res);
      if (res.code == 200) {
        this.page = res.data.current;
        this.limit = res.data.size;
        this.total = res.data.total;
        this.spuList = res.data.records;
      }
    },

    // 改变每页展示的spu条数的回调
    handleSizeChange(limit) {
      // console.log(limit);
      this.limit = limit;
      this.getSpuList();
    },

    // 点击分页器页码跳转到该页
    handleCurrentChange(page) {
      // console.log(page);
      this.page = page;

      this.getSpuList();
    },

    // 点击“查看当前spu的sku列表”按钮的回调
    async getSkuList(row) {
      this.spu = row;
      this.dialogTableVisible = true;
      // console.log(row);
      let res = await this.$API.spu.reqSkuListBySpuId(row.id);
      // console.log(res);
      if (res.code == 200) {
        this.skuList = res.data;
      }
    },

    // 删除按钮的回调
    async deleteSpu(row) {
      let res = await this.$API.spu.reqDeleteSpu(row.id);
      // console.log(res);
      if (res.code == 200) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList();
      } else {
        this.$message.error("删除失败");
      }
    },

    // 点击添加spu按钮的回调
    addSpu() {
      this.scene = 1;

      // 获取品牌列表
      // 通知子组件点击了“添加spu”按钮
      this.$refs.spuForm.addSpu(this.category3Id);
    },

    // 点击修改spu按钮的回调函数
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spuForm.initSpuForm(row);
    },

    // 点击取消按钮（在状态2）的回调
    changeScene({ scene, flag }) {
      this.scene = scene;
      if (flag == "modify") {
        this.getSpuList(this.page);
      } else {
        this.getSpuList();
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin: 20px;
}
.button {
  margin-bottom: 20px;
}
</style>