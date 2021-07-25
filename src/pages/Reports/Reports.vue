<template>
  <div>
    <div class="navigation">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <div ref="myChart" style="width:80%;height:400px" id="myChart"></div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
import _ from 'lodash'
let options = {
  title: {
    text: '用户来源'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#E9EEF3'
      }
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      boundaryGap: false
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ]
}
export default {
  methods: {
    async getChartsData() {
      let result = await this.$API.reqChatedata()

      if (!result) return

      this.option = _.merge(result, options)
    },
    setMyEchart() {
      const myChart = this.$refs.myChart //通过ref获取到DOM节点

      if (myChart) {
        const thisChart = this.$echarts.init(myChart) //利用原型调取Echarts的初始化方法
        //{}内写需要图表的各种配置，可以在官方案例中修改完毕后复制过来
        thisChart.setOption(this.option) //将编写好的配置项挂载到Echarts上

        window.addEventListener('resize', function() {
          thisChart.resize() //页面大小变化后Echarts也更改大小
        })
      }
    }
  },
  mounted() {
    this.getChartsData()
  },
  watch: {
    option() {
      console.log('1')

      this.setMyEchart()
    }
  },
  data() {
    return {
      option: {}
    }
  }
}
</script>

<style lang='less'>
.navigation {
  margin-bottom: 15px;
}
</style>
