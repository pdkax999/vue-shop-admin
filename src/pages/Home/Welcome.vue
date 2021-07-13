<template>
  <div id="welcome">
    <h1>你好,欢迎使用本后台管理系统</h1>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    mounted(){
      console.log('1');
      
    }
  }
</script>

<style lang='less'>
  #welcome{
    width:100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;

    h1{
      font-size: 30px;
      color: black;
    }
  }
</style>
