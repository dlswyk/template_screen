<template>
  <div class="header">
    <div class="title">大屏名称</div>
  </div>
</template>

<script>
export default  {
  data () {
    return {
    };
  },

  created(){
    this.loadImg();
  },

  methods: {
    loadImg(){
      this.show = true;
    }
  }
}
</script>
<style lang='scss' scoped>
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