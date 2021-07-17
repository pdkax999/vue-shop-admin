<template>
  <div id="rights">
    <div class="nav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <el-table :data="rightsList" stripe style="width: 100%" border class="rightsList">
        <el-table-column type="index" label="#" width="47"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag
            :type="btnType[scope.row.level]"  >{{btnText(scope.row.level)}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    async getRightsList() {
      let result = await this.$API.reqRightsList('list')

      if (!result) return

      this.rightsList = result
      console.log(result)
    },
    btnText(flay){
      let result 
      if(flay === '0'){
        result = '一级'
      }else if(flay === '1'){
        result ='二级'
      }else{
        result = '三级'
      }

      return result
    }
  },
  mounted() {
    this.getRightsList()
  },
  data() {
    return {
      rightsList: [],
      btnType:{
        '0':'primary',
        '1':'success',
        '2':'warning'
      }
    }
  }
}
</script>

<style lang='less'>
#rights {
  .nav {
    margin-bottom: 15px;
  }
  .rightsList {
    margin-top: 15px;
  }
}
</style>
