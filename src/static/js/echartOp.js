import * as echarts from 'echarts';

class Basis {
  // 全局主色调
  static color = ['#60D7A7', '#2060ED', '#F9CB34',  '#6242FB', '#1041AA'];
  
  // echarts 初始化及配置 记忆动态适应
  static render(current, option) {
    let myChart = echarts.init(current);

    window.addEventListener('resize', () => {
      myChart.resize();
    });

    return myChart.setOption(option);
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
   * @param {*} obj 
   * @param {*} obj.title 名称 
   * @param {*} obj.data  数据
   * @returns 
   * 
   * @示例
   * obj:{
      title:"饼图" ,
      data:[
        { value: 1048, name: '部门任务数量' },
        { value: 1048, name: '部门任务数量' },
      ],
    },
   */
  renderPie(obj) {
    const data = obj.data;
    return {
      title: obj.title && Basis.titleOp(obj).title,

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
          return `{a|${name}}  ${((tarValue/total)*100).toFixed(2)+'%'}`;
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
        minAngle: 15,
        radius:["40%","60%"],
        center:['30%', '50%'],
        label: { show: false,},
        data: data
      }]
    }
  }
}

// 柱状图
class Bar {
  /**
   * @param {*} obj 
   * @param {*} obj.axis  x轴数据 
   * @param {*} obj.data  数据
   * @returns 
   * 
   * @示例
   * obj:{
      axis:['Mon', 'Tue', 'Wed', 'Thu'],
      value:[83,66,57,46]
    }
   */
  renderBar(obj) {
    return {
      title: obj.title && Basis.titleOp(obj).title,
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
        data: obj.axis,   // x轴标签
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
            position:'top'
          },
          data: obj.data,
          itemStyle: {
            normal:{
              color: '#5E92F6',
            }
          }
        }
        
      ],
      
    }
  }
  
  /**
   * @param {*} obj 
   * @param {*} obj.axis  x轴数据 
   * @param {*} obj.legend
   * @param {*} obj.default 不需要设置  使用默认处理方式
   * @param {*} obj.data  数据
   * @returns 
   * 
   * @示例
   * obj:{
      axis:['Mon', 'Tue', 'Wed', 'Thu'],
      legend: ['Forest', 'Steppe', 'Desert', 'Wetland'],
      data:[
        [320, 332, 301, 334, 390],
        [220, 182, 191, 234, 290],
        [150, 232, 201, 154, 190],
        [98, 77, 101, 99, 40]
      ],
    }
   */

  renderMultiBar(obj){
    var series = [];
    console.log("!obj.default",!obj.default,obj);
    if(!obj.default){
      for(var i=0;i<obj.axis.length;i++){
        series.push(
          {
            data: obj.data[i],
            // 是否堆叠
            stack: obj.stack || '',
            barWidth:obj.stack?'30%':'10',
            itemStyle: {
              normal: {
                color:obj.color && obj.color[i%obj.color.length],
              }
            },
            name: obj.legend[i],
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
        data: obj.legend,
        icon: "circle",
        textStyle: {
          color: 'rgba(255,255,255,1)',
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom:"5%",
        height:"86%",
        containLabel: true
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
        data: obj.axis
      }],
      //多列
      series: !obj.default && series
    }
  }
}


// 折线图
class FoldLine {
  /**
   * @param {*} obj 
   * @param {*} obj.axis  x轴数据 
   * @param {*} obj.data  数据
   * @returns 
   * 
   * @示例
   * obj:{
      axis:['Mon', 'Tue', 'Wed', 'Thu'],
      data:[83,66,57,46]
    }
   */
  renderFoldLine(obj) {
    return {
      title: obj.title && Basis.titleOp(obj).title,
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
        data: obj.axis
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
        bottom: '16%',
        left: '3%',
        right: '4%',
        containLabel: true,
      },
      series: [
        {
          data: obj.data,
          type: 'line',
          smooth: true,   // 曲面平滑效果
          symbol: 'none', // 不显示点
          color: '#29a675',
          // 区域面积
          areaStyle: {
            // 填充颜色
            color: new echarts.graphic.LinearGradient(0,1,0,0,[
              {
                offset: 0,
                color: '#5E92F6',
                opacity: .1
              },
              // {
              //   offset: .25,
              //   color: '#5E92F6',
              //   opacity: .8
              // },
              {
                offset: 1,
                color: '#29a675'
              }
            ]),
            // 阴影
            shadowBlur: 10,
            shadowColor: '#5E92F6',
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            opacity: .8
          }
        }
      ]
    }
  }
}

