export default {
   
  // baseUrl:"http://192.168.0.248:8204/",
  // baseUrl:"https://wggmservice.anji.gov.cn/",

  // 代理
  baseUrl:'api/',

  // 左侧图接口
  left:{
    // 左侧 第一张图 任务数量
    task:"api/count/task",

    // 左侧 第二张图  统计建议数量
    proposal:"api/count/proposal",

    //左侧 第三张图    
    case:"api/count/case",

    // 优秀案例详情
    caseDetail:"/api/count/detail",
  },
  
  // 中间接口
  main:{
    // 微改革任务书
    task:"api/count/status",

    // 微改革任务详情
    taskDetail:"api/count/status/list",

    // 底部微改革类型 
    category:"api/count/category",
  },
  
  // 右侧接口
  right:{
    //右侧第一张图  微改革评分评价
    // score:"api/count/score",
    score:"api/count/score/v2",

    // 右侧第一张图  下方表格
    scoreProposal:"api/count/score/proposal",

    // 第6-7张图表  省级重点 
    status:{
      // 图数据  统计 type：5省级  6重点
      data:"api/count/status",

      // 统计总数
      statistic:"api/count/status/group",
      
      // 图 点击  显示列表数据
      list:"api/count/status/list",

      //点击列表 显示详情
      detail:"api/count/task/detail"
    },

  }
  
}