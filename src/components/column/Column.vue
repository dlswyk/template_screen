<template>
  <div ref="column_con" class="j-percent"></div>

</template>

<script>
export default  {
  props:["column"],
  data(){
    return{
      currentIndex:0,
      // 柱状图
      // oVeColumn:{
      //   data:{
      //     name:["3千以下","3千~5千","5千~7千","7千~9千","9千~1万","1万以上"],
      //     value:[5406,2525,1750,3007,988,680],
      //   },

      //   color:[
      //     new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(41,158,201,1)"},{offset:1, color: "rgba(41,158,201,.05)"}])
      //   ],
      // }
    }
  },
  created(){
  },
  mounted(){
    this.drawChart(this.column)
  },
  methods:{
    drawChart(data){
      let myChart = echarts.init(this.$refs.column_con);
      // 指定图表的配置项和数据
      var opColumn = new optionColumn(data); 

      opColumn.yAxis[0].axisLine.lineStyle.color = '#1a518e';
      opColumn.yAxis[0].axisLabel.color = "#E3AB3B";
      opColumn.yAxis[0].name = "热度";
      opColumn.series[0].barWidth = "65%";
      // 最小工资
      // opColumn.yAxis[0].min = 1000;

      opColumn.xAxis[0].axisLine.lineStyle.color = 'rgba(15,51,80,.8)';
      opColumn.grid = {
        top:'15%',
        left: '5%',
        containLabel: true,
        height:'80%',
        width:'90%'
      },
      opColumn.series[0].label = {
        show: true,
        position:'top',
        borderRadius:8,
        color:"#fff",
        fontSize:16,
      }
      

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opColumn);

      window.addEventListener("resize",()=>{
        myChart.resize();
      })


      this.dispatchAction(myChart);

      setInterval(() => {
        if(this.currentIndex == data.data.name.length){
          this.currentIndex = 0;
        }
        this.dispatchAction(myChart);
      }, 5000);
    },

    dispatchAction(myChart){
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: this.currentIndex
      })
      this.currentIndex++;
    }
     
  }
}
</script>

<style scoped>
</style>