<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
export default  {
  props:{
    vdata:{
      type:Object,
      default:()=>({
        data:[
          { value: 666, name: 'pieArea1' },
          { value: 888, name: 'pieArea2' },
        ]
      })
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
      option.series[0].radius = ["50%","70%"];
      option.series[0].color =[
        new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: "rgba(0,217,225,.8)"},{offset:.8, color: "rgba(0,217,225,.2)"}]),
        new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: "rgba(0,174,255,.8)"},{offset:.8, color: "rgba(0,174,255,.2)"}]),
        new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: "rgba(128,255,84,.8)"},{offset:.8, color: "rgba(128,255,84,.2)"}]),
        new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: "rgba(255,154,24,.8)"},{offset:.8, color: "rgba(255,154,24,.2)"}]),
        new this.$echarts.graphic.LinearGradient(0, 0, 1, 0,[{offset: 0, color: "rgba(255,83,83,.8)"},{offset:.8, color: "rgba(255,83,83,.2)"}]),
      ];
      option.series[0].itemStyle = {
        borderRadius: ['50%', 0, '50%', 0]
      }
      

      var data = this.vdata.data;
      option.legend.formatter = function(name) {
        let total = 0;   // 总数
        let tarValue;    // 标签对应的数据
        for (let i = 0; i < data.length; i++) {
          total += data[i].value;
          if (data[i].name == name) {
            tarValue = data[i].value;
          }
        }
        return `{a|${name}} {b|${tarValue}人}  ${((tarValue/total)*100).toFixed(2)+'%'}`;
      };

      option.legend.textStyle ={
        fontSize: 14,
        color: '#fff',
        lineHeight: 20,
        rich: {
          a:{
            width: 80,
          },
          b:{
            width: 60,
          },
        }
      }

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