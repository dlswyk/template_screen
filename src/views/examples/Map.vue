<template>
  <div class="chart" ref="column_con"></div>
</template>

<script>
import ajData from '@/assets/json/china.json'
export default{
  data () {
    return {
      currentIndex: 0,

      default: "xx市",

      cityname: "xx市",
    };
  },

  created(){
    
  },

  mounted(){
    // 通过json数据生成地图
    this.getInstance(ajData);
  },

  methods: { 
    // 实例化对象 进行图形化渲染
    // 在json 文件下的properties 下添加 "cp":[119.772,30.6962], 修改地区名称显示位置
    getInstance(data) {
      const { Map, Basis } = this.$mychar;

      this.$echarts.registerMap("gdmap", data);

      let option = new Map().renderMap();

      let myChart = Basis.render(this.$refs.column_con, option);

      //初始默认就展示第一个
      // this.dispatchAction(myChart);

      // setInterval(() => {
      //   this.dispatchAction(myChart);

      //   if(this.currentIndex == this.country.length){
      //     this.currentIndex = 0;
      //   }
      // }, 5000);

      //清除当前元素点击  ！！！
      // myChart.off("click");
      // myChart.off("contextmenu");

      // // 禁止当前元素的右键事件
      // this.$refs.map.oncontextmenu = function () {
      //   return false;
      // };

      // // 配置当前地图的 左键和右键点击事件
      // this.clearClick(myChart);
      // this.clearContextmenu(myChart);
    },

    // 获取区域json
    getJson(name) {
      var url = "../static/json/county/" + name + ".json";
      axios.get(url, {}, {}).then((res) => {
        this.getInstance(res.data);
      });
    },

    // 左键点击下钻地图
    clearClick(myChart) {
      myChart.on("click", (params) => {
        if (this.cityname == params.name) return;
        
        this.cityname = params.name;
        this.getJson(params.name);
      });
    },

    // 右键返回市级地图
    clearContextmenu(myChart) {
      myChart.on("contextmenu", (params) => {
        if (this.cityname == this.default) return;
        this.cityname = this.default;
        this.getJson(this.cityname);
      });
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
}
</script>
<style lang='scss' scoped>
   .chart{
    width: 100%;
    height: 100%;
  }
</style>