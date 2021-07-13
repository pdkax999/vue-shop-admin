<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="shop-info">
          <img src="../Login/img/head.jpg" alt />
          <h2>电商后台管理系统</h2>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="!iscollapse ? ' 200px' : '64px'">
          <div class="switch"><i  :class="'el-icon-share'" @click="toggleCollapse"></i></div>
          <nav-left :iscollapse="iscollapse"></nav-left>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import NavLeft from "../../components/NavLeft.vue";
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    },
    toggleCollapse(){
      this.iscollapse = !this.iscollapse
    }
  },
  components:{
    NavLeft
  },
  data(){
    return {
      iscollapse:false,
      
    }
  }
}
</script>

<style lang='less'>
.home {
  width: 100%;
  height: 100%;
  .switch{
    height: 24px;
    i{
      line-height: 24px;
      cursor:pointer;
    }
  }
  .el-menu{
    border-right:none ;
  }
}

.el-header {
  width: 100%;
  background-color: #373d41;
  color: #fff;
  line-height: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .shop-info {
    display: flex;
  }
  img {
    width: 61px;
    height: 56px;
    margin-right: 20px;
  }
  .el-button {
    height: 66%;
  }
}

.el-container {
  height: 100%;
}

.el-aside {
  background-color: #333744;
  color: #fff;
  text-align: center;
  height: 100%;
  overflow: hidden;
}

.el-main {
  color: #fff;
  background-color: #EAEDF1;
}

</style>
