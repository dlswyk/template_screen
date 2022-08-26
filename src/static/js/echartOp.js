import * as echarts from 'echarts';

function isNaN_(params){
  console.log(params);
  return isNaN(params)?0:params
}
class Basis {
  static MYCHAT = {};

  // 全局主色调
  static color = ['#60D7A7', '#2060ED', '#F9CB34',  '#6242FB', '#1041AA'];
  
  // echarts 初始化及配置 解决了控制台警告问题
  // static render(current, option) {
  //   // 是否已经创建过了
  //   let hasCreatEchart = echarts.getInstanceByDom(current);
  //   let myChart = null;
    
  //   //是否已创建过了  解决vue通过监听多次初始化问题
  //   if(!hasCreatEchart){
  //     myChart = echarts.init(current);
  //     this.MYCHAT[myChart.id] = myChart
  //   }else{
  //     myChart = this.MYCHAT[hasCreatEchart.id];
  //     delete this.MYCHAT[hasCreatEchart.id];
  //   }

  //   myChart.setOption(option)
      
  //   return myChart;
  // }


  static render(current, option) {
    let myChart = echarts.init(current);
    myChart.setOption(option)
      
    return myChart;
  }

  // 标题属性
  static titleOp(opt) {
    return {
      title:[
        { 
          text: '{a|}'+'\t'+'{b|'+opt.title+'}',
          left: '0',
          top: '0',
          color: '#666666',
          textStyle:{
            rich: {
              a: {
                width: 17,
                height: 18,
                backgroundColor: {
                  // image: require('@common/images/icon.png')
                }
              },
              b: {
                height: 25,
                lineHeight: 30,
                padding: [8, 0, 0, 0],
                fontSize: 14,
                fontWeight: 'bold',
                color: '#666666',
              }
            }
          }
        }
        ,{
          text: opt.subtext ? opt.subtext : '',
          right: '5%',
          top: '1%', 
          padding: [16, 0, 0, 0],
          textStyle:{
            color: '#5E92F6', 
            fontSize: 11
          }
        }
      ]
    }
  }
}

class Pie {
  /**
   * @param {*} opt 
   * @param {*} opt.title 名称 
   * @param {*} opt.data  数据
   * @returns 
   * 
   * @示例
   * opt:{
      data:[
        { value: 1048, name: '部门任务数量' },
        { value: 1048, name: '11361361' },
      ],
    },
   */
  renderPie(opt) {
    const data = opt.data;
    return {
      title: opt.title && Basis.titleOp(opt).title,

      tooltip: {
        trigger: 'item',
        backgroundColor:'#fff',
        borderWidth:0,
        textStyle: {
          color:"#5e92f6",
          fontSize:16,
        },
        padding:10,
      },
       // 图例
       legend:{
        orient: 'vertical',
        top: 'center',
        right:"2%",
        itemWidth: 8,   // 图例文本前小图形的宽高
        itemHeight: 8,
        icon: 'circle',
        formatter:function(name) {
          let total = 0;   // 总数
          let tarValue;    // 标签对应的数据
          for (let i = 0; i < data.length; i++) {
            total += data[i].value;
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }

          return `{a|${name}}  ${((isNaN_(tarValue/total))*100).toFixed(2)+'%'}`;
        },
        textStyle:{
          fontSize: 14,
          color: '#666666',
          lineHeight: 20,
          rich: {
            a:{
              width: 60,
            },
            b:{
              width: 50,
              padding:[0,0,0,10],
            },
          }
        }
      },
      series: [{
        type: 'pie',
        // minAngle: 15,
        radius:["40%","60%"],
        center:['30%', '50%'],
        label: { show: false,},
        data: data
      }]
    }
  }

