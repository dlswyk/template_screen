<template>
  <!-- j-flex-col display锤子布局 j-full-curbox当前盒子充满父级元素-->
  <div class="j-flex-col j-full-curbox">
    
    <Header class="header"></Header>

    <div class="container">
      <!--左侧 -->
      <Left class="sider-left"></Left>
      <!-- 中间主题 -->
      <Main class="main"></Main>
      <!-- 右侧 -->
      <Right class="sider-right"></Right>
    </div>
  </div>
</template>

<script>
import Header from './header.vue'
import Left from './left.vue'
import Right from './right.vue'
import Main from './main.vue'
export default  {
  components:{
    Header,
    Left,
    Right,
    Main
  },
  created(){
   
  },
  methods:{
   
  },
}
</script>

<style lang="scss" scoped>
  .bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .8;
  }
  .container{
    flex: 1;
    display: flex;
    justify-content: space-around;
    margin:0 1% 0.2rem;
    //  使用flex布局  给子元素 设置一个具体值或百分比比例(注意)  不然echart不自适应
    .sider-left{
      flex:.25;
    }
    .sider-right{
      flex:.25;
    }
    .main{
      flex:.48;
    }
  }
 
</style>