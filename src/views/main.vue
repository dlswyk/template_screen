<template>
  <div class="j-flex-col main">
    <div class="first" style="position:relative;">
      <Map3D></Map3D>
    </div>


    <div class="second bg-box">
      <Footer></Footer>
    </div> 
    

   
  </div>
</template>

<script>
import Map3D from '@/components/map/gl-3d.vue'
// import Map3D from '@/components/map/gl-region.vue'
import Footer from '@/views/footer.vue'
export default  {
  components:{
    Map3D,
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
    .first{
      flex: .7;
    }
    .second{
      flex:.27;
    }
  } 
</style>