export default {
   
  // 默认请求地址
  // baseUrl:"http://192.168.0.246:8253/",
  

  // 本地配置代理
  // baseUrl:'api/',

  // 是否模拟登陆  false 真实登录  true 模拟登陆
  mock:false,


  // 获取用户信息
  common:{
    info:"member/info",

    //上传图片
    file:"file/comm/upload",

    // 模拟个人登录
    personMock:"internal/zlb/p/login",
  
    // 模拟登陆
    mockLogin:"/internal/mockLogin",
  },

  zlb:{
    // login:"login/zlb",
    login:"zheliban/login",
  },

  // 养老机构
  pension:{
    // 列表
    list:"org/list",

    // 机构详情
    detail:"org/detail",

    
    // 申请入住
    apply:"live/apply",

    // 入住申请进度
    process:"live/apply/progress"
  }
  
}