<template>
  <div class="j-flex-col side text-color-grey">
    <div class="first custom-box"></div>

    <div class="second custom-box"></div>

    <div class="third custom-box"></div>
     
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
      height:28%;
    }
    .second{
      height: 47%;
    }
    .third{
      height: 22%;
    }
  }
  
</style>