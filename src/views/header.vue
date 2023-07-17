<template>
  <div class="header">
    <div class="title">大屏名称</div>
    <div class="examples custom-box-linear" @click="skip">栗子</div>
    <img class="full" src="@/assets/images/fullscreen.png" alt="" @click="$fullScreen">
  </div>
</template>

<script>
export default  {
  data () {
    return {
    };
  },

  created(){
  },

  methods: {
    skip(){
      this.$router.push({path:'/examples'})
    }
  },
}
</script>
<style lang='scss' scoped>
  .examples{
    position: absolute;
    right: 200px;
    top: 15px;
    width: auto;
    cursor: pointer;
    line-height: 30px;
    padding: 0 20px;
    font-size: 14px;
  }
  .full{
    position: absolute;
    width: 30px;
    right: 50px;
    top:10px;
    cursor: pointer;
  }
  
  .header{
    position:relative;
    width: 100%;
    height: 100px;
    text-align: center;
    background: url("~@/assets/images/header.png") no-repeat 0 0/100% 100%;
    .title{
      font-weight: 700;
      letter-spacing: 16px;
      padding-bottom: 20px;
      font-size: 48px;
      background: linear-gradient(to bottom,rgba(235, 247, 254, 0.88) 0%, rgba(255, 255, 255, 0.88) 10%, rgba(103, 151, 232, 0.88) 100%);
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
        background-image: -webkit-linear-gradient(left,rgba(34,123,117,.1) 1%,rgba(255, 255, 255, 0.5) 90%,rgba(255, 255, 255, .9));
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
        background-image: -webkit-linear-gradient(left,rgba(34,123,117,.1) 1%,rgba(255, 255, 255, 0.5) 90%,rgba(255, 255, 255, .9));
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