<template>
  <div ref="column_con" class="j-percent"></div>
</template>

<script>
export default  {
  props:["funnel"],
  data(){
    return{
      // 漏斗图数据 数据格式
      // funnel:{
      //   data:[
      //     {value: 80, name: '已征集建议',val:10000},
      //     {value: 60, name: '有效建议',val:8000},
      //     {value: 40, name: '解答解释',val:6000},
      //     {value: 20, name: '立项督办',val:4000}
      //   ],
      // }
    }
  },
  created(){
  },
  mounted(){
    this.drawChart(this.funnel)
  },
  methods:{
   
    drawChart(data){
      // 基于准备好的dom，初始化this.$echarts实例
      let myChart = this.$echarts.init(this.$refs.column_con);

      // 指定图表的配置项和数据
      var opFunnel = new this.$echartsOp.optionFunnel(data);   //实例化漏斗图对象

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opFunnel);

      window.addEventListener("resize",()=>{
        myChart.resize();
      })
    }
  },
  
  watch:{
    // 监听父组件传值
    // funnel:{
    //   handler(newVal,oldVal){
    //     console.log("funnel",newVal)
    //     this.drawChart(newVal)
    //   },
    //   deep: true
    // }
  }
}
</script>

<style scoped>
</style>