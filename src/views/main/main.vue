<template>
  <div class="j-flex-col main">
    <div style="flex:1;position:relative;">
      <Map></Map>
    </div>


    <div class="footer bg-box">
      <Footer></Footer>
    </div> 
    

   
  </div>
</template>

<script>
import Map from '@components/map/map.vue'
import Footer from '@views/footer/footer.vue'
export default  {
  components:{
    Map,
    Footer
  },
  data(){
    return{
      
    }
  },
  created () { 
  },

  methods:{
    
  }
}
</script>

<style lang="scss" scoped>
  .main{
    justify-content: space-between;
    .footer{
      flex:.27;
    }
  } 
</style>