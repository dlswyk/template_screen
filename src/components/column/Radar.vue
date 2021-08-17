<template>
  <div ref="column_con" class="j-percent"></div>
</template>

<script>
export default  {
  props:["radar"],
  data(){
    return{
      // 雷达图数据
      // radar:{
      //   indicator:[
      //     {name: '完成度评价', max: 100,color:"#3c9aff"},
      //     {name: '观察员评价', max: 100,color:"#3c9aff"},
      //     {name: '评价维度3', max: 100,color:"#3c9aff"},
      //     {name: '评价维度4', max: 100,color:"#3c9aff"},
      //     {name: '评价维度5', max: 100,color:"#3c9aff"},
      //   ],
      //   data:[{value:[85, 77, 90, 50,50]}],
        
      // }
    }
  },
  created(){
    // this.drawChart()
  },
  mounted(){
    this.drawChart(this.radar)
  },
  methods:{
   
    drawChart(data){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.column_con);
      // 指定图表的配置项和数据
      var opRadar = new optionRadar(data); //实例化雷达图对象
      opRadar.radar[0].shape  = "polygon";
      // opRadar.radar[0].splitArea.areaStyle.color =["rgba(69,98,142,0.9)","rgba(69,98,142,0.7)","rgba(69,98,142,0.6)","rgba(69,98,142,0.5)","rgba(69,98,142,0.3)"] ;
      opRadar.radar[0].startAngle  = 90;
      opRadar.radar[0].center  = ["50%","55%"];
      opRadar.radar[0].radius  = '70%';
      opRadar.series[0].areaStyle  = {color:"rgba(0,0,0,0)"};
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opRadar);


      window.addEventListener("resize",()=>{
        myChart.resize();
      })
    }
  },
  watch:{
    // 监听父组件传值
    // radar:{
    //   handler(newVal,oldVal){
    //     console.log("radar",newVal)
    //     this.drawChart(newVal)
    //   },
    //   deep: true
    // }
  }
}
</script>

<style scoped>
  .column-mune{
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    color: #8194c5;
  }
  .radar-legend-item > div:nth-child(1){
    width: 2rem;
    height: 1rem;
    border-radius: 5px;
    margin-right:.5rem;
  }
</style>