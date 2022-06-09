//开关
export default function isFull(){
  if(!isFullScreen()){
    enterFullScreen();
  }else{
    exitFullScreen();
  }
}


//是否是全屏
function isFullScreen() {
  return  !! (
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.webkitFullScreen ||
    document.msFullScreen
  );
}

//解决使用f11导致不能 关闭全屏api失效
document.addEventListener('keydown', function (e) {
  e = e || window.event;
  // console.log("e.keyCode===122 && !isFullScreen()",e.keyCode,!isFullScreen())
  if (e.keyCode===122 && !isFullScreen()) {
    e.preventDefault();
    enterFullScreen();
  }
});

function enterFullScreen () {
  let el = document.documentElement
  let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen
  if (rfs) { // typeof rfs != "undefined" && rfs
    rfs.call(el)
  } else if (typeof window.ActiveXObject !== 'undefined') {
    // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
    let wscript = new ActiveXObject('WScript.Shell')
    if (wscript != null) {
      wscript.SendKeys('{F11}')
    }
  }
}

//关闭全屏
function exitFullScreen () {
  let el = document
  let cfs = el.cancelFullScreen || el.mozCancelFullScreen || el.msExitFullscreen || el.webkitExitFullscreen || el.exitFullscreen;
  if (cfs) { // typeof cfs != "undefined" && cfs
    cfs.call(el)
  } else if (typeof window.ActiveXObject !== 'undefined') {
    // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
    let wscript = new ActiveXObject('WScript.Shell')
    if (wscript != null) {
      wscript.SendKeys('{F11}')
    }
  }
}








