<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
// 补贴趋势分析
export default  {
  props:{
    vdata:{
      type:Object,
      default:()=>{
        return{
          axis:['Mon', 'Tue', 'Wed', 'Thu',"Tht"],
          legend: ['Forest', 'Steppe', 'Desert', 'Wetland'],
          data:[
            {"title": "Forest",yAxisIndex:1,type:'line',"value":[320, 332, 301, 334, 390]},
            {"title": "Steppe",yAxisIndex:0,"value":[220, 182, 191, 234, 290]},
            {"title": "Desert",yAxisIndex:0,"value":[150, 232, 201, 154, 190]},
            {"title": "Wetland",yAxisIndex:0,"value":[98, 77, 101, 99, 40]},
          ],
        }
      }
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

      this.custom(option);

      Basis.render(this.$refs.column_con, option);
    },

    // 自定义配置
    custom(option){
      // option.series[1].symbol = "none";
      // option.series[1].symbol = 'image://'+this.$RESOURE + 'icon/arc_6.png';
      option.series[1].itemStyle = {
        borderRadius: "[15, 15, 0, 0]"
      }
      option.series[1].lineStyle = { color: "#fed900",type: "dashed"}
      option.series[1].smooth = true;
      option.series[1].tooltip = {
        valueFormatter: function (value) {
          return value + ' %';
        }
      };
      option.yAxis[1].name = "百分比";
      option.yAxis[0].name = "人";

      option.series[0].tooltip = {
        valueFormatter: function (value) {
          return value + ' 人';
        }
      };

      option.legend.right = '15%';

      option.series[0].itemStyle = {
        borderRadius: [15, 15, 0, 0],
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#06e3ff'},{offset: 1, color: '#06a7ff'}])
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