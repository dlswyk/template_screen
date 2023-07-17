<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
export default  {
  props:{
    vdata:{
      type:Object,
      default:()=>({
        color:['#00FFFF',"#00AEFF","#80FF54","#ff9b00"],
        data:[
          { value: 666, name: 'pie1' },
          { value: 888, name: 'pie2' },
        ],
      })
    },
  },
  data(){
    return{
      legend:{
        'xx':{
          value:"0%",
          icon:"icon/arc_1.png",
        },
        'xxx':{
          value:"0%",
          icon:"icon/arc_2.png",
        },
        'xxxx':{
          value:"0%",
          icon:"icon/arc_3.png",
        }
      }
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
      const { Pie, Basis } = this.$mychar;

      let option = new Pie().renderPie(this.vdata);

      this.custom(option);

      Basis.render(this.$refs.column_con, option);
    },

    // 自定义配置
    custom(option){
      option.legend.right = '15%';
      
      option.series[0].center = ["30%","50%"];
      option.series[0].radius = ["40%","80%"];
      option.series[0].roseType = 'radius';
      option.series[0].color = this.vdata.color;

      option.tooltip.formatter = `{b}：{c}件`;

      // option.legend.data = [];
    
      option.legend.itemWidth = 33; //修改icon图形大小
      option.legend.itemHeight = 17; //修改icon图形大小
      // option.legend.selectedMode = false;   // 禁止点击

      // for(let item in this.legend){
      //   option.legend.data.push({
      //     name:item,
      //     icon:'image://'+this.$RESOURE + this.legend[item].icon
      //   })
      // }

    
      var total = 0;
      this.vdata.data.map(item=>{
        total += item.value
      })

      option.series[0].label = {
        normal: {
          show: true,
          color: '#fff',
          position: 'center',
          formatter: function () {
            return `{text|${total}}{sub|件}`
          },
          rich: {
            text: {
              align: 'center',
              fontSize: 28,
              color: '#fff',
              fontWeight: 600
            },
            sub:{
              color: '#fff',
              fontSize: 12,
            }
          }
        }
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