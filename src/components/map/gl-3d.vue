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

      list_:[
        {name:'安吉县社会福利中心',value:[119.71264,30.616021],id:"1316568906946580480"},
        {name:'安吉孝缘颐养院',value:[119.592992,30.589309]},
        {name:'安吉爱心托老所',value:[0,0]},
        {name:'安吉县孝丰镇社会福利中心（敬老院）',value:[119.503901,30.5531]},
        {name:'安吉县嘉德垣托养院',value:[119.668177,30.651359]},
        {name:'安吉杭垓乐怡养老院',value:[119.278886,30.546808]},
        {name:'安吉新新托养所',value:[119.732222,30.724377]},
        {name:'天子湖镇良朋社会福利中心（天子湖镇良朋敬老院）',value:[119.624262,30.83464]},
        {name:'安吉章村乐怡养老院',value:[119.384471,30.461201]},
        {name:'递铺街道社会福利中心',value:[119.66181,30.682587]},
        {name:'安吉县中医医院分院（安吉中医康复护理院）',value:[119.704286,30.612001]},
        {name:'安吉县报福镇社会福利中心',value:[119.474507,30.504063]},
        {name:'安吉县梅溪镇社会福利中心（敬老院）',value:[119.734907,30.820619]},
        {name:'万康托养院',value:[119.693864,30.626258]},
        {name:'安吉县杭垓镇社会福利中心',value:[119.365202,30.551329]},
        {name:'安吉福康颐养院',value:[119.715512,30.702065]},
        {name:'安吉县民意托养院',value:[119.568229,30.73731]},
        {name:'安吉县城南新福托老所',value:[119.669623,30.57664]},
        {name:'湖州博组客汇泉养老服务有限公司',value:[119.683256,30.636003]},
        {name:'安吉洑氏骨伤医院',value:[0,0]},
        {name:'安吉县第三人民医院',value:[119.567487,30.598288]},
        {name:'安吉县第二人民医院',value:[0,0]},
        {name:'安吉县天子湖镇福善养老院',value:[0,0]},
      ],

      list:[
        {"id": "1316568906946580480","count": "575","livingCount": "188","qhmc": "昌硕街道","orderby": "100","name": "社会福利中心",value:[119.706006,30.610348],},
        {"id": "1316572803941535744","count": "119","livingCount": "92","qhmc": "递铺街道","orderby": "50","name": "递铺街道社会福利中心",value:[119.661854,30.682572],},
        {"id": "1392642293750173696","count": "70","livingCount": "16","qhmc": "天子湖镇","orderby": "50","name": "天子湖镇福善养老院",value:[119.63882,30.797533],},
        {"id": "1346006888142475264","count": "56","livingCount": "13","qhmc": "昌硕街道","orderby": "50","name": "湖州博组客汇泉养老服务有限公司",value:[119.683256,30.636003],},
        {"id": "1323568265566359552","count": "42","livingCount": "16","qhmc": "灵峰街道","orderby": "50","name": "城南新福托老所",value:[119.688036,30.524021],},//有问题
        {"id": "1319473277123825664","count": "24","livingCount": "5","qhmc": "天子湖镇","orderby": "50","name": "民意托养院",value:[119.668502,30.651598],},
        {"id": "1316660980745768960","count": "112","livingCount": "23","qhmc": "递铺街道","orderby": "50","name": "福康颐养院",value:[119.715181,30.701845],},
        {"id": "1316624303411171328","count": "58","livingCount": "21","qhmc": "杭垓镇","orderby": "50","name": "杭垓镇社会福利中心",value:[119.365202,30.551329],},
        {"id": "1316574418245259264","count": "86","livingCount": "24","qhmc": "昌硕街道","orderby": "50","name": "万康托养院",value:[119.687326,30.620576],},
        {"id": "1316574287030652928","count": "76","livingCount": "32","qhmc": "梅溪镇","orderby": "50","name": "梅溪镇社会福利中心",value:[119.734907,30.820619],},
        {"id": "1316573709047173120","count": "51","livingCount": "19","qhmc": "报福镇","orderby": "50","name": "报福镇社会福利中心",value:[119.706006,30.610348],},
        {"id": "1316571483784351744","count": "54","livingCount": "19","qhmc": "章村镇","orderby": "50","name": "章村乐怡养老院",value:[119.778685,30.829414],},
        {"id": "1316571329136168960","count": "92","livingCount": "47","qhmc": "天子湖镇","orderby": "50","name": "天子湖镇良朋社会福利中心",value:[119.621519,30.834761],},
        {"id": "1316570929389637632","count": "55","livingCount": "30","qhmc": "递铺街道","orderby": "50","name": "新新托养所",value:[119.732087,30.724434],},
        {"id": "1316570777719410688","count": "43","livingCount": "24","qhmc": "杭垓镇","orderby": "50","name": "杭垓乐怡养老院",value:[119.585664,30.582817],},
        {"id": "1316570127442907136","count": "82","livingCount": "38","qhmc": "递铺街道","orderby": "50","name": "嘉德垣托养院",value:[119.668502,30.651598],},
        {"id": "1316569685262602240","count": "84","livingCount": "42","qhmc": "孝丰镇","orderby": "50","name": "孝丰镇社会福利中心",value:[119.706006,30.610348],},
        {"id": "1316569485789892608","count": "66","livingCount": "38","qhmc": "孝丰镇","orderby": "50","name": "爱心托老所",value:[119.536582,30.570973],},
        {"id": "1316569254054596608","count": "56","livingCount": "9","qhmc": "孝丰镇","orderby": "50","name": "孝缘颐养院",value:[119.586145,30.582314],},
      ],

      cityname:"安吉县",

      cityList:[],

      show:false
    };
  },

  created(){
  },

  mounted(){
    this.getInstance(ajData);
    // this.getInstance(CNData);
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