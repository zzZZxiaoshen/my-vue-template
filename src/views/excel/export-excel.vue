<template>
  <div class="app-container">
  <FilenameOption  v-model="filename"/>
  <AutoWidthOption v-model="autoWidth"/>
  <BookTypeOption v-model="bookType"/>
  <el-button :loading="downloadLoading"  style="margin:0 0 20px 20px;" type="primary"
  icon="el-icon-document" @click="handleDownload"/>
  </div>
</template>

<script>
 import  FilenameOption from './components/FilenameOption'
 import  AutoWidthOption from './components/AutoWidthOption'
 import  BookTypeOption from './components/BookTypeOption'


    export default {
        name: "export-excel",
        components:{FilenameOption,AutoWidthOption,BookTypeOption},
        data(){
          return {
            filename: '',
            autoWidth:true,
            bookType: 'xlsx',
            downloadLoading:false,

          }
        },
        methods:{
          //点击导出excel
          handleDownload(){

          }
        }
    }
</script>

<style >
  .radio-label {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 30px;
  }
</style>
