<template>
  <div class="attr">
    <!-- 三级联动所在卡片 -->
    <el-card class="card">
      <CategorySelect @getCategory="getCategory" :show="!scene"></CategorySelect>
    </el-card>

    <!-- 下部表格所在卡片 -->
    <el-card class="card">
      <!-- 下部卡片第一个状态：平台属性列表展示 -->
      <div v-show="scene">
        <!-- 添加按钮 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addHandler"
          >添加</el-button
        >

        <!-- 表格 -->
        <el-table
          border
          style="width: 100%; margin-top: 20px"
          :data="attrInfoList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>

          <el-table-column
            prop="attrName"
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
              <el-tag
                type="success"
                v-for="(value, index) in row.attrValueList"
                :key="value.id"
                style="margin: 0 10px"
                >{{ value.valueName }}</el-tag
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
                type="warning"
                size="mini"
                icon="el-icon-edit"
                @click="updateHandler(row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="remove(row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 下部卡片第二个状态：添加属性form -->
      <div v-show="!scene">
        <el-form ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="scene = false">取消</el-button>

        <el-table
          border
          style="width: 100%; margin: 20px 0"
          :data="attrInfo.attrValueList"
        >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>

          <el-table-column label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里有两种状态：输入状态和显示状态 input为输入状态，span为展示状态-->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                :ref="$index"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>

              <span
                style="display: block"
                v-else
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <!-- 保存和取消按钮 -->
        <el-button
          type="primary"
          @click="addOrUpdateAttr"
          :disabled="attrInfo.attrValueList.length < 1"
          >保存</el-button
        >
        <el-button @click="scene = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "Attr",
  data() {
    return {
      scene: true,

      // 三级分类列表的id
      category1Id: "",
      category2Id: "",
      category3Id: "",

      attrInfoList: [],

      // 收集新增属性/修改属性
      attrInfo: {
        // 属性名
        attrName: "",

        // 属性值，每一个属性值都是一个对象，需要两个字段：attrId、valueName
        attrValueList: [],

        categoryId: 0,
        categoryLevel: 3,
      },

      // 控制span和input的显示隐藏
      // flag: true,
    };
  },

  methods: {
    // 获取三级联动数据
    // 这里的两个参数一定要加大括号
    getCategory({ id, level }) {
      if (level == 1) {
        this.category1Id = id;
      } else if (level == 2) {
        this.category2Id = id;
      } else {
        this.category3Id = id;

        // 第三个id已经拿到，代表三个id都已经拿到，这个时候可以获取attrInfoList了
        this.getAttrInfoList();
      }
    },

    // 拿到三个id，获取attrInfoList
    async getAttrInfoList() {
      const { category1Id, category2Id, category3Id } = this;
      let res = await this.$API.attr.reqAttrInfoList(
        category1Id,
        category2Id,
        category3Id
      );

      console.log(res);
      if (res.code == 200) {
        this.attrInfoList = res.data;
      }
    },

    // 删除按钮的回调(实际上后端不允许删除)
    remove(row) {
      //  console.log(row);
      // let res = await this.$API.attr.reqRemoveAttr(row.id);
      this.$confirm(`确定删除${row.attrName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$API.attr.reqRemoveAttr(row.id);

          console.log(res);

          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getAttrInfoList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 点击添加按钮的回调
    addHandler() {
      // 重置attrInfo
      this.attrInfo = {
        // 属性名
        attrName: "",

        // 属性值，每一个属性值都是一个对象，需要两个字段：attrId、valueName
        attrValueList: [],

        categoryId: this.category3Id,
        categoryLevel: 3,
      };
      this.scene = false;
    },

    // 点击修改按钮的回调
    updateHandler(row) {
      this.scene = false;
      // console.log(row);
      // this.attrInfo.attrName = row.attrName;
      // this.attrInfo.attrValueList = row.attrValueList;
      // this.attrInfo.categoryId = row.categoryId;
      // this.attrInfo.id = row.id;

      // 由于数据结构当中存在对象里面套数组，数组里面又套对象，因此需要深拷贝解决这类问题
      this.attrInfo = cloneDeep(row);

      // 在修改某一个属性的时候，将响应的属性值添加上flag这个标记，以方便后续实现编辑模式和查看模式的切换
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样书写也可以给属性值添加flag字段，但是发现视图不会跟着变化，这是因为flag不是响应式数据。所以这里不应该这么写：
        // item.flag=false;

        // vue 无法探测普通的新增的property，这样书写的属性并非响应式属性

        // $set:第一个参数：对象 ；第二个参数：添加的新的响应式属性 ；第三个参数：添加的新的响应式属性的属性值
        this.$set(item, "flag", false);
      });
    },

    // 点击span切换为input
    toEdit(row, index) {
      row.flag = true;

      // 自动聚焦
      this.$nextTick(() => {
        // 获取相应的input表单元素实现聚焦
        this.$refs[index].focus();
      });
    },

    // 删除某个属性值的回调
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },

    // TODO:这里不会，还得继续看
    // input失去焦点的回调，从input切换为span
    // 失去焦点的事件回调：将编辑模式切换为查看模式，展示span
    toLook(row) {
      // row这个形参时当前用户添加的最新的属性值
      // 这里需要对用户输入的属性值进行判断，以过滤空格等无效的属性值，可以给用户提示，让其输入一个有效的属性值

      // 如果输入属性值为空，不通过，提示信息
      if (row.valueName.trim() == "") {
        this.$message(" 输入的属性值不能为空");
        return;
      }

      // 新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // 需要将row从数组里面判断的时候去除
        // row是最新新增的属性值（是数组的最后一项元素）
        // 判断的时候需要将已有的数组（item）当中新增的这个属性值（row）去掉，这里的意思是不能拿自己和自己比
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });

      if (isRepat) {
        this.$message("不能输入重复的属性值");
        return;
      }

      row.flag = false;
    },

    // 添加属性值按钮的回调
    addAttrValue() {
      this.scene = false;

      this.attrInfo.attrValueList.push({
        // attrId是相应属性的id，目前是添加属性的操作，还没有相应的属性id，所以带给服务器的id初始化为undefined
        // valueName是相应的属性值的名称

        // 对于修改某一个属性的时候，可以在已有的属性值的基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上）
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      // 添加属性值，焦点自动聚焦
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },

    // 保存按钮的回调
    async addOrUpdateAttr() {
      // 整理参数
      // 1.属性值为空的不应该提交给服务器
      // 2. 提交给服务器的数据当中不应该出现flag字段
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          //过滤掉属性值不为空的
          if (item.valueName != "") {
            // 删除掉flag属性
            delete item.flag;
            return true;
          }
        }
      );

      // 发请求
      let res = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
      // console.log(res);
      if (res.code == 200) {
        this.scene = true;
        this.$message({ type: "success", message: "保存成功" });

        // 重新获取attrInfoList以展示
        this.getAttrInfoList();
      } else {
        this.$message.error("保存失败");
      }
    },
  },
};
</script>

<style scoped>
.card {
  margin: 20px;
}
</style>