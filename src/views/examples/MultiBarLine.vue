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
    return{
      
    }
  },
  created() {

  },
  mounted() {
    this.getInstance();
  },
  methods: {
    // 实例化对象 进行图形化渲染
    getInstance() {
      const { renderMult, Basis } = this.$mychar;

      let option = new renderMult().renderMultiBar(this.vdata);

      option.series[0].symbol = "none";
      option.series[0].itemStyle = {
        borderRadius: "[15, 15, 0, 0]"
      }
      option.series[0].lineStyle = { color: "#00ebef",type: "dashed"}
      option.series[0].smooth = false;

      option.series[1].itemStyle = {
        borderRadius: [15, 15, 0, 0],
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#fed900'},{offset: 1, color: '#ffa000'}])
      }
      console.log(option);
      Basis.render(this.$refs.column_con, option);
    },
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