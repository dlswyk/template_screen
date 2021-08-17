<template>
  <div class="modal">
    <div class="j-full-curbox mask" :class="show?'mask-show':''" @click="cancel"></div>
    <div class="my-dialog j-full-center content" :style="styles" :class="[show?'normal mask-show ':'scale']">
      <div class="my-dialog-container">
         <slot name="container">
          内容
         </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default  {
  props:['styles'],
  data () {
    return {
      show:false
    };
  },
  created () {
    console.log("this.",this.show)
  },
  methods: {
    // 确认
    confirm(){
      this.show = false;
      this.$emit("confirm",confirm);
    },
    //取消
    cancel(){
      this.show = false;
    }
  }
}
</script>
<style lang="scss" scoped>
  .modal{
    .mask{
			opacity: 0;
			transition: all .3s ease-in-out;
			visibility: hidden;
      z-index:1444;
		}
		.mask-show{
			visibility: visible !important;
			opacity: .9 !important;
		}
    .content{
			opacity: 0;
			visibility: hidden;
			transition: all .3s ease-in-out;
			background-color: #fff;
			overflow: auto;
		}
		.scale{
			transform:translate(-50%,-50%) scale(0);
		}
		.normal{
			transform:translate(-50%,-50%) scale(1);
		}
    .my-dialog{
      width:80%;
      height:80%;
      padding:15px;
      background-image: linear-gradient(to right top, #543b99 , #379793);
      border-radius: 5px;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
      min-width: 40%;
      z-index:1444;
      .my-dialog-container{
      }
      .my-dialog-footer{
        text-align: right;
        .my-dialog-footer-cancel{
          border:none;
        }
        & > button{
          margin-left:.1rem;
        }
      }
      & > div{
        padding:14px 16px;
      }
    }
  }
</style>