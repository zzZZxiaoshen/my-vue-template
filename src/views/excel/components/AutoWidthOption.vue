<template>
  <div style="display: inline-block">
    <label class="radio-label">Cell Auto-Width: </label>
    <el-radio-group v-model="autoWidth">
      <el-radio :label="true" border>
        True
      </el-radio>
      <el-radio :label="false" border>
          False
      </el-radio>
    </el-radio-group>

  </div>
</template>

<script>
    export default {
        name: "AutoWidthOption",
        props:{
          value: {
            type: Boolean,
            default: true
          }
        },
        //计算属性与watch 比较 ，计算属性一般用于初始化的事件节点，watch 是监听某个属性的变化的场景
        computed:{
          autoWidth:{
            get(){
              return this.value
            },
            set(val){
              this.$emit('input',val)
            }
          }

        }
    }
</script>

<style scoped>

</style>
