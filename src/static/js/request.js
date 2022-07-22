/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import F from "./config";
 
// 环境的切换
axios.defaults.baseURL = process.env.VUE_APP_URL;

// 请求超时时间
axios.defaults.timeout = 10000;
//设置cross跨域 并设置访问权限 允许跨域携带cookie信息
axios.defaults.withCredentials=true;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

 // loading加载动画第一次
 var count = 0;
 // 请求拦截器
 axios.interceptors.request.use(
   config => {
     // alert(++count);
     ++count==1?F.loading():"";
     return config;
   },
   error => {
     ++count==1?F.loading():"";
     // console.log("请求拦截之前error",error);
     return Promise.error(error);
   }
 )
  
 // 响应拦截器
 axios.interceptors.response.use(
   response => {
     --count==0?F.loading(false):"";
     // console.log("响应拦截response",response);
     if (response.status === 200) {
       return Promise.resolve(response);
     } else {
       return Promise.reject(response);
     }
   },
   // 服务器状态码不是200的情况    
   error => {
     --count==0?F.loading(false):"";
     if (error.response) {
       switch (error.response.status) {
         // 401: 未登录                             
         case 401:
           break;
           // 403 token过期                            
         case 403:
           break;
           // 404请求不存在                
         case 404:
           F.tip('网络请求不存在');
           break;
           // 其他错误，直接抛出错误提示                
         default:
           F.loading(false);
           
       }
       return Promise.reject(error.response);
     }
   }
 );
  
//错误统一处理
function handle(res){
  F.tip(res.msg?res.msg:"请稍后再试");
}

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 * @param {Object} opt 用于自定义处理配置
 */
export function get(url,params,opt={}) {
  F.loading(false);
  F.loading();
  return new Promise((resolve, reject) => {
    axios.get(url,{params: params})
      .then(res => {
        F.loading(false);
        if(res.data.code == "200" || opt.back){
          resolve(res.data);
        }else{
          handle(res.data)
        }
      })
      .catch(err => {
        F.loading(false);
        reject(err)
      })
  });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 * @param {Object} opt 用于自定义处理配置
 */
export function post(url, params,opt={}) {
  F.loading(false);
  F.loading();

  return new Promise((resolve, reject) => {
    
    axios.post(url, params)
      .then(res => {

        F.loading(false);

        if(res.data.code == "200" || opt.back){
          resolve(res.data);
        }else{
          handle(res.data)
        }
      })
      .catch(err => {
        F.loading(false);
        reject(err)
      })
  });
}