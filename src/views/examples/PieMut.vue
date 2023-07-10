<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
export default  {
  props:{
    vdata:{
      type:Object,
      default:()=>{
        return{
          legend:['x1','x2','x3'],
          data:[100,80,20],
          color:["#3F6FFF", "#4EEBA7",'#F5E440']
        }
      }
    },
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

      let option = new Pie().renderSingleMultiPie(this.vdata);

      this.custom(option);

      Basis.render(this.$refs.column_con, option);
    },

    // 自定义配置
    custom(option){
      option.legend.textStyle.color = '#fff';
      option.legend.right = '15%';

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