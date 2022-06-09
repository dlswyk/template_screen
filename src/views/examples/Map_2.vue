<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
export default{
  data() {
    return {
      cityname: "安吉县",
    };
  },

  created() {},

  mounted() {
    // 通过高德地区获取行政区  显示
    this.init(this.cityname);
  },

  methods: {
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
          var data = [];

            //数据格式化   给echarts使用
          var mapdata = this.gaodeMapJsonMaker(result.districtList[0],cityname);  

          var list = result.districtList[0].districtList;

          for (var i = 0; i < list.length; i++) {
            data.push({
              name: list[i].name,
              value: [list[i].center.lng, list[i].center.lat],
            });
          }

          this.getInstance(mapdata,data);
        }
      });
    },

    //高德地图使用  echarts 数据格式化 geoJson  
    gaodeMapJsonMaker(data,cityname) {
      // 存储当前搜索地区边界点
      var jsonData = [];

      var arr = data.boundaries;

      for (var j = 0; j < arr.length; j++) {
        for (var i = 0; i < arr[j].length; i++) {
          jsonData.push(['' + arr[j][i].lng, '' + arr[j][i].lat]);
        }
      }

      // geoJSON格式
      var result = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": { "name": cityname },
            "geometry": {
              "type": "Polygon",
              "coordinates": [jsonData]
            }
          }
        ]
      };

      return result;
    },

    // 地图显示
    getInstance(mapdata,data) {
      const { Map, Basis } = this.$mychar;

      // 注册地图
      this.$echarts.registerMap("gdmap", mapdata);

      let option = new Map().renderMap(data);

      // 自定义图片
      var series = data.map((item, index) => {
        return {
          zlevel: 3,
          name:item.name,
          type: "effectScatter",
          coordinateSystem: "geo",
          //自定义图片的 位置（lng, lat）
          data: [{ name: item.name, value: item.value }],

          tooltip: {
            formatter: '{b0}: {c0}',
            backgroundColor:'#000',
            padding:10,
          },
        };
      });

      // 设置底图上涟漪的自定义图片配置
      option.series = series;

      Basis.render(this.$refs.column_con, option);
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