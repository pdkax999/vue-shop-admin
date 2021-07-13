<template>
  <div id="menuList">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      :unique-opened="true"
      :collapse="iscollapse"
      :default-active="avtiveId"
    >
      <el-submenu :index="menu.id+''" v-for="(menu) in powerList" :key="menu.id">
        <template slot="title">
          <i :class="`iconfont icon-${menu.icon}`"></i>
          <span class="left">{{menu.authName}}</span>
        </template>
        <el-menu-item
          :index="MenuChil.id+''"
          v-for="(MenuChil) in menu.children"
          :key="MenuChil.id"
          @click="$router.push(MenuChil.path)"
        >
          <span slot="title">{{MenuChil.authName}}</span>
          <i class="el-icon-menu"></i>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    async getMenu() {
      const result = await this.$API.reqMenuList()
      if (!result) return

      this.getIcon(result)
    },
    getIcon(data) {
      let iconStr = ['user', 'tijikongjian', 'shangpin', 'danju', 'baobiao']

      this.powerList = data.map((menu, index) => {
        //注意
        menu['icon'] = iconStr[index]

        return menu
      })
    },
    initActive() {
      const { powerList } = this
      let result
      for (let i = 0; i < powerList.length; i++) {
        result = powerList[i].children.find(menuChild => {
          return this.$route.path.indexOf(menuChild.path) !== -1
        })

        if (result) {
         

          this.avtiveId = result.id + ''
          return
        }
      }
    }
  },
  mounted() {
    this.getMenu()
  },
  data() {
    return {
      powerList: [], //利用对象保存icon图标导航唯一标识为key在遍历生成图标
      avtiveId: ''
    }
  },
  props: {
    iscollapse: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    powerList() {
      this.initActive()
    }
  }
}
</script>

<style lang='less'>
#menuList {
  overflow: hidden;

  .el-submenu {
    .iconfont {
      margin-right: 10px;
      float: left;
    }
    span.left {
      float: left;
    }
  }
}
</style>
