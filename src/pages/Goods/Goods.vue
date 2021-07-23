<template>
  <div id="goods">
   
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-row>
        <el-col>
          <el-input
            placeholder="请输入内容"
            v-model="keyword"
            class="input-with-select"
            :style="{width:'30%'}"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button class="btn" type="primary" @click="$router.push('/goods/add')">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodsList" stripe style="width: 100%" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="70"></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="160">
          <template slot-scope="{row}">{{$dayjs(row.add_time).format('YYYY MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column width="180">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5,10, 15, 20]"
        :page-size="pagesize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
   
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      keyword: '',
      goodsList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0
    }
  },
  methods: {
    async getGoods() {
      const { pagenum, pagesize, keyword } = this
      let result = await this.$API.reqGoodsList(pagenum, pagesize, keyword)

      if (!result) reutrn

      console.log(result)

      this.total = result.total
      this.goodsList = result.goods
    },
    handleCurrentChange(pagenum) {
      this.pagenum = pagenum
      this.getGoods()
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize
      this.getGoods()
    }
  },
  created() {
    this.getGoods()
  }
}
</script>

<style lang='less'>
#goods {
  .navigation {
    margin-bottom: 15px;
  }
  .btn {
    transform: translateX(15px);
  }
  .el-table {
    margin: 15px 0 30px 0;
  }
}

.cell {
  font-weight: 0 !important;
}

.el-pagination {
  transform: translateY(-20px) !important;
  padding: 20px 0 !important;
}
</style>
