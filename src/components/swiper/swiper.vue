<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot name="container">
        你好
      </slot>
    </div>
  </div>
</template>

<script>
export default  {
  props:["imgs"],
  data () {
    return{
      
    }
  },
  created () {
    
  },
  mounted () {
    this.init();
  },
  methods: {
    init(){
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay : true
      }) 
    }
  }
}
</script>
<style scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
    height: 100%;
  }

</style>