  /**
   * @param {*} opt 
   * @param {*} opt.title 名称 
   * @param {*} opt.data  数据
   * @param {*} opt.default  不需要设置  使用默认处理方式 如果设置false 自行处理
   * @returns 
   * 
   * @示例
   * opt:{
      title:"多圆环图" ,
      data:[
        data:[
          [
            { value: 231, name: '男' },
            { value: 1048, name: '女' },
          ],
          [
            { value: 231, name: '60-69岁' },
            { value: 1048, name: '70-79岁' },
            { value: 1048, name: '80-89岁' },
            { value: 1048, name: '90-99岁' },
            { value: 1048, name: '100岁及以上' },
          ],
        ],
      ],
    },
  */
  renderrMultiPie(opt) {
    const data = opt.data;
    if(opt.default != false){
      var series = [];
      var radiusWidth = 16;  //多圆环宽度
      var radiusSpace = 26;  //多圆环间距
      for(var i=0;i<data.length;i++){
        var radius = (i+1)*radiusSpace;
        series.push(
          {
            type: 'pie',
            minAngle: 15,
            radius: [radius,radius+radiusWidth],
            center:['30%', '50%'],
            label: { show: false,},
            data: data[i]
          }
        )
      }
    }
    return {
      title: opt.title && Basis.titleOp(opt).title,

      tooltip: {
        trigger: 'item',
        backgroundColor:'#fff',
        borderWidth:0,
        textStyle: {
          color:"#5e92f6",
          fontSize:16,
        },
        padding:10,
      },
        // 图例
      legend:{
        orient: 'vertical',
        top: 'center',
        right:"2%",
        itemWidth: 8,   // 图例文本前小图形的宽高
        itemHeight: 8,
        icon: 'circle',
        textStyle:{
          fontSize: 14,
          color: '#666666',
          lineHeight: 20,
          rich: {
            a:{
              width: 60,
            },
            b:{
              width: 50,
              padding:[0,0,0,10],
            },
          }
        }
      },
      series: opt.default!=false && series
    }
  }
}

// 柱状图
class Bar {
  /**柱状图
   * @param {*} opt 
   * @param {*} opt.axis  x轴数据 
   * @param {*} opt.data  数据
   * @returns 
   * 
   * @示例
   * opt:{
      axis:['Mon', 'Tue', 'Wed', 'Thu'],
      data:[83,66,57,46]
    }
   */
  renderBar(opt) {
    return {
      title: opt.title && Basis.titleOp(opt).title,
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          shadowStyle: {
            color: "rgba(13,139,243,0.2)"
          }
        },
        borderWidth:0,
        textStyle: {
          color:"#5e92f6",
          fontSize:16,
        },
        padding:20,
        backgroundColor:"#fff"
      },
      textStyle: {
        color: '#fff',
        borderWidth:0
      },
      xAxis: {
        type: 'category',
        data: opt.axis,   // x轴标签
        axisTick: {     // 刻度隐藏
          show: false,
        },
        // x轴文字标签
        axisLabel: {
          fontSize: 12,
          margin: 12,    // 刻度标签与轴线之间的距离
          // interval: "auto", // x轴标签间隔显示，自动
          interval: 0    // x轴标签全部显示
        },
        // x轴线条
        axisLine: {
          lineStyle: {
            color: "#EEEEEE",
            width: 0.5,
          }
        },
      },
      
      yAxis: {
        // y轴值间隔 = max / splitNumber
        // 以下就是把 最大值20 平均分成 5个点，每个点的间距就是4
        type: 'value',
        // interval: 5,  // 步长
        splitNumber: 5,
        min: 0,
        // max: function(max) {return value.max},
        // 网格线设置
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EEEEEE',
            width: .5
          }
        },
      },
      
      grid: {
        top:'15%',
        left: '5%',
        containLabel: true,
        height:'80%',
        width:'90%',
      },
      
      series: [
        {
          barWidth: 16,  
          borderWidth:0, 
          type: 'bar',
          barGap: '5%',
          label:{
            show:true,
            position:'top',
            color:"#fff",
            // echart5.x  注意必须设置color同事设置textBorderColor为其他值 不设置textBorderWidth就能够去除文字白色边框
            textBorderColor: 'inherit',
          },
          data: opt.data,
          itemStyle: {
            normal:{
              color: '#5E92F6',
            }
          }
        }
        
      ],
      
    }
  }
  
  /**堆叠柱状图
   * @param {*} opt 
   * @param {*} opt.axis  x轴数据 
   * @param {*} opt.stack  是否堆叠
   * @param {*} opt.legend
   * @param {*} opt.default 不需要设置  使用默认处理方式 如果设置false 处理
   * @param自行处理*} opt.data  数据
   * @returns 
   * 
   * @示例
   * opt:{
      axis:['Mon', 'Tue', 'Wed', 'Thu'],
      stack:true,
      legend: ['Forest', 'Steppe', 'Desert', 'Wetland'],
      data:[
        [320, 332, 301, 334, 390],
        [220, 182, 191, 234, 290],
        [150, 232, 201, 154, 190],
        [98, 77, 101, 99, 40]
      ],
    }
   */

  renderMultiBar(opt){
    var series = [];
    if(opt.default != false){
      for(var i=0;i<opt.legend.length;i++){
        series.push(
          {
            data: opt.data[i],
            // 是否堆叠
            stack: opt.stack || '',
            barWidth:opt.stack?'30%':'10',
            itemStyle: {
              normal: {
                color:opt.color && opt.color[i%opt.color.length],
              }
            },
            name: opt.legend[i],
            type: 'bar'
          }
        )
      }
    }

    return{
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          shadowStyle: {
            color: "rgba(13,139,243,0.2)"
          }
        },
        borderWidth:0,
        textStyle: {
          color:"#fff",
          fontSize:16,
        },
        padding:20,
        backgroundColor:"#000"
      },
      textStyle: {
        color: '#fff'
      },
      legend: {
        show:false,
        data: opt.legend,
        icon: "circle",
        textStyle: {
          color: 'rgba(255,255,255,1)',
        }
      },
      grid: {
        top:'15%',
        left: '5%',
        containLabel: true,
        height:'80%',
        width:'90%',
      },
      yAxis: [{
        type: 'value',
        axisLabel: {
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            color: '#656e77'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type:"dashed",
            color: '#656e77'
          }
        }
      }],
      xAxis: [{
        type: 'category',
        axisLabel: {
          color: '#fff',
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            color: '#656e77'
          }
        },
        axisTick: {
          show: false
        },
        data: opt.axis
      }],
      //多列
      series: opt.default!=false && series
    }
  }
}


