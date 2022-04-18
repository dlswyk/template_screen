<template>
  <div class="j-flex-col side">
    <div class="first bg-box"></div>

    <div class="second bg-box"></div>

    <div class="third bg-box"></div>

  </div>
</template>

<script>
export default  {
  data(){
    return{
     
    }
  },
  created(){
  
  },
  mounted(){
   
  },
  methods:{
    
  },
}
</script>

<style lang="scss" scoped>
  .side{
    justify-content: space-between;
    .first{
      height: 40%;
    }
    .second{
      position:relative;
      height: 28%;
    }
    .third{
      position:relative;
      height: 28%;
    }
  }
</style>