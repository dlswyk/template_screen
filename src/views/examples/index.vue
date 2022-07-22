<template>
  <div class='j-full-curbox map'>
    <div class="examples">
      <p :class="{active:item == com}" v-for='(item,index) in cmps' :key='index' @click="change(item)">{{item}}</p>
    </div>
    
    <div class="echart">
      <component :is='com'></component>
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
    background: linear-gradient(180deg, rgba(110, 181, 223, 0.2) 0%, rgba(132, 219, 235, 0.2) 100%);
    .examples{
      padding-top: 50px;
      width: 800px;
      margin: auto;
      text-align: center;
      p{
        display: inline-block;
        cursor: pointer;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 5px 10px;
        border-radius: 40px;
        text-align: center;
        background-color: #fff;
        box-sizing: border-box;
        color: #f33;
        &.active{
          color: #fff;
          background-color: #f33;
        }
      }
    }

    .echart{
      width: 800px;
      height: 600px;
      margin:20px auto;
      box-shadow: 0 0 2px #fff;
    }
  }
</style>