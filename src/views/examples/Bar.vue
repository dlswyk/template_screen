<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
export default  {
  props:{
    vdata:{
      type:Object,
      default:()=>{
        return {
          axis:['Mon', 'Tue', 'Wed', 'Thu'],
          data:[83,66,57,46]
        }
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

      let option = new Bar().renderBar(this.vdata);

      this.custom(option);

      Basis.render(this.$refs.column_con, option);
    },

    // 自定义配置
    custom(option){
      option.yAxis.name = '家';
      option.tooltip.formatter = `{b}：{c}家`;

      option.series[0].itemStyle = {
        borderRadius: [15, 15, 0, 0],
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#03D6F8'},{offset: 1, color: '#0E64FE'}])
      }
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