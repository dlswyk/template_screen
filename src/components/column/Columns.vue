<template>
  <!-- 多列柱状图  -->
  <div ref="column_con" class="j-percent"></div>
</template>

<script>
export default  {
  props:["columns"],
  data(){
    return{
      // 多列柱状图数据
      // columns:{
      //   xAxis:["已完成",'进行中'],
      //   name:['国家有关部委批','国家有关部委批复试点'],
      //   data:[{
      //       name: '国家有关部委批',
      //       value: [20, 32]
      //     },{
      //       name: '国家有关部委批复试点',
      //       value: [22, 25]
      //     }
      //   ],
      //   color:[
      //     new this.$echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#53a6ff'},{ offset: 1,color: '#0f83fe'}]),
      //     new this.$echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#acf7f4'},{ offset: 1,color: '#4ef1eb'}]),
      //     new this.$echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#d695ff'},{ offset: 1,color: '#b640ff'}]),
      //     new this.$echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#EE5A24'},{ offset: 1,color: '#EA2027'}])
      //   ]
      // }
    }
  },
  created(){
  
  },
  mounted(){
    this.drawChart(this.columns)
  },
  methods:{
    drawChart(data){
      // 基于准备好的dom，初始化this.$echarts实例
      // 基于准备好的dom，初始化this.$echarts实例
      let myChart = this.$echarts.init(this.$refs.column_con);
      // 指定图表的配置项和数据
      var opColumns = new this.$echartsOp.optionMulColumn(data); //实例化雷达图对象

      opColumns.grid = data.grid;
      
      opColumns.yAxis[0].name = "数量";
      
      opColumns.legend ={
        show: true,
        // 禁止点击
        selectedMode:false,
        itemHeight: 16, //修改icon图形大小
        itemWidth: 16, //修改icon图形大小
        bottom:10,
        formatter: function (item) {   //让series 中的文字进行换行
          return item ;
        },
        textStyle:{
          color:"#fff",
        },
        itemStyle:{
          color:"#fff"
        }
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opColumns);

      window.addEventListener("resize",()=>{
        myChart.resize();
      })
    }
  }
}
</script>

<style scoped>
  .j-percent{
    position: relative;
  }
</style>