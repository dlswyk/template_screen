import * as echarts from 'echarts';
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





export default{
  /**optionMultiCircle 圆环
 * @param {*} data 
 *  data: {
        data:[
          {value: 3000, name: '征集任务'},
          {value: 3577, name: '办结任务'},
          {value: 9031, name: '在办任务'},
          {value: 499, name: '延期任务'}
        ],
        // 是否显示label
        labelNoraml:false
    },

    color:自定义颜色
 */
    optionMultiCircle:function (data){
      var itemStyle = [];
      var colors = data.color?data.color:[
        new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#53a6ff'},{ offset: 1,color: '#0f83fe'}]),
        new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#acf7f4'},{ offset: 1,color: '#4ef1eb'}]),
        new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#d695ff'},{ offset: 1,color: '#b640ff'}]),
        new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#EE5A24'},{ offset: 1,color: '#EA2027'}])
      ];
    
      colors.map((item)=>{
        itemStyle.push({color: item})
      })
    
      //反方向剩下部分的样式
      var placeHolderStyle = {
        normal: {
          opacity: 0,
          labelLine: {
            show: false
          }
        },
        emphasis: {
          opacity: 0,
          labelLine: {
            show: false
          }
        }
      };
      var labelNoraml = {
        normal: {
          formatter: "{a}:{c}人",
          show: data.labelNoraml?true:false,
          position: 'inside',
          color: '#fff',
          padding: [6, 14],
          fontSize: 14
        }
      }
      var series = [];
      var legend = [];
      data.data.map((item,index)=>{
        var radiusWidth = 16;  //多圆环宽度
        var radiusSpace = 26;  //多圆环间距
        var radius = (index+1)*radiusSpace;
        legend.push(item.name);
      
        series.push({
          name: item.name,
          type: 'pie',
          minAngle: 200,
          radius: [radius,radius+radiusWidth],
          hoverAnimation: false,
          center: ['35%', '48%'],
          itemStyle: itemStyle[index%colors.length],
          data: [{
            value: data.data[index].value + item.value,
            name: '',
            label: labelNoraml
          },{
            value: data.data[index].value,
            name: '',
            itemStyle: index%2==0?itemStyle[index]:placeHolderStyle,
            label: labelNoraml
          }]
        })
      })
      var count =-1;
      var option = {
       
        legend: {
          orient: '',
          icon: 'circle',
          right: 50,
          top: "28%",
          data:legend,
          selectedMode:false,
          textStyle: {
            color: '#FFF',
            fontSize:14
          },
          formatter: function (name) {
            count++;
            return name + data.data[count].value;
          },
        },
        series:series
      }
      return option;
    },

    /**圆环图
     * @param {*} data 
     *  ring:{
            data:[
              {value: 0, name: '18-20(岁)'},
              {value: 0, name: '20-25(岁)'},
              {value: 0, name: '25-30(岁)'},
              {value: 0, name: '30-40(岁)'},
            ],
            color:[
              new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(31,191,175,1)"},{offset:.8, color: "rgba(31,191,175,0)"}]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(248,184,61,1)"},{offset:.8, color: "rgba(248,184,61,0)"}]),
              new echarts.graphic.LinearGradient(0, 1, 0, 0,[{offset: 0, color: "rgba(48,183,233,1)"},{offset:.8, color: "rgba(31,191,175,0)"}]),
              new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(40,112,230,1)"},{offset:.8, color: "rgba(31,191,175,0)"}])
            ],
          }
     */
    optionRing:function(data) {
      var color = data.color?data.color:[
        new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(31,191,175,1)"},{offset:.8, color: "rgba(31,191,175,0)"}]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(248,184,61,1)"},{offset:.8, color: "rgba(248,184,61,0)"}]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(48,183,233,1)"},{offset:.8, color: "rgba(31,191,175,0)"}]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: "rgba(40,112,230,1)"},{offset:.8, color: "rgba(31,191,175,0)"}])
      ];
      
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: "{b} {c}人",
          backgroundColor:'#000',
          borderWidth:0,
          textStyle: {
            color:"#fff",
            fontSize:16,
          },
          padding:10,
        },
        legend: {
          show: true,
          orient: "vertical",
          // 禁止点击
          itemHeight: 16, //修改icon图形大小
          itemWidth: 16, //修改icon图形大小
          icon: "circle",
          right:20,
          top:'center',
          formatter: function (item) {   //让series 中的文字进行换行
            return item;
          },
          textStyle:{
            color:"#fff",
          },
        },
        grid: {
          bottom: 0
        },
        series: [{
          type: 'pie',
          minAngle: 15,
          radius:["40%","60%"],
          center:['30%', '50%'],
          color: color,
          label: { show: false,},
          data: data.data
        }]
      };
      return option;
    },
    
    /**折线图
     * 
     */
    optionFoldline:function(data){
      var option = {
        tooltip : {
          trigger: 'axis',
          borderWidth:0,
          textStyle: {
            color:"#fff",
            fontSize:16,
          },
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          },
          // formatter: "{a} <br/>{b} : {c}"
        },
        xAxis: {
          type: 'category',
          data: [1,2,3],
          nameTextStyle:{
            color:'#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#4EECFC'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 14,
            rotate:45,//度角倾斜显示
          },
        },
        yAxis:{
          type: 'value',
          name:"数量",
          nameTextStyle:{
            color:'#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#4EECFC'
            }
          },
          axisLabel: {
            color: '#8a9ecf',
            fontSize: 14,
          },
          splitLine: {
            show: false
          }
        },
        series: [{
          data: data.data,
          type: 'line',
          symbol:'none',
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#f0b2a0' 
            },{
              offset: .6, color: '#ef2e62' 
            },{
              offset: .8, color: '#00CCEB' 
            },{
              offset: 1, color: '#76bebd' 
            },],
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(67,155,253, 0.8)'
              }, {
                offset: 0.8,
                color: 'rgba(67,155,253, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 10
            }
          },
          smooth: true
        }]
      };
      return option;
    },
    
    
    /** 柱状图
     * @param {*} data
     *  oVeColumn:{
          name:["人力社保局","住建局","医保局","公安局"],
          value:[83,66,57,46]
        }
     */
    optionColumn:function(data){
    
      var colors = data.color?data.color:[new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#14a2da'},{offset: 1, color: '#0ec7df'}]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#322cff'},{offset: 1, color: '#2068ff'}])
      ];
    
      var option = {
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
        legend: {
          data: data.name,
          icon: "circle",
          right: 10,
          top: 20,
          textStyle: {
            color: 'rgba(255,255,255,1)',
            fontSize:16
          }
        },
        grid: {
          top:'15%',
          left: '5%',
          containLabel: true,
          height:'80%',
          width:'90%'
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#656e77',
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
        },
        xAxis: {
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
          data: data.data.name
        },
        series: {
          data: data.data.value,
          barWidth:"65%",
          itemStyle: {
            normal: {
              borderRadius: [3, 3, 0,0],
              color: colors[0],
            }
          },
          label: {
            normal: {
              show: true
            }
          },
          type: 'bar'
        }
      };
    
      return option;
    },
    
    
    /** 多列柱状图
     * @param {*} data
     *  oVeColumn:{
         
        }
     */
    optionMulColumn:function(data){
    
      var colors = data.color?data.color:[new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#14a2da'},{offset: 1, color: '#0ec7df'}]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#322cff'},{offset: 1, color: '#2068ff'}])
      ];
    
      var series = [];
      for(var i=0;i<data.name.length;i++){
        series.push(
          {
            data: data.data[i].value,
            barWidth:"15%",
            itemStyle: {
              normal: {
                color: colors[i],
              }
            },
            label: {
              normal: {
                show: true
              }
            },
            name: data.data[i].name,
            type: 'bar'
          }
        )
      }
    
      var option = {
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
        legend: {
          show:false,
          data: data.name,
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
            color: '#656e77',
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
          data: data.xAxis
        }],
        //多列
        series: series
      };
    
      return option;
    },
    
    /**叠堆 柱状图
     * @returns 
     *  StackColumn:{
            data:[{
                name: '中央、国务院及其办公厅批复试点',
                value: [20, 32, 9]
              },{
                name: '国家有关部委批复试点',
                value: [22, 25, 19]
              },{
                name: '省委、政府及其办公厅',
                value: [20, 32, 9]
              },{
                name: '省人大常委会办公厅批复的试点',
                value: [10, 12, 21]
              }
            ],
            color:[
              new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#53a6ff'},{ offset: 1,color: '#0f83fe'}]),
              new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#acf7f4'},{ offset: 1,color: '#4ef1eb'}]),
              new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#d695ff'},{ offset: 1,color: '#b640ff'}]),
              new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#EE5A24'},{ offset: 1,color: '#EA2027'}])
            ]
          }
     */
    optionStackColumn:function(data){
      var itemStyle = [];
      var colors = data.color?data.color:[
        new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#53a6ff'},{ offset: 1,color: '#0f83fe'}]),
        new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#acf7f4'},{ offset: 1,color: '#4ef1eb'}]),
        new echarts.graphic.LinearGradient(0.5, 0, 0.5, 1, [{offset: 0,color: '#d695ff'},{ offset: 1,color: '#b640ff'}]),
      ];
    
      colors.map((item)=>{
        itemStyle.push({color: item})
      })
    
      // 数据处理
      var serDAta = [];
      data.data.map((item,index)=>{
        serDAta.push(
          {
            name: item.name,
            type: 'bar',
            itemStyle: {
              normal: {
                color: colors[index%colors.length],
              }
            },
            stack: '广告',
            barWidth: "50%",
            data: item.value
          }
        )
      })
      var option = {
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
        legend: {
          data: data.name,
          orient: "vertical",
          textStyle: {
            color: "#fff"
          },
          right:"2%",
          top:"20%",
          
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          width:"40%",
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [1,2,3],
          nameTextStyle:{
            color:'#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#4EECFC'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 14,
          },
        }
        ,
        yAxis:{
          type: 'value',
          name:"数量",
          nameTextStyle:{
            color:'#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#4EECFC'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 14,
          },
          splitLine: {
            show: false
          }
        },
        series: serDAta
      };
    
      return option;
    },
    
    
    /**竖直 排列 柱状图
     * @param {*} data 
     *  oVeColumn:{
        name:["住房","农业","民生","医疗","文体","教育","政务"],
        value:[35,66,57,46,70,66,100]
      }
     */
    optionVeColumn:function(data,myChart){
      var colors = data.color?data.color:[new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#14a2da'},{offset: 1, color: '#0ec7df'}]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1,[{offset: 0, color: '#322cff'},{offset: 1, color: '#2068ff'}])
      ];
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: "rgba(13,139,243,0.2)"
            }
          },
          padding:10,
          borderWidth:0,
          textStyle: {
            color:"#fff",
            fontSize:16,
          },
          backgroundColor:"#000"
        },
        grid: {
          top:'18%',
          left: '5%',
          right: '4%',
          containLabel: true,
          height:'75%',
          width:'75%'
        },
        xAxis: {
          type: 'value',
          name:"进度",
          nameTextStyle:{
            color:'#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#4EECFC'
            }
          },
          color:'#000',
          boundaryGap: [0, 0.01],
          axisLabel: {
            color: '#fff'
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: data.data.name,
          axisLine: {
            lineStyle: {
              color: '#4EECFC'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 14,
            rotate:45,//度角倾斜显示
          },
        },
        series: [{
          name: '2021年进度',
          type: 'bar',
          barWidth:'50%',
          label: {
            normal: {
              show: true,
              position: 'right',
              color:'#fff'
            }
          },
          itemStyle: {
            normal: {
              color: colors[0],
            }
          },
          data: data.data.value
          },
          
        ]
      };
      return option;
    },
    
    /**雷达图
     * @param {*} data 
     * radar:{
        indicator:[
          {name: '支用xxxx', max: 100,color:'#50fcfc'},
          {name: '90后', max: 100,color:'#3859ff'},
          {name: '80后', max: 100,color:'#c84395'},
          {name: '70后', max: 100,color:'#ff9e17'}
        ],
        data:[{value:[85, 77, 90, 50]}],
        // color:["#50fcfc","#3859ff","#c84395","#ff9e17"]
      },
     */
    optionRadar:function(data){
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        radar:[{
            indicator: data.indicator,
            radius: '70%',
            shape: 'polygon',
            center:  ["50%","50%"],
            // 注意这里要放到name textStyle里面   和官方文档不一样
            name: {
              textStyle: {
                fontSize: 16,
                color: "#e6e7e9",
              },
            },
            splitArea: { //间隔填充色
              show: true,
              areaStyle:{
                color:["rgba(69,98,142,0.9)","rgba(69,98,142,0.7)","rgba(69,98,142,0.6)","rgba(69,98,142,0.5)","rgba(69,98,142,0.3)"] 
              }
            },
            splitLine:{
              lineStyle:{
                color:"rgba(221,221,221,.1)"
              }
            },
            axisLine:{
              lineStyle:{
                width:1,
                color:'rgba(221,221,221,.1)'
              }
            }
        }],
        series: [{
          type: 'radar',
          // 拐点颜色
          itemStyle:{
            normal:{
              color:"#3095f9",
              borderWidth:2,
            },
          },
          // 绘制线条颜色
          lineStyle: {
            width: 2,
            color:"rgba(48,149,249,.6)"
          },
          // 绘制区域颜色
          areaStyle:{
            color:'rgba(48,149,249,.4)'
          },
          data: data.data
        }]
      };
      return option;
    },
    
    /**漏斗图 
     * @param {*} data 
     * funnel:{
        data:[
          {value: 80, name: '已征集建议',val:10000},
          {value: 60, name: '有效建议',val:8000},
          {value: 40, name: '解答解释',val:6000},
          {value: 20, name: '立项督办',val:4000}
        ],
      }
     */ 
    optionFunnel:function(data){
      var option = {
        // 颜色
        
        color:data.color,
        
        legend: {
          show:false,
          orient: "vertical",
          textStyle: {
            color: "#fff",
            fontSize:16
          },
          icon: "circle",
          left:'3%',
          top:'60%'
        },
        series: {
          type:'funnel',
          left: '5%',
          top: '10%',
          bottom: 60,
          width: '50%',
          height: "80%",
          min: 0,
          max: 100,
          minSize: '0',
          maxSize: '100%',
          sort: 'descending',
          label: {
            show: true,
            color:"#fff",
            padding:5,
            fontSize:14,
            formatter:function(el){
              return el.data.name+"  "+el.data.val+"条";
            },
          },
          labelLine: {
            length: 30,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderWidth: 5,
            borderColor:"#fff"
          },
          data:data.data
        }
      };
      return option;
    },
    
    
    
    /**漏斗图 双层嵌套多层
     * 
     * @param {*} data 
     * data:[
    *   {value:60,val:1, name: '授信人数',itemStyle: {color: #ddd,label:{backgroundColor: #ddd}},
        {value:40,val:2, name: '累计贷款人数',itemStyle: {color: #ddd},label:{ backgroundColor:#ddd}},
        {value:20,val:3, name: '贷款人数',itemStyle: {color: #ddd},label:{ backgroundColor: #ddd}}
      ]
     */
    optionFunnelDouble:function(data){
      var option = {
        legend: {
          orient: "vertical",
          textStyle: {
            color: "#fff",
            fontSize:16
          },
          icon: "circle",
          left:'3%',
          top:'60%'
        },
        series: [{
            type:'funnel',
            left: '8%',
            top: '28%',
            bottom: 60,
            width: '85%',
            height: "65%",
            min: 0,
            max: 100,
            minSize: '10%',
            maxSize: '100%',
            sort: 'descending',
            label: {
              show: true,
              borderRadius:8,
              backgroundColor: "#0fb2f8",
              color:"#fff",
              padding:5,
              fontSize:16,
              formatter:function(el){
                return el.data.val + "人";
              },
            },
            labelLine: {
              length: 30,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderWidth: 0
            },
            data:data
          },
          {
            type:'funnel',
            left: '8%',
            top: '28%',
            bottom: 60,
            width: '85%',
            height: "65%",
            min: 0,
            max: 100,
            minSize: '10%',
            maxSize: '100%',
            sort: 'descending',
            label: {
              show: true,
              position:'inside',
              borderRadius:8,
              color:"#fff",
              fontSize:16,
              padding:5,
              formatter:function(el){
                var val =fomatFloat(el.data.val/(data[0]+data[1]+data[2]),2);
                return parseInt(val*100) + "%";
              },
            },
            labelLine: {
              length: 30,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderWidth: 0
            },
            data:data
          }
        ]
      };
      return option;
    },
    
    
    /**
     * 百度地图
     * 使用前必须引入bmap.js或bmap.min.js
     * 
     */
    optionBmap:function(data){
      var option = {
        bmap: data?data:{ //设置百度地图显示哪些东西
          // 余杭师范
          center: [120.022837,30.299174],
          zoom: 14,
          roam: true
        },
        // 注意如果要在地图上绘制 一定要设置series的coordinateSystem: 'bmap',
        geo: {
          map: 'bmap'
        },
        series: []
      }
      return option;
    },
    
    
    /**涟漪图
     * 注意：专用于地图上
     * @param {*} data 
      data:[
        { name: '师范大学', value: [120.022837,30.299174],},
        { name: '仓前镇人大', value: [120.002735,30.294403]},
        { name: '月供', value: [120.038236,30.283114]}
      ],
     */
    optionEffectScatter:function(data,type){
      var option = {
        series: [{
          name: '微改革部门',
          type: type?type:'effectScatter',
          coordinateSystem: 'bmap',
          symbol:'circle',
          symbolSize: [55, 55],
          showEffectOn: 'render',
          rippleEffect: {
            color:"#63bf62",
            period: 4, // 涟漪特效的动画周期
            scale: 3, // 涟漪特效动画中波纹的最大缩放比例
            brushType: 'stroke',
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'inside',
            show: true,
            color:"#fff"
          },
          
          itemStyle: {
            color:"#63bf62",
            shadowBlur: 10,
            // shadowColor: '#333'
          },
          zlevel: 1,
          data: data,
        }]
      }
      return option;
    },
    
    /**气泡图
     * 注意：专用于地图上
     * @param {*} data 
      data:[
        { name: '师范大学', value: [120.022837,30.299174],},
        { name: '仓前镇人大', value: [120.002735,30.294403]},
        { name: '月供', value: [120.038236,30.283114]}
      ],
     */
    optionScatter:function(data){
      var option = {
        series: [{
          name: 'pm2.5',
          type: 'scatter',
          coordinateSystem: 'bmap',
          symbolSize: [55, 55],
          data: data,
          label: {
            formatter: '{b}',
            position: 'inside',
            show: true,
            color:"#fff"
          },
          itemStyle: {
            color: '#ddb926'
          },
          emphasis: {
            label: {
              show: true
            }
          }
        }]
      }
      return option;
    },
    
    
    
    // 区域地图配置  模拟3d
    optionDistrictMap:function(data) {
      var option = {
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
      return option;
    }
}