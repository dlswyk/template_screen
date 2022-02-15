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



// 饼图
class Pie {
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
        top: '25%',
        right:"2%",
        itemWidth: 8,   // 图例文本前小图形的宽高
        itemHeight: 8,
        icon: 'circle',
        data: data,
        formatter:function(name) {
          // console.log(name);
          let total = 0;   // 总数
          let tarValue;    // 标签对应的数据
          for (let i = 0; i < data.length; i++) {
            total += data[i].value;
            if (data[i].name == name) {
              tarValue = data[i].value;
            }
          }
          return `${name} ${((tarValue/total)*100).toFixed(2)+'%'}`;
        },
        textStyle:{
          fontSize: 14,
          color: '#666666',
          lineHeight: 20,
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
      xAxis: {
        type: 'category',
        data: obj.name,   // x轴标签
        axisTick: {     // 刻度隐藏
          show: false,
        },
        // x轴文字标签
        axisLabel: { 
          color: "#666666",
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
        }
      },
      
      grid: {
        top:'15%',
        left: '5%',
        containLabel: true,
        height:'80%',
        width:'90%'
      },
      
      series: [
        {
          barWidth: 16,   
          type: 'bar',
          barGap: '5%',
          label:{
            show:true,
            position:'top'
          },
          data: obj.data,
          itemStyle: {
            normal:{
              borderRadius: [4, 4, 0, 0],
              color: '#5E92F6',
            }
          }
        }
        
      ],
      
    }
  }
}

export default {
  Basis,
  Pie,
  Bar
}