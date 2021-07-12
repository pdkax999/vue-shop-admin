<template>
  <div id="login">
    <div class="gotoLogin">
      <div class="head">
        <img src="./img/head.jpg" alt />
      </div>
      <div id="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username"  prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password"  type="password"  prefix-icon="iconfont icon-3702mima"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button @click="resetForm('ruleForm')" type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
         password:[
           {required: true, message: '请输入登录密码', trigger: 'blur'},
           { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
         ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate( async valid => {
        if (!valid) return 

        const {username,password} = this.ruleForm
         
        const result = await this.$API.reqPwdLogin(username,password)

        if(!result) return  

        window.sessionStorage.setItem('token_key',result.token)
        
        this.$router.replace('/home');
        
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='less'>
#login {
  width: 100%;
  height: 100%;
  background-color: pink;
  position: relative;

  .gotoLogin {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 3px;
  }

  .head {
    width: 152px;
    height: 152px;
    border-radius: 50%;
    background-color: #fff;
    margin: 0 auto;
    transform: translateY(-50%);
    box-shadow: 0 0 10px #ff6700;
    position: relative;

    img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: auto;
    }
  }

  #form {
    width: 100%;
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 20px;

    .el-form-item__content{
      text-align: right;
    }
  }
}
</style>
