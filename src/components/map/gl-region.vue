<template>
  <div class="chart-box" v-loading='loading'>
    <div class="chart" id="MapGd" ref="column_con"></div>

    <div class="chart-select">
      <el-input placeholder="请输入内容" v-model="data.orgName" class="input-with-select" clearable>
        <div slot="prepend" style="cursor:pointer;" @click="chartBox = !chartBox">安吉县<i class='el-icon-caret-bottom' :class="[chartBox?'icontTranform':'']"></i></div>
        <el-button slot="append" class="el-button-success" icon="el-icon-search" @click="getMapStreeInfo(true)"></el-button>
      </el-input>

      <div class="chart-select-box" v-if="chartBox">
        <div class="column" :class="{'active':item.facilityTypeName == data.facilityTypeName}" v-for="(item,index) in mapFacility" :key="index" @click="changeFacility(item)">
          {{item.facilityTypeName}} ({{item.total}})
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// import * as $mMechanism from '@/api/screen/mMechanism.js'
export default {
  data () {
    return {
      chartBox:false,

      list:[
        {"id": "1316568906946580480","count": "575","livingCount": "188","qhmc": "昌硕街道","orderby": "100","name": "社会福利中心",value:[119.706006,30.610348],},
        {"id": "1316572803941535744","count": "119","livingCount": "92","qhmc": "递铺街道","orderby": "50","name": "递铺街道社会福利中心",value:[119.661854,30.682572],},
        {"id": "1392642293750173696","count": "70","livingCount": "16","qhmc": "天子湖镇","orderby": "50","name": "天子湖镇福善养老院",value:[119.63882,30.797533],},
        {"id": "1346006888142475264","count": "56","livingCount": "13","qhmc": "昌硕街道","orderby": "50","name": "湖州博组客汇泉养老服务有限公司",value:[119.683256,30.636003],},
        {"id": "1323568265566359552","count": "42","livingCount": "16","qhmc": "灵峰街道","orderby": "50","name": "城南新福托老所",value:[119.654311,30.598022],},//有问题
        {"id": "1319473277123825664","count": "24","livingCount": "5","qhmc": "天子湖镇","orderby": "50","name": "民意托养院",value:[119.687326,30.620576],},
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

      loading:false,

      custom:{
        label:'name',
        value:'id'
      },

      map:null,

      defaultCenter:[119.680261,30.638803],

      icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",

      // 设施类别
      mapFacility:[],


      data:{
        facilityType:'',

        // 类别名称
        facilityTypeName:'',

        orgName:''
      },

      // 点标记
      markerList:[]
    }
  },
  mounted(){
    this.init();
    // this.getMapFacility();
    // this.getMapStreeInfo();
  },
  
  methods:{
    // 获取设施类别
    // getMapFacility(){
    //   $mMechanism.mapFacility().then(({data})=>{
    //     this.mapFacility = data;
    //     this.data.facilityTypeName = data[0].facilityTypeName;
    //   })
    // },

    // // 获取设施信息
    // getMapStreeInfo(Boolean){
    //   this.loading = true;
    //   $mMechanism.mapStreeInfo(this.data).then(({data})=>{
    //     this.chartBox = false;
    //     this.loading =false;
    //     if(data.length < 1){
    //       this.$message.warning("暂无信息")
    //       return;
    //     }

    //     // 如果是搜索的话   只需要更改中心坐标点
    //     if(Boolean){
    //       this.change(data[0]);
    //       return;
    //     }
    //     this.list = data;
    //     this.addMarker();
    //     this.change(data[0]);
    //   })
    // },


    // 修改类别
    changeFacility(item){
      // 如果是修改类别  默认清空 搜索框内容
      this.data.orgName = '';
      this.data.facilityTypeName = item.facilityTypeName;
      this.data.facilityType = item.facilityType;
      this.getMapStreeInfo();
    },

    init(){
      this.map = new AMap.Map('MapGd',{
        // 做屏幕适配时，高德地图api的marker.on监听click事件失效，将viewMode模式改为3D即可
        viewMode:'3D',
        // zoom:16,
        zoom:10,
        center:this.defaultCenter,
        mapStyle: "amap://styles/6ea6c3325e66521f031ce0702d48b125"
      });
      this.initMap();
    },

    // 添加点标记
    addMarker() {
      // 每次添加新的前清除已有的
      this.map.remove(this.markerList);
      this.markerList = [];

      this.list.forEach((params)=>{
        // 如果没有坐标点 不添加
        if(!params.ylng && !params.ylat) return;

        var marker = new AMap.Marker({
          position: new AMap.LngLat(params.ylng,params.ylat),
          offset: new AMap.Pixel(-10, -10),
          icon: this.icon, // 添加 Icon 图标 URL
        });

        // 设置标注
        // marker.setLabel({
        //   content: `<div class='info'><span class="iconfont icon-address colec6 mr-5"></span>${params.orgName}</div>`, //设置文本标注内容
        //   offset: new AMap.Pixel(0, 0),
        //   direction: 'right' //设置文本标注方位
        // });

        // 点击事件
        marker.on('click',()=>{
          if(params && params.orgName){
            this.$store.commit("screen/setDialogInfo", {vdata:params});
            this.$EventBus.$emit('C_Dialog','DHserviceInstallationInfo',{title:params.orgName,width:'400px',minWidth:'400px',top:'20vh'})
          }
        })

        this.markerList.push(marker)
      });

      this.map.add(this.markerList);
    },

    // 重新设置地图中心点
    change(data){
      // this.map.setCenter([data.ylng,data.ylat]); //设置地图中心点
      this.map.setZoom(10); //设置底图缩放级别
    },

    // 高德地图只显示某区域
    initMap(){
      new AMap.DistrictSearch({
        extensions: "all",
        subdistrict: 0,
      }).search("安吉县", (status, result)=> {
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true),
        ];
        var holes = result.districtList[0].boundaries;

        var pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        var polygon = new AMap.Polygon({
          pathL: pathArray,
          //线条颜色，使用16进制颜色代码赋值。默认值为#006600
          strokeColor: "rgb(20,164,173)",
          strokeWeight: 4,
          //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
          strokeOpacity: 0.5,
          //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
          fillColor: "rgba(255,255,255,0)",
          // fillColor: "#f33",
          //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
          fillOpacity: 1,
          //轮廓线样式，实线:solid，虚线:dashed
          strokeStyle: "dashed",
          /*勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在    
              ie9+浏览器有效 取值： 
              实线：[0,0,0] 
              虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
              点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实 
              线和10个像素的空白 （如此反复）组成的虚线*/
          strokeDasharray: [10, 2, 10],
        });
        polygon.setPath(pathArray);
        this.map.add(polygon);
      });
    },
    
  }
}
</script>

