<template>
  <div class="my-pagination">
    <div v-if="total == 0" >
      <div class="nodata"></div>
      暂无数据
    </div>
    
    <div class="j-flex-a" v-if="total != 0">
      <!-- total 总数 -->
      <div class="total">共{{total}}条</div>

      <div class="curp" :class="{ban:currentPage_ == 1}" @click="pre">上一页</div>
      
      <!--computed同个页面    共用同一个组件  用来清空每次切换后  当页码为父组件穿过来的值-->
      <div style="display:none;">{{currentPages}}</div>

      <ul class="j-flex-a">
        <li :class="{'active':currentPage_==index+1}" v-for="(item,index) in pageList" :key="index" @click="currentPage_ = index+1" >{{index+1}}</li>
      </ul>

      <div class="curp" @click="next" :class="{'ban':currentPage_ == pageList.length}">下一页</div>
    </div>
  </div>
</template>

<script>
export default {
  //通过props来接受从父组件传递过来的值
  props: {
    // 当前展示页数
    currentPage:{
      type:Number,
      default:2
    },

    //每页显示条数
    pageSize: {
      type: Number,
      default: 10,
    },

    // 每页条数
    pageSizes: {
      type: Array,
      default: ()=>[],
    },

    //总数
    total: {
      type: Number,
      default: 1,
    },
    
    // 最大页码按钮数 页码按钮的数量 当总页码超过会折叠
    pagerCount:{
      type:Number,
      default:4
    },

    // 显示的按钮
    layout:''
  },

  data(){
    return{
      // 当前页
      currentPage_:this.currentPage
    }
  },

  computed: {
    // 计算出一共多少页
    pageList(){
      let arr = [];

      arr.length = Math.ceil(this.total / this.pageSize)

      return arr;
    },

    // ！！！共用 当前组件  切换后  每次页码变更为父组件传值页码
    currentPages(){
      return this.currentPage_ = this.currentPage;
    }
  },

  created () {
   
  },


  methods: {
    // 上一页
    pre(){
      this.currentPage_--;
    },

    // 下一页
    next(){
      this.currentPage_++;
    }


  },

  watch:{
    currentPage_(newOld){
      this.$emit("current-change",newOld);
    },

    
  }


  
};
</script>


<style lang="scss" scoped>
  .active{
    color:#108ee9 !important;
  }

  .curp{ cursor:pointer;}
  
  .ban{pointer-events:none}

  .j-flex-a{
    display:flex;
    align-items:center;
  }

  .my-pagination{
    display inline-block;
    margin:0 auto;
    color:#fff;
    .nodata{
      width: 400px;
      height: 400px;
      margin: 20px auto;
    }
    .total{
      margin-right:20px;
    }
    ul{
      margin:0 20px;
      li{
        margin:0 10px;
        cursor:pointer;
      }
    }
   
  }
</style>