//获取最大值
function getSeriesItemMax(array) {
  console.log(array)
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
function yAxisMax(maxValue) {
  if (isNaN(maxValue / 1) || maxValue / 1 < 10) {
    return 10
  }
  const max = Math.ceil(maxValue) + '';
  const itemValue = Math.ceil(max / 5) + '';
  const mins = Math.ceil((itemValue / Math.pow(10, itemValue.length - 1)))
  const item = mins * Math.pow(10, itemValue.length - 1) + '';
  // item 需要是5的整数倍
  const res = Math.ceil(item / 5) * 5 * 5;
  return res
}

// 堆叠  柱状图折线图组合  ！！！未完成
class renderMult{
  /**
   * @param {*} obj 
   * @param {*} obj.axis  x轴数据 
   * @param {*} obj.legend
   * @param {*} obj.data  数据
   * @returns 
   * 
   * @示例
   * obj:{
      axis:['Mon', 'Tue', 'Wed', 'Thu'],
      legend: ['Forest', 'Steppe', 'Desert', 'Wetland'],
      data:[
        {"title": "Forest",yAxisIndex:1,type:'line',"value":[320, 332, 301, 334, 390]},
        {"title": "Steppe",yAxisIndex:0,"value":[220, 182, 191, 234, 290]},
        {"title": "Desert",yAxisIndex:0,"value":[150, 232, 201, 154, 190]},
        {"title": "Wetland",yAxisIndex:0,"value":[98, 77, 101, 99, 40]},
      ],
    }
   */

  renderMultiBar(obj){
    console.log("renderMultiBar",obj);
      //存储双轴刻度值
      //存储双轴刻度值
    var y1DataList = [];
    var y2DataList = []

    // 数据处理
    var serDAta = [];
    obj.data.map((item,index)=>{

      //双刻度分类
      if (item.type === 'line') {
        y2DataList.push(item.value)
      } else{
        y1DataList.push(item.value)
      }

      serDAta.push(
        {
          name: item.title,
          type: item.type?item.type:'bar',
          // stack: opt.stack || '',
          // barWidth:opt.stack?'30%':'10',
          yAxisIndex: item.yAxisIndex?item.yAxisIndex:0,
          itemStyle: {
            normal: {
              color:obj.colors[index%obj.colors.length],
            }
          },
          lineStyle: {
            color: "#4bcffa"
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
          },
        }
      )
    })

    var y1MaxValue = getSeriesItemMax(y1DataList) // 柱状图最大值
    var y2MaxValue = getSeriesItemMax(y2DataList) // 折线图最大值

    var y1Max = yAxisMax(y1MaxValue);
    var y2Max = yAxisMax(y2MaxValue);

    return {
      
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        icon:'circle',
        right:0,
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
        left:'0',
        height: '85%',
        width: '100%',
        containLabel:true
      },
      xAxis: {
        type: 'category',
        data: obj.axis,
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
      series: serDAta
    }
  }
}

class Gauge {

  /**
   * @param {*} obj
   * @param {*} obj.name  名称
   * @param {*} obj.data  数据
   * @param {*} obj.max  数据最大值
   * @returns
   *
   * @示例
   * obj:{
      name:'入住人数',
      max: 100,
      data:[
        {value: 10, name: '入住率'}
      ],
    }
   */

  renderGauge(obj) {
    obj.data.map(item => {
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
          max: obj.max,
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
            formatter: obj.name + ': {value}' + (obj.company || ''),
            show: true,
            color: '#fff',
            offsetCenter: [0, '-135%']
          },
          data: obj.data,
        },
        {
          type: 'gauge',
          startAngle: 240,
          endAngle: -60,
          radius: '90%',
          min: 0,
          max: obj.max,
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
          data: obj.data,
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
  Gauge
}