<style lang='scss'>
.chart-box{
  position:relative;
  width:100%;
  height:100%;
  .chart-select{
    position: absolute;
    top: 20px;
    right: 60px;
    .el-input__inner{
      width: 300px;
    }
    button{
      background-color:#0a87fb;
      color: #fff;
      border-radius: 0 5px 5px 0;
      &:hover {color: #fff;border-color: #54a1e9;background-color: #54a1e9;}
    }

    .el-icon-caret-bottom{
      transition: all .3s;
    }
    .icontTranform{
      transform: rotate(180deg);
    }

    .chart-select-box{
      position: absolute;
      top: 40px;
      width: 100%;
      background-color: #fff;
      border: 1px solid #ddd;
      min-height: 80px;
      padding: 15px 15px 0;
      .column{
        float: left;
        width: 48%;
        box-sizing: border-box;
        background-color: #ddd;
        color: #5a5a5a;
        padding: 10px 2px;
        cursor: pointer;
        border-radius: 2px;
        margin-bottom: 10px;
        &:nth-child(2n){
          float:right;
        }
        &.active{
          background-color: #54a1e9;
          color: #fff;
        }
      }
    }
  }
}
.chart{
  width: 100%;
  height: 100%;
  
  .amap-icon img{
    width: 25px;
    height: 34px;
  }
  .amap-marker-label{
    border: 0;
    background-color: transparent;
    .info{
      position: relative;
      left: 0%;
      top: 0;
      color: #5c5f65;
      padding:10px 15px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 5px;
      background: rgba(255,255,255,.8);
      box-shadow: 0 0 5px rgba(0,0,0,.2);
    }
  }
}
</style>