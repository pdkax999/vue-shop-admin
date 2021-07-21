<template>
  <div id="params">
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-row>
        <el-col :span="24">
          <el-alert show-icon title="只允许为第三级分类设置相关参数！" type="warning"></el-alert>
        </el-col>
        <el-col>
          <span class="cate_text">选择商品分类:</span>
          <el-cascader
            ref="cascader"
            v-model="value"
            clearable
            :style="{winth:'40%'}"
            :options="categoryList"
            :props="{ expandTrigger: 'hover',label:`cat_name`,value: 'cat_id'}"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态属性" name="many" >
          <params-detail text="参数" :tableData="manyData" attr_sel="many" :id="value[value.length-1]" 
          :getParams="getParams"/>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <params-detail text="属性" :tableData="onlyData" attr_sel="only" :id="value[value.length-1]"
          :getParams="getParams"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script type="text/ecmascript-6">
import myminx from '../../assets/minx/common'
import ParamsDetail from '../../components/ParamsDetail.vue'
export default {
  mixins: [myminx],
  created() {
    this.getCategoryList(true)
  },
  methods: {
    handleChange() {
      this.getParams()
    },
    handleClick(tab, event) {
     
    },
    async getParams() {
      const { value, activeName } = this
      let reslut = await this.$API.reqParamsList(value[value.length - 1], [
        activeName
      ])
      if (!reslut) return

      if (activeName == 'many') {

        this.manyData = this.produceNewDate(reslut)
      } else {
        this.onlyData =this.produceNewDate(reslut)
      }
    },
    produceNewDate(data){
     
   return   this.tableData=data.map((info)=>{
         info.inputVisible=false
        return info
      })
      
      
    }
  },
  data() {
    return {
      categoryList: [],
      value: [],
      activeName: 'many',
      onlyData: [], //动态属性数据
      manyData: [] // 静态属性数据
    }
  },
  components: {
    ParamsDetail
  },
  watch: {
    activeName() {
      
      if(this.value.length>0){
         this.getParams()
      }

    }
  }
}
</script>

<style lang='less'>
#params {
  .navigation,
  .el-alert {
    margin-bottom: 15px;
  }
  .cate_text {
    margin-right: 10px;
  }
}
</style>
