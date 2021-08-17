<template>
  <!-- 如果想要操作列  必须传入operation字段  作为操作列 -->
  <div class="table">
    <!-- 表格标题 -->
    <div class="table-row table-title">
      <div class="table-column table-column-th" v-for='(item,index) in column' :key='index'>
        {{item.title}}
      </div>
    </div>
    <!-- 表格列表 -->
    <div class="table-row" v-for='(row,index) in dataList' :key='index'>
      <div class="table-column" v-for='col in column' :key="col.title+index" :style="{width:1/column.length*100+'%'}">
        <!-- 处理点击能够动态修改本行数据 -->
        <input v-show="col.id!='index' && col.id != 'operation'" type="text" v-model="input[col.id]" v-if="currentIndex === index" />
        <span v-else class="text-wrap">{{col.id=='index'?index:row[col.id]}}</span>

        <!-- 操作列 tableAction:操作按钮组件-->
        <div class="table-column-action" v-if="col.id == 'operation'">
          <!-- 默认功能按钮 -->
          <div v-if="defalut">
            <div v-show="show || currentIndex!=index">
              <button class="el-button mr-5" @click="handleEdit(row,index)">修改</button>
              <button class="el-button el-button-danger" @click="handleDel(index)">删除</button>
            </div>
            <div v-show="!show && currentIndex==index">
              <button class="el-button mr-5" @click="handleSave(index)">保存</button>
              <button class="el-button" @click="handlecCancel">取消</button>
            </div>
          </div>

          <div v-if="!defalut">
            <slot v-bind="{row:row,index:index}"></slot>
          </div>
        </div>
        
      </div>
    </div>
  </div>

</template>

<script>
export default  {
  props: ["config"],
  data() {
    return {
      // 使用默认按钮
      defalut:this.config?this.config.defalut:0,

      // 操作按钮的显示与隐藏
      show:true,

      // 当前点击操作按钮index
      currentIndex: -1,

      // 存储所选当前行数据
      input:{},

      // 表格头部配置项
      column:this.config.column,

      // 表单列表数据
      dataList:this.config.columnList
    };
  },

  created(){
    // this.getData();
    console.log("this.tableConfig",this.config);
    // console.log("this.dataList",this.dataList);
  },


  methods: {
    // 修改按钮
    handleEdit(row, index) {
      for(var item in row){
        this.input[item] = row[item];
      }
      this.show = false;
      this.currentIndex = index;
    },

    // 删除按钮
    handleDel(index){
      this.dataList.splice(index,1);
    },
    // 保存按钮
     handleSave(index) {
      for(var item in this.input){
        this.dataList[index][item] = this.input[item];
      }
      this.currentIndex = -1;
    },

    // 取消按钮
    handlecCancel(){
      this.currentIndex = -1;
    },
    
  },

  watch:{
    // 监听父组件传值
    tableConfig:{
      handler(newVal,oldVal){
        console.log("newval",newVal);
        this.dataList = newVal.columnList;
      },
      deep: true
    }
  },

};
</script>
<style lang='scss' scoped>
  .table{
    width:100%;
    height:100%;
    display:table;
    text-align:left;
    color:#515a6e;
    border:1px solid #e8eaec;
    border-collapse: collapse;
    .table-row{
      display:table-row;
      &:hover{
        background: rgba(0,0,0,.05);
      }
      .table-column{
        height: 48px;
        display:table-cell;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        padding:0 15px;
        vertical-align: middle;
      }
      .table-column-th{
        font-weight: bold;
        color:#515a6e;
      }
      .table-column + .table-column{
        border-left:1px solid #e8eaec; 
      }
    }
    .table-row + .table-row{
      border-top:1px solid #e8eaec;
    }
    input{
      display: inline-block;
      width: 100%;
      height: 32px;
      line-height: 1.5;
      padding: 4px 7px;
      font-size: 14px;
      border: 1px solid #dcdee2;
      border-radius: 4px;
      color: #515a6e;
      background-color: #fff;
      background-image: none;
      position: relative;
      cursor: text;
      transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    }
  }
</style>