// 折线图
class FoldLine {
  /**折线图
   * @param {*} opt 
   * @param {*} opt.axis  x轴数据 
   * @param {*} opt.data  数据
   * @returns 
   * 
   * @示例
   * opt:{
      axis:['Mon', 'Tue', 'Wed', 'Thu'],
      data:[83,66,57,46]
    }
   */
  renderFoldLine(opt) {
    return {
      title: opt.title && Basis.titleOp(opt).title,
      xAxis: {
        type: 'category',
        offset: 5,  // x轴标签距离x轴向下偏移

        boundaryGap: false,  // 坐标轴两边不留白(默认刻度位于文本中间，作为分割线)
        axisTick: {     // 刻度隐藏
          show: false,
        },
        axisLine: {
          lineStyle: {color: '#fff'}
        },
        // x轴标签
        data: opt.axis
      },
      yAxis: {
        type: 'value',
        splitNumber: 5,
        min: 0,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#EEEEEE',
            width: .5
          }
        },
        axisLine: {
          lineStyle: {color: '#fff'}
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {  // 坐标轴指示器
          lineStyle: {
            width: .5,
            color: '#5E92F6'
          }
        }
      },
      grid: {
        top:"10%",
        bottom: '10%',
        left: '3%',
        right: '4%',
        containLabel: true,
      },
      series: [
        {
          data: opt.data,
          type: 'line',
          smooth: true,   // 曲面平滑效果
          symbol: 'none', // 不显示点
          color: '#29a675',
          // 区域面积
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(67,155,253, 0.8)'
              }, {
                offset: 0.2,
                color: 'rgba(67,155,253, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          }
        }
      ]
    }
  }
}

//获取最大值
function getSeriesItemMax(array) {
  // console.log(array)
  var res = [];
  array.forEach((item) => {
      item.forEach((i, idx) => {
          if (!res[idx]) {
              if (isNaN(i / 1)) {
                  res[idx] = 0
              } else {
                  res[idx] = i / 1
              }
          } else {
              if (isNaN(i / 1)) {
                  res[idx] += 0
              } else {
                  res[idx] += i / 1
              }
          }
      })
  });
  return Math.max.apply(null, res)
}

// 刻度最大值
function yAxisMax(maxValue,it=20) {
  if (isNaN(maxValue / 1) || maxValue / 1 < 10) {
    return 10
  }
  const max = Math.ceil(maxValue) + '';
  const itemValue = Math.ceil(max / it) + '';
  const mins = Math.ceil((itemValue / Math.pow(10, itemValue.length - 1)))
  const item = mins * Math.pow(10, itemValue.length - 1) + '';
  // item 需要是5的整数倍
  const res = Math.ceil(item / it) *it * it;
  return res
}


