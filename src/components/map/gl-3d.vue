<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
import ajData from '../../assets/json/anji.json'
import CNData from '../../assets/json/china.json'
export default{
  data () {
    return {
      img:require("@/assets/images/map3D_bg.png"),
      // img:require("@/assets/images/profile.jpg"),

      symSVG:"M122.7 152.6l239.4 107.8h299.3l233.5-107.8H122.7zM410 320.2h203.5L511.8 487.9 410 320.2zM691.4 314.3l269.4-125.7L541.7 871V553.7l149.7-239.4zM332.2 314.3l149.7 239.4-6 317.3-413-682.4 269.3 125.7z",

      list:[
        {"name": "杭州",value:[120.21,30.25]},
        {"name": "湖州",value:[120.09,30.89]},
        {"name": "北京",value:[116.43,39.90]},
        {"name": "长沙",value:[112.94,28.23]},
        {"name": "武汉",value:[114.30,30.59]},
      ],

      cityname:"安吉县",

      cityList:[],

      show:false
    };
  },

  created(){
  },

  mounted(){
    // this.getInstance(ajData);
    this.getInstance(CNData);
  },

  methods: {

    // 实例化对象 进行图形化渲染
    // 在json 文件下的properties 下添加 "cp":[119.772,30.6962], 修改地区名称显示位置
    getInstance(data,name) {
      const { Map, Basis } = this.$mychar;
      
      var img = new Image();
      img.src = this.img;

      // let option = new Map().renderMap();
      let option = new Map().renderMap3D({img:img});

      this.$echarts.registerMap(name || "gdmap", data);

      this.custom(option,data);

      let myChart = Basis.render(this.$refs.column_con, option);

      //清除当前元素点击  ！！！
      myChart.off("click");

      this.clearClick(myChart,option);
    },

    // 左键点击
    clearClick(myChart,option) {
      console.log('mychart',myChart);
      myChart.on("click", (params) => {
        console.log('params.data',params);
        let data = params.data;
        if(data && data.name){
          this.getInstance(ajData,'aj');
          // this.$echarts.registerMap("aj", ajData);
          // this.custom(option,ajData);
          // Basis.render(this.$refs.column_con, option);
        }
        
      });
    },

    
    // 自定义配置
    custom(option,data){
      this.list.map(item=>{
        item.value.push(50)
      })

      var series = {
        type: "scatter3D",
        coordinateSystem: "geo3D",
        zlevel:30,
        // type: "effectScatter",
        // coordinateSystem: "geo",
 
        // silent:false,

        color:"#fde292",
        data: [...this.list],

        //自定义 注意 当时暂时不支持图片模式
        symbol:"path://"+this.symSVG,
        // symbol:"image://http://admin.oxpp.xyz:7000/uploads/lu.svg",

        symbolSize: [40, 30],

        emphasis: {
          label: {
            show: false,
          },
        },
      }

      // 设置3d图上涟漪的自定义图片配置
      option.series[1] = series;
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