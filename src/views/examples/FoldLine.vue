<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
export default  {
  props:{
    vdata:{
      type:Object,
      default:()=>({
        color:[],
        axis:['Mon', 'Tue', 'Wed', 'Thu'],
        data:[83,66,57,46]
      })
    },
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
      const { FoldLine, Basis } = this.$mychar;

      let option = new FoldLine().renderFoldLine(this.vdata);
      
      this.custom(option);

      Basis.render(this.$refs.column_con, option);
    },

    // 自定义配置
    custom(option){

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