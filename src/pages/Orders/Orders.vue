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
            v-model="query"
            class="input-with-select"
            :style="{width:'30%'}"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="searchOrder"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" stripe style="width: 100%" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="250"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="{row}">
            <el-tag type="danger" v-if="row.pay_status==0">未付款</el-tag>
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="商品重量">
          <template slot-scope="{row}">
            <span v-if="row.pay_status==0">未发货</span>
            <span v-else>已发货</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="160">
          <template slot-scope="{row}">{{$dayjs(row.create_time).format('YYYY MM-DD HH:mm:ss')}}</template>
        </el-table-column>
        <el-table-column width="180">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button icon="el-icon-location-outline" size="mini" type="success"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5,10, 15]"
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
      query: '',
      orderList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0
      
    }
  },
  methods: {


    async getOrders() {
      const { pagenum, pagesize, query } = this
      let result = await this.$API.reqOrderList(pagenum, pagesize, query)

      if (!result) reutrn

      console.log(result)

      this.total = result.total
      this.orderList = result.goods
    },
    handleCurrentChange(pagenum) {
      this.pagenum = pagenum
      this.getOrders()
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize
      this.getOrders()
    },
    searchOrder() {
      this.getOrders()
    }
    // async get(){

    //   let reslut = await this.$API.reqAddressInfo()
    //   console.log(reslut);

    // }
  },
  created() {
    // this.get()
    this.getOrders()
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