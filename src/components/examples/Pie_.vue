<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
export default  {
  props:{
    vdata:{
      type:Object,
      default:()=>{}
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
      const { Pie, Basis } = this.$mychar;

      let option = new Pie().renderPie(this.vdata);

      this.custom(option);

      Basis.render(this.$refs.column_con, option);
    },

    // 自定义配置
    custom(option){
      option.legend.textStyle.color = '#fff';
      option.legend.right = '5%';
      
      option.series[0].radius = ["10%","30%"];
      option.series[0].color =[
        new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: "rgba(37,194,243,.8)"},{offset:.8, color: "rgba(37,194,243,.2)"}]),
        new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: "rgba(210,117,241,.8)"},{offset:.8, color: "rgba(210,117,241,.2)"}]),
      ];
      option.series[0].itemStyle = {
        borderRadius: ['50%', 0, '50%', 0]
      }

      option.legend.top = 'bottom';
      option.legend.left = '3%';
      option.legend.formatter = '{name}';
      

      option.tooltip.formatter = `{b}：{c}人`;
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