import * as echarts from 'echarts';

function isNaN_(params){
  console.log(params);
  return isNaN(params)?0:params
}
class Basis {
  static MYCHAT = {};

  // 全局主色调
  static color = ['#60D7A7', '#2060ED', '#F9CB34',  '#6242FB', '#1041AA'];
  
  // echarts 初始化及配置 解决了控制台警告问题   不过好像有相同组件调用只显示一个问题
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

  // 公共tooltip配置
  static tooltip = (trigger = 'item',type='shadow')=>({
    trigger,
    backgroundColor:'#fff',
    borderWidth:0,
    textStyle: {
      color:"#5e92f6",
      fontSize:16,
    },
    padding:10,
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type, // 默认为直线，可选为：'line' | 'shadow'
      shadowStyle: {
        color: "rgba(13,139,243,0.2)"
      }
    },
  })

  // 公共legend
  static legend =(data=[])=>({
    orient: 'vertical',
    top: 'center',
    right:"2%",
    formatter:function(name) {
      let total = 0;   // 总数
      let v;    // 标签对应的数据
      for (let i = 0; i < data.length; i++) {
        total += data[i].value;
        if (data[i].name == name) {
          v = data[i].value;
        }
      }
      return `${name}  ${((isNaN_(v/total))*100).toFixed(2)+'%'}`;
    },

    textStyle:{
      color: '#fff'
    }
  })

  // 公共xAxis
  static xAxis=(data)=>({
    type: 'category',
    data,   // x轴标签
    axisTick: {     // 刻度隐藏
      show: false,
    },
    // x轴文字标签
    axisLabel: {
      fontSize: 12,
      margin: 12,    // 刻度标签与轴线之间的距离
      interval: "auto", // x轴标签间隔显示，自动
      // interval: 0    // x轴标签全部显示
    },
    // x轴线条
    axisLine: {
      lineStyle: {
        color: "rgba(184, 195, 242, .2)",
        width: 0.5,
      }
    },
  })

  // 公共 yAxis
  static yAxis=()=>({
    type: 'value',
    min: 0,
    axisLabel: {
      fontSize: 12,
      color: "#fff"
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
        color: "rgba(184, 195, 242, .2)"
      }
    },
    axisTick:{
      show:false
    },
  })

  // 公共 grid
  static grid=()=>({
    top:'15%',
    left: '5%',
    containLabel: true,
    height:'80%',
    width:'90%',
  })
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
        { value: 666, name: 'pie1' },
        { value: 888, name: 'pie2' },
      ],
    },
   */
  renderPie(opt) {
    const {data} = opt;
    return {
      tooltip:Basis.tooltip(),
      legend:Basis.legend(data),
      series: [{
        type: 'pie',
        // minAngle: 15,
        radius:["40%","60%"],
        center:['30%', '50%'],
        label: { show: false,},
        data
      }]
    }
  }

  /**
   * @param {*} opt 
   * @param {*} opt.data  数据
   * @param {*} opt.radiusWidth  多圆环宽度
   * @param {*} opt.radiusSpace  多圆环间距
   * opt:{
      data:[
        { value: 666, name: 'pie1' },
        { value: 888, name: 'pie2' },
        { value: 999, name: 'pie3' },
      ],
      color:["#3F6FFF", "#4EEBA7",'#F5E440']
    }
   */
  renderSingleMultiPie(opt){
    const {data,radiusWidth=30,radiusSpace=60} = opt;
    var colors = opt.color || ["#3F6FFF", "#4EEBA7",'#F5E440'];
    //灰色部分统一设置颜色
    var placeHolderStyle = {
      normal: {opacity: 0},
      emphasis: {opacity: 0}
    };

    const len = data.length;
    var series = data.map((item,i)=>{
      var radius = (len-i)*radiusSpace;
      return {
        name: item.name,
        type: 'pie',
        minAngle: 200,
        startAngle:80*i,
        radius: [radius-radiusWidth,radius],
        hoverAnimation: false,
        data:i===0?[{
          value: item.value,
          itemStyle: {normal: {color: colors[i]}},
          label: {show:false}
        }]:[{
          value: item.value,
          itemStyle: {normal: {color: colors[i]}},
          label: {show:false}
        },{
          value: opt.data[0].value - item.value,
          label:{show:false},
          itemStyle: placeHolderStyle,
          labelLine:{show:false}
        }]
      }
    })
    return {
      tooltip:Basis.tooltip(),
      // legend:Basis.legend(data),
      series
    }
  }

  /**
   * @param {*} opt 
   * @param {*} opt.data  数据
   * @param {*} opt.radiusWidth  多圆环宽度
   * @param {*} opt.radiusSpace  多圆环间距
   * @param {*} opt.default  不需要设置  使用默认处理方式 如果设置false 自行处理
   * @returns 
   * 
   * @示例
   * opt:{
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
    }
  **/

  renderMultiPie(opt){
    const {data,radiusWidth=30,radiusSpace=60} = opt;
    
    if(opt.default != false){
      var series = [],len = data.length;
      for(var i=0;i<len;i++){
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
      tooltip:Basis.tooltip(),

      legend:{
        ...Basis.legend(),
        formatter:'{name}'
      },
      
      series: opt.default!=false && series
    }
  }

  /**
   * @param {*} opt 
   * @param {*} opt.data  数据
   * @param {*} opt.ratio  圆环空心大小 0~1
   * @param {*} opt.opacity  透明度
   * @param {*} opt.color  颜色
   * @param {*} opt.label  是否展示label
   * @returns
   * @示例
   * opt:{
      data:[
        {name: 'a',value: 44}, 
        {name: 'b',value: 55}, 
        {name: 'c',value: 16}
      ],
      opacity:'.5'
      color:['#0089e5','#4134d5','#0dca9c','#00c1e1']
    },
   */
  // 生成 3D 饼图的配置项
  renderPie3D(opt) {
    const {data:pieData, ratio:internalDiameterRatio = 0,color=[],opacity='.5',label=true} = opt
    let series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let legendData = [];
    let k =typeof internalDiameterRatio !== "undefined"? (1 - internalDiameterRatio) / (1 + internalDiameterRatio): 1 / 3;
    let len = pieData.length;
    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < len; i++) {
      sumValue += pieData[i].value;

      let seriesItem = {
        name:typeof pieData[i].name === "undefined"? `series${i}`: pieData[i].name,
        type: "surface",
        parametric: true,
        wireframe: {show: false},
        pieData: pieData[i],
        pieStatus: {
          selected: false,
          hovered: false,
          k,
        },
        itemStyle:{
          color:color[i%len],
          opacity
        },
      };
      
      // 单个设置
      if (typeof pieData[i].itemStyle != "undefined") {
        let itemStyle = {};
        typeof pieData[i].itemStyle.color != "undefined"? (itemStyle.color = pieData[i].itemStyle.color): null;
        typeof pieData[i].itemStyle.opacity != "undefined"? (itemStyle.opacity = pieData[i].itemStyle.opacity): null;
        seriesItem.itemStyle = itemStyle;
      }

      series.push(seriesItem);
    }

    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value;

      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      series[i].parametricEquation = getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        false,
        false,
        k,
        series[i].pieData.value
      );

      startValue = endValue;
      legendData.push(series[i].name);
    }
    
    // label 配置
    label && series.push({
      name: "pie2d",
      type: "pie",
      label: {
        opacity: 1,
        fontSize: 14,
        lineHeight: 20,
        overflow: "breakAll",
        textStyle: {
          color:'rgba(196, 218, 255, 0.7)'
        },
      },
      labelLine: {
        length: 20,
        length2: 40,
      },
      startAngle: -30, //起始角度，支持范围[0, 360]。
      clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      radius: ["30%", "40%"],
      center: ["50%", "50%"],
      data:pieData,
      itemStyle: {opacity: 0},
    })

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
      // animation: true,
      legend:{
        show:false,
        textStyle: {
          color: '#fff',
        },
        formatter:(name)=>{
          const data = pieData;
          let tarValue; // 标签对应的数据
          for (let i = 0; i < data.length; i++) {
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          return `  ${name}  ${tarValue} 人`;
        },
        textStyle:{
          color:'rgba(184, 195, 242, 1)',
          fontSize: 16,
          fontWeight:900,
          lineHeight: 30
        },
        icon: "rect",
        itemWidth: 8,
        itemHeight: 8
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b} {d}%',
      },
      labelLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,.6)',
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "#fff",
        borderWidth:0,
        textStyle: {
          color: "#5e92f6",
          fontSize: 16,
        },
        padding: 10,
        formatter: (params) => {
          if (params.seriesName !== "mouseoutSeries") {
            return `${params.seriesName}<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
              params.color
            };"></span>${option.series[params.seriesIndex].pieData.value}`;
          }
        },
      },
      xAxis3D: {min: -1,max: 1,},
      yAxis3D: {min: -1,max: 1,},
      zAxis3D: {min: -1,max: 1,},
      grid3D: {
        show: false,
        boxHeight: 10,
        viewControl: {
          distance: 300,
          alpha: 25,
          beta: 40,
          autoRotate: false, // 自动旋转
        },
      },
      series
    };
    return option;
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
      tooltip:Basis.tooltip('axis'),
      xAxis:Basis.xAxis(opt.axis),
      yAxis:Basis.yAxis(),
      grid:Basis.grid(),

      // x轴 y轴文本 颜色
      textStyle: {color: '#fff'},
      
      series: [
        {
          barWidth: 20,  
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
      tooltip:Basis.tooltip('axis'),
      grid:Basis.grid(),
      xAxis:Basis.xAxis(opt.axis),
      yAxis:Basis.yAxis(),
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
      // yAxis: [{
      //   type: 'value',
      //   axisLabel: {
      //     fontSize: 14
      //   },
      //   axisLine: {
      //     lineStyle: {
      //       color: '#656e77'
      //     }
      //   },
      //   splitLine: {
      //     show: true,
      //     lineStyle: {
      //       type:"dashed",
      //       color: '#656e77'
      //     }
      //   }
      // }],
      // xAxis: [{
      //   type: 'category',
      //   axisLabel: {
      //     color: '#fff',
      //     fontSize: 14
      //   },
      //   axisLine: {
      //     lineStyle: {
      //       color: '#656e77'
      //     }
      //   },
      //   axisTick: {
      //     show: false
      //   },
      //   data: opt.axis
      // }],
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
      tooltip:Basis.tooltip('axis','line'),
      grid:Basis.grid(),
      yAxis:Basis.yAxis(),
      xAxis:{
        ...Basis.xAxis(opt.axis),
        boundaryGap: false, // 坐标轴两边不留白(默认刻度位于文本中间，作为分割线)
        axisTick: {     // 刻度隐藏
          onZero: false ,   //-----------重点 有负值展示
          show: false,
        },
      },
      textStyle: {color: '#fff'},
 
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {offset: 0,color: 'rgba(67,155,253, 0.8)'}, 
                {offset: 0.2,color: 'rgba(67,155,253, 0)'}
              ], false),
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
  var res = [];
  array.forEach((item) => {
    item.forEach((i, idx) => {
      if (!res[idx]) {
        isNaN(i / 1)?res[idx] = 0:res[idx] = i / 1
      } else {
        isNaN(i / 1)?res[idx] += 0:res[idx] += i / 1
      }
    })
  });
  return Math.max.apply(null, res)
}

