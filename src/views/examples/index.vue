<template>
  <div class='j-full-curbox map'>
    <div class="examples">
      <p :class="{active:item == com}" class="custom-box-linear" v-for='(item,index) in cmps' :key='index' @click="change(item)">{{item}}</p>
    </div>
    
    <div class="echart custom-box-linear">
      <keep-alive>
        <component :is='com'></component>
      </keep-alive>
    </div>

  </div>

</template>

<script>
const requireComponent = require.context('./', false, /\w+.(vue|js)$/)
const cmps = {};
// 排除
const filterCmps = ['index'];
// 遍历得到组件路径
requireComponent.keys().forEach(fileName => {
  // 组件内容
  const cmp = requireComponent(fileName).default;

  // 以文件名作为名称
  let cmp_ = fileName.slice(2,-4);

  !filterCmps.includes(cmp_) && (cmps[cmp_] = cmp)
})

export default {
  components:{
    ...cmps
  },
  data () {
    return {
      cmps:[],

      com:''
    };
  },

  created(){
    for (const key in cmps) {
      this.cmps.push(key);
    }
    this.com = this.cmps[0];
  },


  methods: {
    change(com){
      this.com = com;
    }
  }
}
</script>
<style lang='scss' scoped>
  .map{
    padding-top: 50px;
    .examples{
      width: 800px;
      margin: auto;
      text-align: center;
      p{
        width: auto;
        padding: 0 15px;
        font-size: 16px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        &:hover{
          opacity: .8;
        }
        &.active{
          color: #fff;
          background-image:linear-gradient(to top,rgba(185, 120, 255, .1),rgba(185, 120, 255, .2));
        }
      }
    }

    .echart{
      display: block;
      width: 800px;
      height: 400px;
      margin:20px auto;
      box-shadow: 0 0 2px #fff;
    }
  }
</style>