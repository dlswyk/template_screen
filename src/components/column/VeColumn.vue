<template>
  <div ref="column_con" class="j-percent"></div>
</template>

<script>
export default  {
  props:["vecolumn"],
  data(){
    return{
      // 垂直柱状图
      VeColumn:{
        data:{
          name:["群众","团员","1","党员"],
          value:[5817,260,34,3450]
        },
        color:[
          new this.$echarts.graphic.LinearGradient(1, 0, 0, 0,[{offset: 0, color: "rgba(32,142,181,1)"},{offset:1, color: "rgba(32,142,181,.05)"}]),
        ],
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
      let myChart = this.$echarts.init(this.$refs.column_con);
      // 指定图表的配置项和数据
      var opVeColumn = new this.$echartsOp.optionVeColumn(this.VeColumn);
      opVeColumn.xAxis.show = false;
      opVeColumn.yAxis.show = false;
      opVeColumn.grid = {
        top:'10',
        left: '0',
        height:'100%',
        width:'80%'
      },  
      // opVeColumn.series[0].barWidth = '70%';
      opVeColumn.series[0].label = {
        show: true,
        position:'center',
        borderRadius:8,
        color:"#fff",
        fontSize:16,
        padding:5,
        formatter:function(el){
          return el.name +' '+ el.value;
        },
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opVeColumn,myChart);
      
      window.addEventListener("resize",()=>{
        myChart.resize();
      })
    }
  },
  watch:{
    // 监听父组件传值
    vecolumn:{
      handler(newVal,oldVal){
        this.VeColumn.data = newVal.data;
        this.drawChart(this.VeColumn)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .j-percent{
    position: relative;
  }
  .column-box{
    flex:1;
    display:flex;
    color:#fff;
  }
  .column-table{
    width:50%;
    border:1px solid #3859ff;
  }
  .column-header{
    padding:1rem 0 0 1.5rem;
    font-size: 1rem;
    color:#fff;
    text-shadow: 0 0 20px #386e79;
  }
</style>