<template>
  <div class="header">
    <p class="time">{{date.days}} {{date.time}}</p>
    <div class="title">大屏名称</div>
    <button class="el-button el-button-primary examples" type="primary" @click="skip">栗子</button>
    <img class="full" src="@/assets/images/fullscreen.png" alt="" @click="$fullScreen">
  </div>
</template>

<script>
export default  {
  data () {
    return {
      date:{
        days:"",

        week:"",

        time:""
      }
    };
  },

  created(){
    // this.formatDate()
  },

  methods: {
    formatDate () {
      this.timeOut=setTimeout(()=>{
        const date = new Date()
        const year = date.getFullYear() // 年
        const month = date.getMonth() + 1 // 月
        const day = date.getDate() // 日
        const week = date.getDay() // 星期
        const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        let hour = date.getHours() // 时
        hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
        let minute = date.getMinutes() // 分
        minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
        let second = date.getSeconds() // 秒
        second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
        this.date.days = `${year}年${month}月${day}日`
        this.date.week = `${weekArr[week]}`
        this.date.time = `${hour}:${minute}:${second}`
        this.formatDate();
      },1000)
    },

    skip(){
      this.$router.push({path:'/examples'})
    }
  },

  beforeDestroy () {
    if (this.formatDate) {
      clearTimeout(this.formatDate) // 在Vue实例销毁前，清除时间定时器
    }
  },
}
</script>
<style lang='scss' scoped>
  .examples{
    position: absolute;
    right: 200px;
    top: 20px;
  }
  .time{
    position: absolute;
    left: 100px;
    top: 20px;
    color: #fff;
  }
  .full{
    position: absolute;
    right: 100px;
    top:16px;
    cursor: pointer;
  }
  
  .header{
    position:relative;
    width: 100%;
    height: 100px;
    text-align: center;
    background: url("~@/static/images/header.png") no-repeat 0 0/100% 100%;
    .title{
      font-weight: 700;
      letter-spacing: 16px;
      padding-bottom: 20px;
      font-size: 48px;
      background-image: -webkit-linear-gradient(top,#a2e2df,#00c1ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      &::before{
        content: "";
        display: block;
        width: 50%;
        height: 50px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-image: -webkit-linear-gradient(left,rgba(34,123,117,.1) 1%,#48ffe8 90%,#adfcff);
        background-repeat: no-repeat;
        clip-path: polygon(0 1px,615px 0,655px 15px,100% 15px,100% 18px,654px 18px,614px 3px);
        animation: lineHue 7s linear infinite;
      }
      &::after{
        transform-origin: center right;
        transform: rotateY(180deg);
        content: "";
        display: block;
        width: 50%;
        height: 50px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-image: -webkit-linear-gradient(left,rgba(34,123,117,.1) 1%,#48ffe8 90%,#adfcff);
        background-repeat: no-repeat;
        clip-path: polygon(0 1px,615px 0,655px 15px,100% 15px,100% 18px,654px 18px,614px 3px);
        animation: lineHue 7s linear infinite;
      }
    }
    @keyframes lineHue {
      0% {
        background-size: 0;
        filter: hue-rotate(0deg)
      }

      to {
        background-size: 100%;
        filter: hue-rotate(1turn)
      }
    }
  }

  
 
</style>