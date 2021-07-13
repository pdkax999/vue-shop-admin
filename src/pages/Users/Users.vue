<template>
  <div id="users">
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="header">
        <el-input placeholder="请输入内容" v-model="keyWord" class="input-with-select" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary">
          添加用户
        </el-button>
      </div>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop type="index" label="#" width="47" align="center"></el-table-column>
        <el-table-column prop="username" label="姓名" width="70" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="170" align="center"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="170" align="center"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="170" align="center"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="170" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#DCDFE6"
              @change="change(scope)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="操作" width="202" align="center">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button icon="el-icon-delete" size="mini" type="danger"></el-button>
          <el-popover placement="top-start" width="20" trigger="hover" content="分配角色">
            <el-button
              slot="reference"
              size="mini"
              icon="el-icon-setting"
              class="disRig"
              type="warning"
            ></el-button>
          </el-popover>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      userList: [],
      pagenum: 1,
      pagesize: 2,
      total: 0,
      index: 1,
      keyWord:''

    }
  },
  methods: {
    async getUserList() {
      const { pagenum, pagesize } = this

      let result = await this.$API.reqUserList(pagenum, pagesize)

      if (!result) reutrn
      this.userList = result.users
      this.total = result.total
      this.pagenum = result.pagenum
    },
    handleSizeChange(num){
      
      this.pagesize=num;
      this.getUserList()
      
    },
    handleCurrentChange(){


    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>

<style lang='less'>
#users {
  .navigation {
    width: 100%;
    margin-bottom: 15px;
  }
  .container {
    // height: 258px;
   
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    .el-table__body-wrapper {
      overflow: hidden;
    }
    .disRig {
      margin-left: 10px;
    }
    .header{
      height: 40px;
      margin-bottom: 15px;

      .el-input{
        width: 350px;
        margin-right: 15px;
      }
    }
    .el-pagination{
      margin-top: 15px;
    }
  }
}
</style>
