<template>
  <div ref="column_con" class="j-percent"></div>
</template>

<script>
export default  {
  props:["ring"],
  data(){
    return{
      // ring:{
      //   data:[
      //     {value: 0, name: '18-20(岁)'},
      //     {value: 0, name: '20-25(岁)'},
      //     {value: 0, name: '25-30(岁)'},
      //     {value: 0, name: '30-40(岁)'},
      //   ],
      //   color:[
      //     new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(31,191,175,1)"},{offset:.8, color: "rgba(31,191,175,0)"}]),
      //     new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(248,184,61,1)"},{offset:.8, color: "rgba(248,184,61,0)"}]),
      //     new this.$echarts.graphic.LinearGradient(0, 1, 0, 0,[{offset: 0, color: "rgba(48,183,233,1)"},{offset:.8, color: "rgba(31,191,175,0)"}]),
      //     new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(40,112,230,1)"},{offset:.8, color: "rgba(31,191,175,0)"}])
      //   ],
            
      //   radius:["50%","70%"]
      //   legend:{
      //     '18-20(岁)':{
      //       value:"0%",
      //       icon:G.resoure + "static/images/people/top.png",
      //     },
      //     '20-25(岁)':{
      //       value:"0%",
      //       icon:G.resoure + "static/images/people/right.png",
      //     },
      //     '25-30(岁)':{
      //       value:"0%",
      //       icon:G.resoure + "static/images/people/left.png",
      //     },
      //     '30-40(岁)':{
      //       value:"0%",
      //       icon:G.resoure + "static/images/people/bottom.png",
      //     },
      //   }
      // }
    }
  },
  created(){

  },
  mounted(){
    this.drawChart(this.ring)
  },
  methods:{
    drawChart(ring){
      // 基于准备好的dom，初始化this.$echarts实例
      let myChart = this.$echarts.init(this.$refs.column_con);


      // 指定图表的配置项和数据
      var opRing = new this.$echartsOp.optionRing(ring);

      opRing.series[0].radius =ring.radius?ring.radius:["40%","60%"];
      opRing.series[0].center = ['30%', '50%'],
      opRing.series[0].label.show = false;
   
      opRing.legend ={
        show: true,
        orient: "vertical",
        // 禁止点击
        selectedMode:false,
        right:40,
        icon: "circle",
        top:'center',
        formatter: function (item) {   //让series 中的文字进行换行
          return item +'：  '+  ring.legend[item].value;
        },
        textStyle:{
          color:"#fff",
        },
        itemStyle:{
          color:"#fff"
        }
      };

      
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(opRing);


      window.addEventListener("resize",()=>{
        myChart.resize();
      })
    },

    // 显示弹窗
    showDialog(){
      this.$emit('show');
    }

  },

  watch:{
    // 监听父组件传值
    rings:{
      handler(newVal,oldVal){
        this.ring.data = newVal.data;
        this.ring.legend = newVal.legend;
        this.drawChart(this.ring)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  
</style>