<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
import ajData from './anji.json'
import {site as $http} from '@/api/screen/home.js'
export default{
  props:{
    type:{
      type:String,
      default:"map"
    }
  },
  data() {
    return {
      cityname: "安吉县",

      currentIndex:0,

      elderlyMapSite:[],

      count:0,

      list:[],
    };
  },

  created() {
    this.getSite();
  },

  mounted() {
    // 通过高德地区获取行政区  显示
    // this.init(this.cityname);
  },

  methods: {
    getSite(){
      $http().then((res) => {
        this.list = res.data;
        this.getInstance(ajData,res.data)
      });
    },
    
    // 地图显示
    getInstance(mapdata,data) {
      const { Map, Basis } = this.$mychar;

      let option = new Map().renderMap(data);

      var max = 20;
      // 自定义图片
      var series = data.map((item, index) => {

        max=item.elderlyCount>max?item.elderlyCount:max;
      
        return {
          zlevel: 3,
          name:item.yname,
          type: "effectScatter",
          coordinateSystem: "geo",
          //自定义图片的 位置（lng, lat）
          data: [{ name: item.yname, value: [item.ylng,item.ylat,item.elderlyCount],vdata:item }],

          label: {
            show: false
          },

          tooltip: {
            show:true,
            formatter: '{b0}',
            backgroundColor:'#fff',
            borderWidth: 0,
            padding:10,
          },

          itemStyle:{
            color:'#3ba272'
          }
        };
      });

      max = Math.ceil(max/10)*10

      if(max%4 != 0){
        max = max + 10
      }
      
      if(this.type == 'heatmap'){
        option.visualMap = {
          show: true,
          min: 0,
          max:max,
          right:0,
          bottom:15,
          splitNumber: 4,
          // 对于连续型数据，自动平均切分成几段。默认为5段。
          // 连续数据的范围需要 max 和 min 来指定。

          color: ['#5eb851','#ff3','#f33'].reverse(),
          textStyle: {
            color: '#fff'
          }
        }
      }

      option.geo = [
        {
          map: 'gdmap',
          show: true,
          zlevel: 2,
          top:30,
          bottom:60,
          left:40,
          right:40,
          label:{
            show:true,
            position: 'top',
            color:"#fff"
          },
          itemStyle:{
            areaColor:"rgba(0,56,100,.2)",
            borderWidth:1,
            borderColor:"#6ea3d0",
            shadowColor: '#1399c0',
            shadowBlur: 10,
            
          },
          emphasis:{
            label:{show:true,color:'#fff'},
            itemStyle:{
              areaColor:"rgba(0,130,177,.2)",
              borderColor:"#FFF",
              shadowColor: 'rgba(255, 255, 255, 0.1)',shadowBlur: 30,opacity:1
            },
          }
        },
      ];

      

      // 设置底图上涟漪的自定义图片配置
      option.series = series;

      option.tooltip = {show:false};

      // 注册地图
      this.$echarts.registerMap("gdmap", mapdata);

      let myChart = Basis.render(this.$refs.column_con, option);

      // 轮播
      // this.setTime(myChart);

      //清除当前元素点击  ！！！
      myChart.off("click");
      // myChart.off("contextmenu");

       // 配置当前地图的 左键和右键点击事件
      this.clearClick(myChart);
      // this.clearContextmenu(myChart);
    },

    // 左键点击
    clearClick(myChart) {
      myChart.on("click", (params) => {
        console.log('params.data',params);
        if(params.data && params.data.name){
          this.$store.commit("screen/setDialogInfo", {vdata:params.data.vdata,curcom:''});

          this.$EventBus.$emit('C_Dialog','DmechanismInfo',{width:'400px',top:'20vh'})
        }
        
      });
    },

    setTime(myChart){
       //初始默认就展示第一个
      this.dispatchAction(myChart);

      setInterval(() => {
        this.dispatchAction(myChart);
        if(this.currentIndex == this.list.length){
          this.currentIndex = 0;
        }
      }, 5000);
    },

     // 轮播
    dispatchAction(myChart) {
      // console.log(this.country[this.currentIndex].name);
      myChart.dispatchAction({
        type: "showTip",
        seriesIndex: this.currentIndex,
        // name: this.country[this.currentIndex].name
        dataIndex: 0,
      });
      this.currentIndex++;
    },

  }
};
</script>
<style lang='scss' scoped>
  .chart{
    width: 100%;
    height: 100%;
  }
</style>