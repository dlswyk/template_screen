import {request} from "@/static/js/request.js";
export default {
  // 上传接口
  common:{
    // 上传组件
    upload(data){return request({url:'',method:'post',data,headers: {'Content-Type': 'multipart/form-data'}})},
  },
  
}