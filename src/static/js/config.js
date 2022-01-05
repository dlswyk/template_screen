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

  //保留小数点后两位
  fomatFloat:function(x,pos){   
    var f = parseFloat(x);
    if(isNaN(f)){
      return false;
    }   
    f = Math.round(x*Math.pow(10, pos))/Math.pow(10, pos); // pow 幂   
    var s = f.toString();
    var rs = s.indexOf('.');
    if(rs < 0){
        rs = s.length;
        s += '.'; 
    }
    while(s.length <= rs + pos){
      s += '0';
    }
    return s;
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


  //检测是微信还是支付宝 0:普通 1:微信 2:支付宝 3:浙里办
  checkBrowser: function () {
    if (/MicroMessenger/.test(window.navigator.userAgent)) {
      return 1;
    } else if (/AlipayClient/.test(window.navigator.userAgent)) {
      return 2;
    } else if (/ZLB/.test(window.navigator.userAgent)) {
      return 3;
    } else {
      return 0;
    }
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
   * 根据身份证号码获取性别，性别是根据身份证的倒数第二位来判断的，奇数为男，偶数为女
   *
   * @export
   * @param {*} idCard
   * @returns
  */
  getSexFromIdCard:function(idCard) {
    let sex = "";
    if (parseInt(idCard.slice(-2, -1) % 2) == 1) {
      sex = "male";
    } else {
      sex = "female";
    }
    return sex;
  },


  /**
   * 根据出生年月日获取年龄
   *
   * @export
   * @param {*} birthday
   * @returns
   */
  getAgeFromBirthday:function(birthday) {
    let birthDate = new Date(birthday)
    let nowDateTime = new Date()
    let age = nowDateTime.getFullYear() - birthDate.getFullYear()
    if (nowDateTime.getMonth() < birthDate.getMonth() ||
      (nowDateTime.getMonth() == birthDate.getMonth() &&
        nowDateTime.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  },

  /**
   * 根据身份证号码获取出生年月日
   *
   * @export
   * @param {*} idCard
   * @returns
   */
  getBirthdayFromIdCard:function (idCard) {
    let birthday = "";
    if (idCard != null && idCard != "") {
      if (idCard.length == 15) {
        birthday = "19" + idCard.substr(6, 6);
      } else if (idCard.length == 18) {
        birthday = idCard.substr(6, 8);
      }
      birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
    }
    return birthday;
  }
}

!(function (doc, win) {
  // 建立在html和body设置height设置100%的情况下

  var docEle = doc.documentElement,
      evt = 'resize', 
      width=1920,
      height=1080,
      fn = function () {
        let scale; //缩小比例
      
        let scaleX = docEle.clientWidth / width;
        let scaleY = docEle.clientHeight / height;
        // 如果屏幕比例小于width的按照小的比例来缩放
        scale = docEle.clientWidth<width?Math.min(scaleX,scaleY):Math.max(scaleX,scaleY);
        
        // 动态设置全局html元素样式   font-size 100px 
        docEle.style.cssText =`width:${width}px;
                              height:${height}px;
                              font-size:${width / 19.2}px;
                              transform:scale(${scale});
                              transform-origin: left top;`;
      };
    fn();
    win.addEventListener(evt, fn, false);
}(document, window));


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