export default {
  //loadding 加载动画
  loading: function (bool) {
    if (bool == undefined || bool) {
      var div = document.createElement("div");
      div.id = "Y_loading";
      div.innerHTML = `
      <div class="l-box j-full-curbox" style="position:fixed;z-index:999">
        <div class="l-circle">
          <div class="c1"></div>
          <div class="c2"></div>
          <div class="c3"></div>
          <div class="c4"></div>
        </div>
        <span>loading</span>
      </div>`;
      document.body.appendChild(div);
      return;
    }
    document.querySelector("#Y_loading") ? document.body.removeChild(document.querySelector("#Y_loading")) : "";
  },

  //提示语  颜色和  结束时间
  tip: function (val, col, bool) {
    if(document.querySelector("#Y_tip")){
      return;
    }

    var div = document.createElement("span");
    div.id = "Y_tip";
    if (!val) {
      val = '暂无数据';
    }
    div.innerHTML = `<div style="position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);background:${col?col:'#000'};opacity:0.8;z-index:999;font-size:0.15rem;color:#fff;padding:0.07rem;border-radius:5px;">${val}</div>`;
    document.body.appendChild(div);
    setTimeout(function () {
      document.body.removeChild(document.querySelector("#Y_tip"));
    }, bool ? bool : 2000)
  },

  //地址参数 对象合成
  httprequestquery(list){
    let params = [];
    
    for(let i in list){
      params.push(i + "=" + list[i]);
    }
    return params.length>0 ? '?' + params.join("&") : '';
  },

  //地址参数 对象合成 加密 list 传参对象  boolen 如果不存在或者为真就加密  boolen false解密
  httprequestencode(list,boolen){
    let params = [];

    boolen?boolen:true;
   
    for(let i in list){
      let item =boolen?window.btoa(unescape(encodeURIComponent(list[i]))):decodeURIComponent(escape(window.atob(list[i])));
      params.push(i + "=" + item);
    }
    return params.length>0 ? '?' + params.join("&") : '';
  },

  getParams: function (search) {
    var r = {}
    if (search == undefined) {
      search = window.location.href.split('?')[1];
    } else {
      search = search.split('?')[1];
    }

    if (!search) return;
    var arr = search.split('&');

    if (!arr.length) {
      return;
    }

    for (var i = 0; i < arr.length; i++) {
      var s = arr[i].split('=');
      r[s[0]] = decodeURI(s[1]);
    }
    return r;
  },


  /**
   * @param {*} num 需要转换金额
   * @param {*} type 0：元  1：万元  2:亿元 以此类推
   * @param {*} fixed 保留小数
   * @returns 
   */
  unitConvert:function(num,type=1,fixed=2) {
    var dividend = Math.pow(10000,type)
    var curNum = num;
    //转换金额位数
    curNum = curNum / dividend 
    return curNum.toFixed(fixed);
  },

  /** 字符串替换****
   * @param {*} str 目标字符串
   * @returns case 2 3用于脱敏姓名   11 手机号  18身份证
   */
  strReplace:function (str){
    var len = str.length;
    // console.log('str',len);
    var aim = '';
    switch(len){
      case 2:
        aim = str.replace(/.*(?=[\u4e00-\u9fa5])/,  "*");
        break;
      case 3:
        aim = str.replace(/(?<=[\u4e00-\u9fa5]).*(?=[\u4e00-\u9fa5])/,  "*");
        break;
      case 11:
        aim = str.replace(/^(.{3})(?:\d+)(.{2})$/,  "\$1****\$2");
        break;
      case 18:
        aim = str.replace(/^(.{3})(?:\d+)(.{4})$/,  "\$1******\$2");
        break;
      default:
        aim = str;
    }
    return aim;
  },

  /**
   * @param {*} num 获取前几个月
   * @param {*} boolean 是否包含当前月
   * @returns 
   */
  getMonthList:function(num,boolean=true) {
    var curMon = new Date().getMonth()+1+(boolean?1:0);

    num = num?num:12;

    var numLimit = 12;
    var data = [];
    if(num < curMon){
      for(let i=curMon-num;i<curMon;i++){
        data.push(i+"月")
      }
    }else{
      for(let j=numLimit-num+curMon;j<13;j++){
        data.push(j+"月")
      }
      for(let j=1;j<curMon;j++){
        data.push(j+"月")
      }
    }

    return data;
  }

}

Date.prototype.format = function (fmt) { //author: meizz 
  var cNumber = ["日", "一", "二", "三", "四", "五", "六"];
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒
    'w+': cNumber[this.getUTCDay()], //星期
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}