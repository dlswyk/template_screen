<template>
  <div class="header">
    <div>大屏名称</div>
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
    height: 50px;
    margin:19px auto;
    font-size: 24px;
    text-align: center;
    color:#a1c9cc;
    text-shadow: 0 0 20px #386e79;
  }
</style>