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

      symSVG:"M122.7 152.6l239.4 107.8h299.3l233.5-107.8H122.7zM410 320.2h203.5L511.8 487.9 410 320.2zM691.4 314.3l269.4-125.7L541.7 871V553.7l149.7-239.4zM332.2 314.3l149.7 239.4-6 317.3-413-682.4 269.3 125.7z",

      // list:[
      //   {yname:"天子湖镇",ylng:'',ylat:'',value:24},
      //   {yname:"梅溪镇",ylng:'',ylat:'',value:29},
      //   {yname:"溪龙乡",ylng:'',ylat:'',value:6},
      //   {yname:"鄣吴镇",ylng:'',ylat:'',value:8},
      //   {yname:"孝源街道",ylng:'',ylat:'',value:6},
      //   {yname:"递铺街道",ylng:'',ylat:'',value:43},
      //   {yname:"昌硕街道",ylng:'',ylat:'',value:48},
      //   {yname:"灵峰街道",ylng:'',ylat:'',value:10},
      //   {yname:"孝丰镇",ylng:'',ylat:'',value:26},
      //   {yname:"杭核镇",ylng:'',ylat:'',value:26},
      //   {yname:"上墅乡",ylng:'',ylat:'',value:16},
      //   {yname:"天荒坪镇",ylng:'',ylat:'',value:14},
      //   {yname:"报福镇",ylng:'',ylat:'',value:24},
      //   {yname:"章村镇",ylng:'',ylat:'',value:11},
      //   {yname:"山川乡",ylng:'',ylat:'',value:8},
      // ],

      list:[
        {"yname": "天子湖镇","ylng": 119.63882,"ylat": 30.797533,"value": 24,elderlyMec:0,elderlyDiff:0,elderlyDisab:634,total:"12518"},
        {"yname": "梅溪镇","ylng": 119.789587,"ylat": 30.77908,"value": 29,elderlyMec:0,elderlyDiff:0,elderlyDisab:808,total:"16818"},
        {"yname": "溪龙乡","ylng": 119.771275,"ylat": 30.757734,"value": 6,elderlyMec:0,elderlyDiff:0,elderlyDisab:100,total:"2045"},
        {"yname": "鄣吴镇","ylng": 119.550873,"ylat": 30.776378,"value": 8,elderlyMec:0,elderlyDiff:0,elderlyDisab:126,total:"2829"},
        {"yname": "孝源街道","ylng": 116.338559,"ylat": 39.75198,"value": 6,elderlyMec:0,elderlyDiff:0,elderlyDisab:124,total:"2557"},
        {"yname": "递铺街道","ylng": 119.648625,"ylat": 30.653488,"value": 43,elderlyMec:0,elderlyDiff:0,elderlyDisab:884,total:"17841"},
        {"yname": "昌硕街道","ylng": 119.706177,"ylat": 30.639271,"value": 48,elderlyMec:0,elderlyDiff:0,elderlyDisab:554,total:"15428"},
        {"yname": "灵峰街道","ylng": 119.654311,"ylat": 30.598022,"value": 10,elderlyMec:0,elderlyDiff:0,elderlyDisab:198,total:"3873"},
        {"yname": "孝丰镇","ylng": 119.564691,"ylat": 30.589114,"value": 26,elderlyMec:0,elderlyDiff:0,elderlyDisab:647,total:"11996"},
        {"yname": "杭垓镇","ylng": 119.389073,"ylat": 30.575829,"value": 26,elderlyMec:0,elderlyDiff:0,elderlyDisab:508,total:"9268"},
        {"yname": "上墅乡","ylng": 119.5743,"ylat": 30.546914,"value": 16,elderlyMec:0,elderlyDiff:0,elderlyDisab:207,total:"3886"},
        {"yname": "天荒坪镇","ylng": 119.621379,"ylat": 30.520531,"value": 14,elderlyMec:0,elderlyDiff:0,elderlyDisab:329,total:"5790"},
        {"yname": "报福镇","ylng": 119.485116,"ylat": 30.51127,"value": 24,elderlyMec:0,elderlyDiff:0,elderlyDisab:297,total:"4941"},
        {"yname": "章村镇","ylng": 119.384471,"ylat": 30.461201,"value": 11,elderlyMec:0,elderlyDiff:0,elderlyDisab:396,total:"4159"},
        {"yname": "山川乡","ylng": 119.6803,"ylat": 30.46018,"value": 8,elderlyMec:0,elderlyDiff:0,elderlyDisab:94,total:"1603"},
      ],

      cityname:"安吉县"
    };
  },

  created() {
    // this.getSite();
  },

  mounted() {
    this.getInstance(ajData,this.list)
    // 通过高德地区获取行政区  显示
    // this.init(this.cityname);
  },

  methods: {
    getSite(){
      $http().then((res) => {
        this.getInstance(ajData,res.data)
      });
    },

    // 在json 文件下的properties 下添加 "cp":[103.6711120605,30.6308222497], 修改地区名称显示位置
    init(cityname) {
      //初始化高德地图行政搜索
      var district = new AMap.DistrictSearch({
        subdistrict: 3,
        showbiz: false,
        extensions: "all",
        level: "district",
      });

      // 高德地图  根据名称或者地区code 获取行政区边界
      district.search(cityname, (status, result) => {
        if (status == "complete") {
          // 存储搜索区域下级区域坐标位置  用于地图上自定义图标展示
          var data = []

          var list = result.districtList[0].districtList;
          var count  = 0;
          for (var i = 0; i < list.length; i++) {
            this.list.map(item=>{
              if(item.yname == list[i].name){
                item.ylng = list[i].center.lng;
                item.ylat = list[i].center.lat;
              }
            })
            data.push({
              name: list[i].name,
              value: [list[i].center.lng, list[i].center.lat],
            });
          }
          this.list.map(item=>{
            
            count+=item.value;
          })

          console.log('data',data,this.list);

          this.getInstance(ajData,this.list);
        }
      });

      // this.getInstance(ajData,this.list)
    },
    
    // 地图显示
    getInstance(mapdata,data) {
      const { Map, Basis } = this.$mychar;

      var type = this.type;

      let option = new Map().renderMap(data);

      var max = 20;
      // 自定义图片
      var series = data.map((item, index) => {

        max=item.elderlyCount>max?item.elderlyCount:max;
      
        return {
          zlevel: 3,
          name:item.yname,
          type: "scatter",
          coordinateSystem: "geo",
          //自定义图片的 位置（lng, lat）
          data: [{ name: item.yname, value: [item.ylng,item.ylat,item.elderlyCount],vdata:item }],

          label: {
            show: false
          },

          //自定义 注意 当时暂时不支持图片模式
          symbol:"path://"+this.symSVG,

          symbolSize: [40, 30],

          tooltip: {
            show:true,
            formatter: function (d) {
              const {data} = d;
              if(type == 'streetElderly'){
                return `${data.name}  街道服务老人数 ${data.vdata.total} 人`
              }
              return `${data.name}  设施 ${data.vdata.value} 个`
            },
            backgroundColor:'#fff',
            borderWidth: 0,
            padding:10,
          },

          itemStyle:{
            color:type=='streetElderly'?'#ffcb00':'#3ba272'
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
      // this.setTime();

      //清除当前元素点击  ！！！
      myChart.off("click");
      // myChart.off("contextmenu");

       // 配置当前地图的 左键和右键点击事件
      this.type=='streetElderly' && this.clearClick(myChart);
      // this.clearContextmenu(myChart);
    },

    // 左键点击
    clearClick(myChart) {
      myChart.on("click", (params) => {
        console.log('params.data',params.data,params.data);
        let data = params.data;
        if(data && data.name){

          data.vdata.type = this.type;

          this.$store.commit("screen/setDialogInfo", {vdata:data.vdata,curcom:''});

          this.$EventBus.$emit('C_Dialog','DHmechanismStreetInfo',{width:'300px',top:'30vh',title:data.name})
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