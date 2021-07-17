<template>
  <div id="users">
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="header">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          clearable
          @clear="getUserList"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
        <el-button type="primary" @click="openDialog('add')">添加用户</el-button>
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
              @change="updataStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="mg_state" label="操作" width="202" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="openDialog('update',scope.row)"
            ></el-button>
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="openDelete(scope.row)"
            ></el-button>
            <el-popover placement="top-start" width="20" trigger="hover" content="分配角色">
              <el-button
                slot="reference"
                size="mini"
                icon="el-icon-setting"
                class="disRig"
                type="warning"
                @click="openAuthorRoleModel(scope.row)"
              ></el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog
      :title="type=='add' ? '添加用户' :'修改用户'"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" :disabled="type=='update'"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
          v-if="type!=='update'"
        >
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="updataUsers">确 定</el-button>
      </div>
    </el-dialog>
    <author-user-role ref="modelRole"></author-user-role>
  </div>
</template>

<script type="text/ecmascript-6">
import AuthorUserRole from '../../components/AuthorUserRole.vue'
export default {
  methods: {
    openAuthorRoleModel(data) {
      this.$refs.modelRole.$emit('getUserInfo', data)
      this.$refs.modelRole.isDisalogVisible()
    },
    async getUserList() {
      const { pagenum, pagesize, query } = this
      let result
      if (!query) {
        result = await this.$API.reqUserList(pagenum, pagesize)
      } else {
        result = await this.$API.reqUserList(pagenum, pagesize, query)
      }
      if (!result) reutrn
      this.userList = result.users
      this.total = result.total
      this.pagenum = result.pagenum
    },
    handleSizeChange(num) {
      this.pagesize = num
      this.getUserList()
    },
    handleCurrentChange(num) {
      this.pagenum = num
      this.getUserList()
    },
    searchUser() {
      if (!this.query) return
      this.getUserList()
    },
    async updataStatus(data) {
      let result = await this.$API.reqUserStatus(data.id, data.mg_state)

      if (!result) return

      data.mg_state = result.mg_state == 0 ? false : true

    },
    handleClose(done) {
      this.$refs.form.resetFields()
      done()
      this.form={
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    },
    updataUsers() {
      //'add' 新增 'update' 修改
      this.$refs.form.validate(async isSuccess => {
        if (!isSuccess) return
        let result

        const { username, password, email, mobile, type } = this.form

        if (type == 'add') {
          result = await this.$API.reqAddUser({
            username,
            password,
            email,
            mobile
          })
        } else {
          if (
            this.validateStore['email'] !== email ||
            this.validateStore['mobile'] !== mobile
          ) {
            // console.log(typeof this.validateStore['id']);
            let id = this.validateStore['id'] * 1

            result = await this.$API.reqAUpdateUserInfo(id, mobile, email)
          }
        }

        this.dialogFormVisible = false
        this.form={
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
        if (!result) return
        this.getUserList()
      })
    },
    //打开修改或者添加用户的对话框
    openDialog(type, data) {
      this.type = type
      if (type == 'update') {
        this.validateStore = {
          mobile: data.mobile,
          email: data.email,
          id: data.id
        }
        this.form.mobile = data.mobile
        this.form.email = data.email
        this.form.username = data.username
      }
      this.dialogFormVisible = true
    },
    openDelete({ id }) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let result = await this.$API.reqDeleteUser(id)

          if (result == null) {
            this.getUserList()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  mounted() {
    this.getUserList()
  },
  components: {
    AuthorUserRole
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        //延迟定时器的作用
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    var validatePhone = (rule, value, callback) => {
      const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/

      if (!this.form.mobile) {
        return callback(new Error('手机不能为空'))
      }
      setTimeout(() => {
        //延迟定时器的作用
        if (phoneReg.test(this.form.mobile)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机格式'))
        }
      }, 100)
    }

    return {
      type: 'add',
      userList: [],
      pagenum: 1,
      pagesize: 2,
      total: 0,
      index: 1,
      query: '',
      //对话框
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '70px',
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }]
      }
    }
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
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    .el-table__body-wrapper {
      overflow: hidden;
    }
    .disRig {
      margin-left: 10px;
    }
    .header {
      height: 40px;
      margin-bottom: 15px;

      .el-input {
        width: 350px;
        margin-right: 15px;
      }
    }
    .el-pagination {
      margin-top: 15px;
    }
  }
}
</style>
