<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
import ajData from './anji.json'
export default{
  data () {
    return {

    };
  },

  created(){
    
  },

  mounted(){
    this.getInstance(ajData);
  },

  methods: { 
    // 实例化对象 进行图形化渲染
    // 在json 文件下的properties 下添加 "cp":[119.772,30.6962], 修改地区名称显示位置
    getInstance(data) {
      const { Map, Basis } = this.$mychar;

      this.$echarts.registerMap("gdmap", data);

      let option = new Map().renderMap();

      option.geo = [{
          map: 'gdmap',
          show: true,
          zlevel: 2,
          left:'30%',
          right:'5%',
          aspectScale:1.2,
          label:{
            show:true,
            position: 'top',
            color:"rgba(255,255,255,.8)",
          },
          itemStyle:{
            // areaColor:"#76bbff",
            
            areaColor:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#1f84de'},{offset: .8, color: '#2796e9'}]),
            // areaColor:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "#5598ff"},{offset:.8, color: "#76bbff"}]),
            borderWidth:2,
            borderColor:"rgba(28,85,142,.3)",
            // shadowColor: '#2ea0f0',
            // shadowBlur: 4,
          },
          emphasis:{
            label:{show:true,color:'#fff'},
            itemStyle:{
              areaColor:"#3095f9",
              borderColor:"#1c558e",
            },
          },
        },
        {
          map: 'gdmap',
          show: true,
          left:'30%',
          right:'5%',
          aspectScale:1.2,
          itemStyle:{
            borderColor:"#497679",
            shadowColor: '#03132d',
            shadowBlur: 10,
            shadowOffsetY: 20,
          }
        },
        {
          map: 'gdmap',
          show: true,
          left:'30%',
          right:'5%',
          aspectScale:1.2,
          itemStyle:{
            borderColor:"#497679",
            shadowColor: '#042a6a',
            shadowBlur: 5,
            shadowOffsetY: 15,
          }
        },
      
      ]

      Basis.render(this.$refs.column_con, option);
    },
  }
}
</script>
<style lang='scss' scoped>
   .chart{
    width: 100%;
    height: 100%;
  }
</style>