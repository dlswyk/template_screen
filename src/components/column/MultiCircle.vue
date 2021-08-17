<template>
  <div ref="column_con" class="j-percent"></div>
</template>

<script>
export default  {
  props:["multicircle"],
  data(){
    return{
      // multiCircle: {
      //   data:[
      //     {value: 3000, name: '征集任务'},
      //     {value: 3577, name: '办结任务'},
      //     {value: 9031, name: '在办任务'},
      //     {value: 499, name: '延期任务'},
      //   ],
      //   // 是否显示label
      //   labelNoraml:false,
      // }
    }
  },
  created(){
    
  },
  mounted(){
    this.drawChart(this.multicircle)
  },
  methods:{
  
    drawChart(data){
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.column_con);
      // 指定图表的配置项和数据
      var opMultiCircle = new optionMultiCircle(data,this.$refs.column_con);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opMultiCircle);

    }
  },
  watch:{
    // 监听父组件传值
    // multicircle:{
    //   handler(newVal,oldVal){
    //     console.log("multiCircle",newVal)
    //     this.drawChart(newVal)
    //   },
    //   deep: true
    // }
  }
}
</script>

<style scoped>
  
</style>