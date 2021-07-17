<template>
  <div class="roles">
    <div class="navHead">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <div class="add">
        <el-button type="primary">添加角色</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(dataFirst,index) in scope.row.children"
              :key="dataFirst.id"
              :class="{'bbot':true,'btop':index==0}"
            >
              <el-col :span="5">
                <el-tag
                  :disable-transitions="false"
                  closable
                  @close="removeRoleLimits(scope.row,dataFirst)"
                >{{dataFirst.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>

              <el-col :span="19">
                <el-row
                  v-for="(dataSecond,i) in dataFirst.children"
                  :key="dataSecond.id"
                  :class="{'bbot':i+1 !=dataFirst.children.length}"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRoleLimits(scope.row,dataSecond)"
                    >{{dataSecond.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      @close="removeRoleLimits(scope.row,dataLast,dataSecond)"
                      type="warning"
                      closable
                      v-for="dataLast in dataSecond.children"
                      :key="dataLast.children"
                    >{{dataLast.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" align="center"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button icon="el-icon-delete" size="mini" type="danger">删除</el-button>
            <el-button
              icon="el-icon-setting"
              size="mini"
              type="warning"
              @click="openRigthsModel(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="'分配权限'" :visible.sync="dialogFormVisible">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checked"
        :props="defaultProps"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible=false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checked: [101]
    }
  },
  methods: {
    async getRolesList() {
      let result = await this.$API.reqRolesList()

      if (!result) return

      this.tableData = result
    },
    async removeRoleLimits(data, rightId, arrWrap) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async a => {
          let reslut = await this.$API.reqDeleteRoleAuth(data.id, rightId.id)
          if (!reslut) return

          data.children = reslut

          //  arrWrap.children.splice( arrWrap.children.indexOf(rightId),1);
        })
        .catch(a => {
          console.log(a)

          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //获取权限数据
    async getRights() {
      let reslut = await this.$API.reqRightsList('tree')

      if (!reslut) return

      this.data = reslut
    },
    openRigthsModel(data) {
      this.getRights()

      // this.checked = this.getPichRigths(data.children).flat(Infinity)

      this.dialogFormVisible = true
    },
    getPichRigths(data) {
      let reslut = []

      data.forEach(itme1 => {
        reslut.push(itme1.id)

        if (itme1.children) {
          let val = this.getPichRigths(itme1.children)

          reslut.push(val)
        }
      })

      return reslut
    }
  },
  created() {
    this.getRolesList()
  }
}
</script>

<style lang='less'>
.roles {
  .navHead {
    margin-bottom: 15px;
  }
  .add {
    margin-bottom: 15px;
  }

  .btop {
    border-top: 1px solid #eeeeee;
  }

  .bbot {
    border-bottom: 1px solid #eeeeee;
  }

  .el-tag {
    margin: 7px;
  }
  .el-row {
    display: flex;
    align-items: center;
  }
}
</style>
