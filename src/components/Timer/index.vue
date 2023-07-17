<template>
  <p class="custom-timer">{{date.days}} {{date.week}} {{date.time}}</p>
</template>

<script>
export default {
  data(){
    return{
      date:{
        days:"",

        week:"",

        time:""
      }
    }
  },

  created(){
    this.initDate();
  },

  methods:{
    initDate () {
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
        this.initDate();
      },1000)
    },
  },

  beforeDestroy () {
    if (this.timeOut) {
      clearTimeout(this.timeOut) // 在Vue实例销毁前，清除时间定时器
    }
  },
}
</script>

<style lang='scss' scoped>
.custom-timer{
  position: absolute;
  left: 50px;
  top: 40px;
  font-weight: 600;
  color: rgba(184, 195, 242, 1);
}
</style>