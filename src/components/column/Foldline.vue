<template>
  <div ref="column_con" class="j-percent"></div>
</template>

<script>
export default  {
  props:["foldline"],
  data(){
    return{
      // 雷达图数据
      // Foldline:{
      //   data:[1,2,3,4,5,6,7],
      //   xAxis:['政务', '医疗', '教育', '文体', '民生', '农业', '住房']
      // }
    }
  },
  created(){
    // this.drawChart()
  },
  mounted(){
    this.drawChart(this.foldline)
  },
  methods:{
    drawChart(data){
      // 基于准备好的dom，初始化this.$echarts实例
      let myChart = this.$echarts.init(this.$refs.column_con);

      // 指定图表的配置项和数据
      var opFoldline = new this.$echartsOp.optionFoldline(data); //实例化雷达图对象
      opFoldline.xAxis.data =  data.xAxis
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opFoldline);
    },
    
  }
}
</script>

<style scoped>
  .j-percent{
    position: relative;
  }
</style>