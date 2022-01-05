/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
 import axios from 'axios';
 import F from "@common/js/config.js";
 import api from "@common/js/api.js";
 
 
 
 // 请求超时时间
 axios.defaults.timeout = 10000;
 //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
 axios.defaults.withCredentials=true;
 
 // post请求头
 axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
 
 // axios.defaults.headers['Referer'] = baseUrl;
  
  
  
 // loading加载动画第一次
 var count = 0;
 // 请求拦截器
 axios.interceptors.request.use(
  
   config => {
     // alert(++count);
     ++count==1?F.loading():"";
     // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
     // const token = store.state.token;
     // token && (config.headers.Authorization = token);
     // console.log("请求拦截之前config",config.headers);
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
     // console.log("响应拦截error",error);
     // if(!error.response || error.response == undefined){
     //   location.href = "/main/index.html#/error";
     //   return;
     // }
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
   // zlb
   if(res && res.code == "-9001"){
     // return;
     sessionStorage.url = window.location.hash;
     sessionStorage.AUTHORIZE = false;
     
     let url = '';
     // 模拟登陆 mock:true  真是登陆 mock false
     api.mock?url = api.common.personMock:url = api.zlb.login;
 
     location.href =api.baseUrl + url + "?callback_url="+api.callback_url+"&mid="+2;
     return;
   }
 
   F.tip(res.msg?res.msg:"请稍后再试");
 }
 /** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 * @param {Object} opt 用于自定义处理配置
 */
 export function get(url,params,opt) {
   F.loading(false);
   F.loading();
   return new Promise((resolve, reject) => {
 
     if(!opt){url =api.baseUrl+url;}
 
     axios.get(url,{params: params})
       .then(res => {
         F.loading(false);
   
         if(res.data.code == "200"){
           resolve(res.data);
         }else{
           handle(res.data)
         }
       })
       .catch(err => {
         console.log("err",err);
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
 export function post(url, params,opt) {
   F.loading(false);
   F.loading();
 
   return new Promise((resolve, reject) => {
 
     if(!opt){url =api.baseUrl+url;}
     
     axios.post(url, params)
       .then(res => {
 
         F.loading(false);
 
         if(res.data.code == "200"){
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
 * postmult方法，对应post请求  提交图片
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function postmult(url, params,opt,headers) {
   F.loading(false);
   F.loading();
 
   return new Promise((resolve, reject) => {
 
     if(!opt){url =api.baseUrl+url;}
     
     axios.post(url, params,headers)
       .then(res => {
 
         F.loading(false);
 
         if(res.data.code == "200"){
           resolve(res.data);
         }else{
           handle(res.data)
         }
       })
       .catch(err => {
         F.loading(false);
         reject(err.data)
       })
   });
 }
  