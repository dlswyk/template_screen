<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <slot>
      <swiper-slide>I'm Slide 1</swiper-slide>
      <swiper-slide>I'm Slide 2</swiper-slide>
      <swiper-slide>I'm Slide 3</swiper-slide>
    </slot>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</template>

<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true,

        // 自动播放
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        
        //初始化显示
        initialSlide :1,

        // 设定为true时，active slide会居中，而不是默认状态下的居左。
        centeredSlides: true,

        // 设置slider容器能够同时显示的slides数量
        slidesPerView: 1,
  
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
   
  }
};
</script>

<style> 
  .swiper-slide{
    height: auto;
    color: #000;
    font-size: 16px;
    transition: all .3s;
    /* transform: scale(0.5) */
  }
  .swiper-slide-active{
    /* z-index: 999 !important; */
    /* transform: scale(1) */
  }
  /* 小圆球 */
  .swiper-pagination{
    display: none;
  }
  .swiper-pagination-bullet-active{
    opacity: 0;
    background: #07f5b2 !important;
  }
</style>