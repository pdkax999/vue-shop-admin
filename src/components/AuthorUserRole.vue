<template>
  <div>
    <el-dialog title="分配角色" :visible.sync="dialogVisible">
      <div class="wrapper_user_info">
        <p>
          <span>当前的用户:</span>
          <span>{{username}}</span>
        </p>
        <p>
          <span>当前的角色:</span>
          <span>{{role_name}}</span>
        </p>
        <p>
          <span>分配新的角色:</span>
          <el-select v-model="rid" placeholder="请选择">
            <el-option
              v-for="(roles,index) in rolseList"
              :key="index"
              :label="roles.roleName"
              :value="roles.id"
            ></el-option>
          </el-select>
        </p>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSomething">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    isDisalogVisible() {
      this.dialogVisible = true
    },
    async getRoleList() {
      let reuslt = await this.$API.reqRoleList()

      if (!reuslt) return

      this.rolseList = reuslt
    },
    async handleSomething() {
      const { rid, id } = this

      let reuslt = await this.$API.reqUpdateUserRole(id, rid)
      if (!reuslt) return

      this.$parent.getUserList()
      this.dialogVisible = false
    }
  },
  data() {
    return {
      dialogVisible: false,
      rolseList: [],
      rid: '',
      id: '',
      role_name: '',
      username: ''
    }
  },
  mounted() {
    this.getRoleList()
    this.$on('getUserInfo', ({ id, username, role_name }) => {
      this.id = id
      this.role_name = role_name
      this.username = username
    })
  }
}
</script>

<style lang='less'>
.wrapper_user_info {
  p {
    margin: 14px 0;

    & > span:first-child {
      margin-right: 10px;
    }
  }
}
</style>
