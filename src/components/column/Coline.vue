<template>
  <div ref="column_con" class="j-percent"></div>

</template>

<script>
export default  {
  // props:["column"],
  data(){
    return{
      currentIndex :0,
      // 柱状图
      oVeColumn:{
        data:{
          name:["3千以下","3千~5千","5千~7千","7千~9千","9千~1万","1万以上"],
          value:[5406,2525,1750,3007,988,680],
        },

        color:[
          new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(41,158,201,1)"},{offset:1, color: "rgba(41,158,201,.05)"}])
        ],
      }
    }
  },
  created(){
  },
  mounted(){
    this.drawChart(this.oVeColumn)
  },
  methods:{
    drawChart(data){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.column_con);
      // 指定图表的配置项和数据
      var opColumn = new optionColumn(data); 

      opColumn.yAxis[0].axisLine.lineStyle.color = 'rgba(0,0,0,0)';
      opColumn.yAxis[0].axisLabel.show = false;

      opColumn.xAxis[0].axisLine.lineStyle.color = 'rgba(15,51,80,.8)';
      
      opColumn.grid = {
        top:'10',
        right: '0',
        containLabel: true,
        height:'80%',
        width:'65%'
      },  
      
      opColumn.series[1] = {
        data: data.data.value,
        type: 'line',
        symbol:'none',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#f0b2a0' 
          },{
            offset: .6, color: '#ef2e62' 
          },{
            offset: .8, color: '#00CCEB' 
          },{
            offset: 1, color: '#76bebd' 
          },],
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(67,155,253, 0.8)'
            }, {
              offset: 0.8,
              color: 'rgba(67,155,253, 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 10
          }
        },
        smooth: true
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opColumn);

      window.addEventListener("resize",()=>{
        myChart.resize();
      })
      // this.dispatchAction(myChart);
      // setInterval(() => {
      //   if(this.currentIndex == this.oVeColumn.data.name.length){
      //     this.currentIndex = 0;
      //   }
      //   this.dispatchAction(myChart);
      // }, 5000);
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