// 刻度最大值
function yAxisMax(maxValue,it=20) {
  if (isNaN(maxValue / 1) || maxValue / 1 < 10) return 10;
  const max = Math.ceil(maxValue) + '';
  const itemValue = Math.ceil(max / it) + '';
  const mins = Math.ceil((itemValue / Math.pow(10, itemValue.length - 1)))
  const item = mins * Math.pow(10, itemValue.length - 1) + '';
  // item 需要是5的整数倍
  const res = Math.ceil(item / it) *it * it;
  return res
}


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
            lineStyle: {color: "#4bcffa"},
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
      tooltip:Basis.tooltip('axis'),
      grid:Basis.grid(),
      xAxis:Basis.xAxis(opt.axis),
      legend:{
        ...Basis.legend(),
        formatter:'{name}'
      },
      // x轴 y轴文本 颜色
      textStyle: {color: '#fff'},
      yAxis: [
        {...Basis.yAxis(),max: y1Max,},
        {...Basis.yAxis(),max: y2Max,}
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

  renderMap3D2(opt){
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
        zlevel: 1,
        regionHeight: 3,
        // regions:[{
        //   name:"xxx",
        //   label:{
        //     show:true,
        //     distance: 20,
        //     color:"#fff"
        //   },
        // }],
        
        // 设置3D地图材质
        shading:'color',
        colorMaterial:{
          detailTexture:opt.img,
          textureTiling:1
        },
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
        type: "map3D", 
        map: 'gdmap',
        zlevel: 1,
        regionHeight: 3,
        selectedMode: "single", //地图高亮单选
        // regions:[{
        //   name:"xxx",
        //   label:{
        //     show:true,
        //     distance: 20,
        //     color:"#fff"
        //   },
        // }],
        
        // 设置3D地图材质
        shading:'color',
        colorMaterial:{
          detailTexture:opt.img,
          textureTiling:1
        },

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
      {
        type: "scatter3D",
        coordinateSystem: "geo3D",
        selectedMode: "single", //地图高亮单选
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

  // 地图和散点时间分别触发  但是地图渐变比renderMap3D不清楚
  renderMap3DTWO(opt){
    return {
      tooltip: {
        trigger: 'item',
        formatter:'{b0}',
        textStyle:{
          color:"#5e92f6"
        }
      },
     
      geo3D: {
        map: "gdmap",
        show: false,
        zlevel: 1,
        regionHeight: 3,
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

      series: [
        {
          type: "map3D",
          map: "gdmap",
          name: "gdmap",
          selectedMode: "single", //地图高亮单选
          regionHeight: 5, //地图高度
          zlevel: 1,
          regionHeight: 3,

          // 设置3D地图材质
          shading:'color',
          colorMaterial:{
            detailTexture:opt.img,
            textureTiling:1
          },
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
      {
        type: "scatter3D",
        coordinateSystem: "geo3D",
        selectedMode: "single", //地图高亮单选
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

  renderMap3D3(opt){
    return {
      tooltip: {
        trigger: 'item',
        formatter:'{b0}',
        textStyle:{
          color:"#5e92f6"
        }
      },
     
      geo: {
        type: "map",
        map: "gdmap",
        show: false,
      },
      geo3D: {
        map: "gdmap",
        show: false,
        zlevel: -10,
        boxWidth: 200,
        boxHeight: 4, //4:没有bar. 30:有bar,bar最高度30，按比例分配高度
        regionHeight: 3,
        shading: "lambert",

        viewControl: {
          projection: "perspective",
          autoRotate: false,
          damping: 0,
          rotateSensitivity: 2, //旋转操作的灵敏度
          rotateMouseButton: "left", //旋转操作使用的鼠标按键
          zoomSensitivity: 2, //缩放操作的灵敏度
          panSensitivity: 2, //平移操作的灵敏度
          panMouseButton: "right", //平移操作使用的鼠标按键

          distance: 500, //默认视角距离主体的距离
          center: [0, 0, 0],

          animation: true,
          animationDurationUpdate: 1000,
          animationEasingUpdate: "cubicInOut",
        },
      },

      series: [
        {
          type: "map3D",
          map: "gdmap",
          name: "gdmap",
          selectedMode: "single", //地图高亮单选
          regionHeight: 5, //地图高度

          show: true,
          zlevel: 1,
          boxWidth: 200,
          //boxHeight: 4, //4:没有bar. 30:有bar,bar最高度30，按比例分配高度
          regionHeight: 3,
          shading: "lambert",
          label: {
            // 标签的相关设置
            show: false,
          },

          itemStyle: {
            color: "#2B5890",
            areaColor: "#025894",
            opacity: 0.8,
            borderWidth: 3,
            borderColor: "#5578A5",
          },
          emphasis: {
            label: {
              show: true,

              textStyle: {
                color: "#fff",
                fontSize: 14,
                backgroundColor: "transparent", // 字体背景色
              },
            },
            shading: "lambert",

            borderColor: "#333",
            borderWidth: 5,
            itemStyle: {
              color: "#025894",
              areaColor: "#025894",
            },
          },
          light: {
            main: {
              shadow: true,
              shadowQuality: "ultra",
            },
          },

          viewControl: {
            projection: "perspective",
            autoRotate: false,
            damping: 0,
            rotateSensitivity: 2, //旋转操作的灵敏度
            rotateMouseButton: "left", //旋转操作使用的鼠标按键
            zoomSensitivity: 2, //缩放操作的灵敏度
            panSensitivity: 2, //平移操作的灵敏度
            panMouseButton: "right", //平移操作使用的鼠标按键

            distance: 500, //默认视角距离主体的距离
            center: [0, 0, 0],

            animation: true,
            animationDurationUpdate: 1000,
            animationEasingUpdate: "cubicInOut",
          },
        },
      {
        type: "scatter3D",
        coordinateSystem: "geo3D",
        selectedMode: "single", //地图高亮单选
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

// 3D 圆环 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(startRatio,endRatio,isSelected,isHovered,k,h) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {min: -Math.PI,max: Math.PI * 3,step: Math.PI / 32,},
    v: {min: 0,max: Math.PI * 2,step: Math.PI / 20,},
    x: function (u, v) {
      if (u < startRadian) return (offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate);
      if (u > endRadian) return (offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate);
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    y: function (u, v) {
      if (u < startRadian)return (offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate);
      if (u > endRadian) return (offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate);
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },
    z: function (u, v) {
      if (u < -Math.PI * 0.5)return Math.sin(u);
      if (u > Math.PI * 2.5)return Math.sin(u) * h * 0.1;
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
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