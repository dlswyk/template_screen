<template>
  <div ref="column_con" class="j-percent"></div>
</template>

<script>
export default  {
  props:["stackcolumn"],
  data(){
    return{
      // 叠堆柱状图数据
      StackColumn:{
        data:[{
            name: '中央、国务院及其办公厅批复试点',
            value: [20, 32, 9]
          },{
            name: '国家有关部委批复试点',
            value: [22, 25, 19]
          },{
            name: '省委、政府及其办公厅',
            value: [20, 32, 9]
          },{
            name: '省人大常委会办公厅批复的试点',
            value: [10, 12, 21]
          }
        ],
        color:[
          new this.$echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#53a6ff'},{ offset: 1,color: '#0f83fe'}]),
          new this.$echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#acf7f4'},{ offset: 1,color: '#4ef1eb'}]),
          new this.$echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#d695ff'},{ offset: 1,color: '#b640ff'}]),
          new this.$echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#EE5A24'},{ offset: 1,color: '#EA2027'}])
        ]
      }
    }
  },
  created(){
    // this.drawChart()
  },
  mounted(){
    this.drawChart()
  },
  methods:{
   
    drawChart(){
      // 基于准备好的dom，初始化this.$echarts实例
      // 基于准备好的dom，初始化this.$echarts实例
      let myChart = this.$echarts.init(this.$refs.column_con);
      // 指定图表的配置项和数据
      var opStackColumn = new this.$echartsOp.optionStackColumn(this.StackColumn); //实例化雷达图对象

      opStackColumn.xAxis.data = ["共计","代办","进行中"]
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opStackColumn);
    }
  }
}
</script>

<style scoped>
  .j-percent{
    position: relative;
  }
</style>