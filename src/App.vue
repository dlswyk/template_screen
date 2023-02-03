<template>
  <div id="app">
    <ScreenAdapter>
      <video  loop muted width="100%" height="100%" autoplay  class="bg_video" x5-playsinline="true" playsinline="true" webkit-playsinline="true" x5-video-player-type="h5">
        <source src="@/assets/video/bg.mp4" type="video/mp4">
      </video>
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
  @import url('~@/assets/css/common.css');
  
  #app{width: 100%;height: 100%;background:rgba(221,221,221,.2);}

  // 注意使用视频作为背景图在平板上可能有问题
  .bg_video{position: absolute;left: 0;top: 0;width: 100%;height: 100%;object-fit: cover;}

  /* 每块渐变色 */
  .bg-box{padding: 30px 25px 10px;box-sizing: border-box; background: linear-gradient(180deg, rgba(110, 181, 223, 0.2) 0%, rgba(132, 219, 235, 0.2) 100%);}

  /* 每块颜色标题 */
  .title{font-size: 20px;font-family: Songti SC;font-weight: 900;;background: linear-gradient(180deg, #CCD9E1 39.4287109375%, #5DABCE 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;}

</style>
