export default {
  //loadding 加载动画
  loading: function (bool) {
    if (bool == undefined || bool) {
      var div = document.createElement("div");
      div.id = "Y_loading";
      div.innerHTML = `
      <div class="loader" >
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
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