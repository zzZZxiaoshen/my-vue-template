<template>
  <div style="display:inline-block;">
    <label  class="radio-label" style="padding-left:0;">Filename:</label>
    <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)"
    style="width:345px;"  prefix-icon="el-icon-document"></el-input>
  </div>

</template>

<script>
    export default {
        name: "FilenameOption",
        props:{
          value:{
            type: String,
            default: ''
          }
        },
        computed :{
          filename:{
            get(){
              return this.value
            },
            set(val) {
            //v-model 的语法糖本质绑定的是input事件
              this.$emit('input', val);
            }
          }
        }
    }
</script>

<style scoped>

</style>