// 堆叠  柱状图折线图组合 
// 堆叠  柱状图折线图组合 
class renderMult{
  /**
   * @param {*} opt 
   * @param {*} opt.axis  x轴数据 
   * @param {*} opt.legend
   * @param {*} opt.stack 是否堆叠
   * @param {*} opt.yAxisMax 用于处理刻度线对齐问题
   * @param {*} opt.default 不需要设置  使用默认处理方式 如果设置false 处理
   * @param自行处理*} opt.data  数据
   * @returns 
   * 
   * @示例
   * opt:{
      axis:['Mon', 'Tue', 'Wed', 'Thu',"Tht"],
      legend: ['Forest', 'Steppe', 'Desert', 'Wetland'],
      data:[
        {"title": "Steppe",yAxisIndex:0,"value":[220, 182, 191, 234, 290]},
        {"title": "Desert",yAxisIndex:0,"value":[150, 232, 201, 154, 190]},
        {"title": "Wetland",yAxisIndex:0,"value":[98, 77, 101, 99, 40]},
        {"title": "Forest",yAxisIndex:1,type:'line',"value":[320, 332, 301, 334, 390]},
      ],
    }
   */
  renderMultiBar(opt){
    // console.log("renderMultiBar",opt.default,opt);
      //存储双轴刻度值
      //存储双轴刻度值
    var y1DataList = [];
    var y2DataList = []

    // 数据处理
    var series = [];
    opt.data.map((item,index)=>{

      //双刻度分类
      if (item.type === 'line') {
        y2DataList.push(item.value)
      } else{
        y1DataList.push(item.value)
      }
      
      if(opt.default != false){
        series.push(
          {
            name: item.title,
            type: item.type?item.type:'bar',
            stack: item.type!='line'&& opt.stack || '',
            barWidth:opt.stack?'30%':'10',
            yAxisIndex: item.yAxisIndex?item.yAxisIndex:0,
            itemStyle: {
              normal: {
                color:opt.color && opt.color[index%opt.color.length],
              }
            },
            lineStyle: {
              color: "#4bcffa"
            },
            tooltip: {
              valueFormatter: function (value) {
                return value + ' ml';
              }
            },
            data: item.value,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(67,155,253, 0.8)'
                }, {
                  offset: 0.2,
                  color: 'rgba(67,155,253, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.2)',
                shadowBlur: 10
              }
            }
          }
        )
      }
    })

    var y1MaxValue = getSeriesItemMax(y1DataList) // 柱状图最大值
    var y2MaxValue = getSeriesItemMax(y2DataList) // 折线图最大值

    var y1Max = yAxisMax(y1MaxValue,opt.yAxisMax);
    var y2Max = yAxisMax(y2MaxValue,opt.yAxisMax);

    return {
      
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        right:"5%",
        top:0,
        textStyle: {
          color: "#fff"
        },
        // formatter: function (name) {
        //   console.log("name",name)
        //   return name
        // }
      },

      grid: {
        top: '15%',
        bottom: '5%',
        left: '3%',
        right: '4%',
        containLabel:true
      },
      xAxis: {
        type: 'category',
        data: opt.axis,
        axisLabel: {
          color: '#FFF',
          fontSize: 12,
          interval:0
        },
        splitLine: {
          show:false
        },
        axisLine: {
          lineStyle: {
            color: "#354370"
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            fontSize: 12,
            color: "#FFF"
          },
          nameTextStyle: {
            color:"#fff"
          },
          axisLine: {
            show:false
          },
          splitLine: {
            show:true,
            lineStyle: {
              color: "#354370"
            }
          },
          axisTick:{
            show:false
          },
          min: 0,
          max: y1Max,
        },
        {
          type: 'value',
          axisLabel: {
            fontSize: 12,
            color: "#FFF"
          },
          nameTextStyle: {
            color:"#fff"
          },
          axisLine: {
            show:false
          },
          splitLine: {
            show:true,
            lineStyle: {
              color: "#354370"
            }
          },
          axisTick:{
            show:false
          },
          min: 0,
          max: y2Max,
        }
      ],
      series: opt.default!=false && series
    }
  }
}

