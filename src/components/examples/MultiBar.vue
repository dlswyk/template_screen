<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
export default  {
  props:{
    vdata:{
      type:Object,
      default:()=>{
        return {}
      }
    },

    color:{
      type:Array,
      default:()=>[]
    }
  },
  data(){
    return{}
  },
  created() {

  },
  mounted() {
    this.getInstance();
  },
  methods: {
    // 实例化对象 进行图形化渲染
    getInstance() {
      const { Bar, Basis } = this.$mychar;

      let option = new Bar().renderMultiBar(this.vdata);

      this.custom(option)
      
      Basis.render(this.$refs.column_con, option);
    },

     // 自定义配置
    custom(option){
      option.legend.textStyle.color = '#fff';
      option.legend.right = '5%';
      option.legend.show = true;
      option.legend.itemGap = 30
      option.legend.icon = 'roundRect';

      option.itemStyle = {
        borderRadius:[15, 15, 0, 0]
      };

      option.label = {
        show:true,
        position:'inside',
        color:"#fff",
        textBorderColor: 'inherit',
      };

      option.yAxis[0].name = '单位（人）';
      option.yAxis[0].splitLine.lineStyle = {
        type:"solid",
        color: 'rgba(200,200,200,.4)'
      }
      // [option.xAxis[0],option.yAxis[0]] = [option.yAxis[0],option.xAxis[0]];

      option.series[0].barWidth = 15;
      option.series[1].barWidth = 15;
      option.series[0].color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: '#E7B36A'},{offset: 1, color: '#CE8A28'}])
      option.series[1].color = new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: '#57AC39'},{offset: 1, color: '#6CA01A'}])
     
    }
  },

  watch:{
    vdata:{
      handler(){
        this.getInstance()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .chart{
    width: 100%;
    height: 100%;
  }
</style>