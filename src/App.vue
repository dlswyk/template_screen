<template>
  <div id="app">
    <ScreenAdapter>
      <video src="@/static/video/bg.mp4?v=1.0.0" autoplay="autoplay" loop="loop" muted="muted" width="100%" height="100%" class="bg_video"></video>
      <router-view/>
    </ScreenAdapter>
    
  </div>
</template>

<script>

import ScreenAdapter from "@/components/ScreenAdapter/index.vue"
export default{
  components:{
    ScreenAdapter
  }
}
</script>


<style lang="scss">
  @import url('~@/static/css/common.css');
  
  #app{width: 100%;height: 100%;background:rgba(221,221,221,.2);}

  .bg_video{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  
  /* 每块渐变色 */
  .bg-box{padding: 30px 25px 10px;box-sizing: border-box; background: linear-gradient(180deg, rgba(223, 10, 10, 0.2) 0%, rgba(226, 14, 28, 0.2) 100%);}

  /* 每块颜色标题 */
  .title{font-size: 20px;font-family: Songti SC;font-weight: 900;;background: linear-gradient(180deg, #CCD9E1 39.4287109375%, #5DABCE 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;}

</style>