class Map{
  // 区域地图配置  模拟3d
  renderMap(data) {
    return {
      tooltip: {
        trigger: 'item'
      },
      geo: [
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
        {
          map: 'gdmap',
          show: true,
          top:30,
          bottom:60,
          left:40,
          right:40,
          itemStyle:{
            areaColor:"rgba(0,0,0,0)",
            borderColor:"#497679",
            shadowColor: '#497679',
            shadowBlur: 1,
            shadowOffsetY: 30,
          }
        },
        {
          map: 'gdmap',
          show: true,
          top:30,
          bottom:60,
          left:40,
          right:40,
          itemStyle:{
            areaColor:"rgba(0,0,0,0)",
            borderColor:"#497679",
            shadowColor: '#497679',
            shadowBlur: 1,
            shadowOffsetY: 15,
          }
        }
      ],
  
  
      series: [{
        zlevel: 3,
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: data,
        symbolSize: 8,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        itemStyle: {
          normal: {
            color: '#FFF',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        label: {
          normal: {
            color: "#FFF",
            formatter: '{b}',
            position: 'bottom',
            show: true
          }
        },
      }]
    };
  }

  
  renderMap3D(opt){
    return {
      tooltip: {
        trigger: 'item',
        formatter:'{b0}',
        textStyle:{
          color:"#5e92f6"
        }
      },
      geo3D:{
        type: "map3D", 
        map: 'gdmap',
        
        regions:[{
          name:"xxx",
          label:{
            show:true,
            distance: 20,
            color:"#fff"
          },
        }],

        // zlevel:'-30',
        
        // 设置3D地图材质
        shading:'color',
        colorMaterial:{
          detailTexture:opt.img,
          textureTiling:1
        },

        // 使用后导致3d散点移入事件失效  因此使用silent 或者 regions
        label:{
          show:true,
          distance: 20,
          // 注意这里  不能用 {a} 模式或者 直接return param.name 获取不到  原因未知
          formatter(param) {
            return `{a|${param.name}}`;
          },
          rich: {
            a:{
              color: '#fff',
            },
          },
        },
        silent:true,
        itemStyle: { 
          borderWidth: 1,
          borderColor: 'rgba(57, 132, 138,.5)',
        },
        emphasis:{
          label:{show:true,color:'#fff',distance: 20},
          itemStyle:{
            color:"#fff",
            borderColor:"#FFF"
          },
        },
        viewControl: {
          alpha: 40,
          // beta: 160,
          targetCoord: [116.46, 39.92],
          autoRotate: true,
          autoRotateAfterStill: 3,
          distance: 120,
          maxAlpha:360,
          // 设置大一点防止转一圈就停止
          maxBeta:360000,
          autoRotateSpeed:2
        },
      },
      series: [{
        type: "scatter3D",
        coordinateSystem: "geo3D",
        zlevel:'30',
        //自定义 注意 当时暂时不支持图片模式
        symbol:"circle",

        symbolSize: [40, 30],

        emphasis: {
          label: {
            show: true,
            position: 'top',
            distance: 0,
            formatter(params) {
              return `{a|${params.name}}`;
            },
            rich: {
              a: {
                backgroundColor:'#fff',
                borderWidth:0,
                color:"#5e92f6",
                borderRadius:5,
                fontSize:20,
                padding:[10,15],
              },
            },
            textStyle: {
              color: '#ffffff',
            },
          },
        }
      }]
    };
  }
}

//高德地图使用  echarts 数据格式化 geoJson  
var gaodeMapJsonMaker = function (data,cityname) {
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
}

class Gauge {

  /**
   * @param {*} opt
   * @param {*} opt.name  名称
   * @param {*} opt.data  数据
   * @param {*} opt.max  数据最大值
   * @returns
   *
   * @示例
   * opt:{
      name:'入住人数',
      max: 100,
      data:[
        {value: 10, name: '入住率'}
      ],
    }
   */

  renderGauge(opt) {
    opt.data.map(item => {
      item.title = {show: false}
      return item
    })
    return {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'gauge',
          startAngle: 240,
          endAngle: -60,
          min: 0,
          max: opt.max,
          radius: '80%',
          axisLine: {
            lineStyle: {
              color: [[.33, '#0d56dd'], [.66, '#2ba999'], [1, '#1566df']],
              shadowColor: 'rgba(256, 256, 256, .3)',
              shadowBlur: 20,
            }
          },
          splitLine: {
            length: '30',
            distance: 0,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0.1, color: 'rgba(256, 256, 256, 0.1)' // 0% 处的颜色
                },{
                  offset: 1, color: '#fff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              width: '3'
            },
          },
          axisTick: {
            splitNumber: 2,
            length: 16,
            distance: 0,
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0.1, color: 'rgba(256, 256, 256, 0.1)' // 0% 处的颜色
                },{
                  offset: 1, color: '#fff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              width: '3'
            },
          },
          axisLabel: {
            color: 'rgba(256, 256, 256, 0.7)'
          },
          pointer: {
            offsetCenter: [0, '10%'],
            length: '100%',
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            itemStyle: {
              color: 'rgb(215, 77, 105)'
            },
          },
          detail: {
            formatter: opt.name + ': {value}' + (opt.company || ''),
            show: true,
            color: '#fff',
            offsetCenter: [0, '-135%']
          },
          data: opt.data,
        },
        {
          type: 'gauge',
          startAngle: 240,
          endAngle: -60,
          radius: '90%',
          min: 0,
          max: opt.max,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [{
                offset: .3, color: '#027cea' // 0% 处的颜色
              }, {
                offset: 1, color: '#7ac2ff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          progress: {
            show: true,
            width: 14,
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: opt.data,
        }
      ]
    }
  }
}


export default {
  Basis,
  Pie,
  Bar,
  FoldLine,
  Gauge,
  renderMult,
  Map
}