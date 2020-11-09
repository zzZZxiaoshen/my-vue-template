<template>
    <span style="padding: 0 10px">
<!--      对话框-->
    <el-dialog :title="title" :visible.sync="visible" :modal="false">
   <el-form
     :model="formData"
     label-position="left"
     label-width="70px"
     style="width: 400px; margin-left:50px;"
   >
          <el-form-item label="标题">
              <el-input v-model="formData.title" disabled/>
            </el-form-item>
          <el-form-item label="图片">
           <upload-one-image
             @onSuccess="onUploadSuccess"
             :imageUrl=formData.image
             :isShow="false"
           > </upload-one-image>
          </el-form-item>
           <el-form-item label="地址">
            <el-input v-model="formData.address" disabled/>
          </el-form-item>
        <el-form-item label="活动状态">
            <el-select v-model="formData.status" placeholder="活动状态" style="width: 100%" disabled>
              <el-option label="结束" value="0"></el-option>
              <el-option label="开始" value="1"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="活动类型">
           <el-select v-model="formData.tabType.typeName" placeholder="活动类型" style="width: 100%" disabled>
            </el-select>
        </el-form-item>
         <el-form-item label="开始时间">
           <el-input v-model="formData.startTime" disabled />
        </el-form-item>
        <el-form-item label="结束时间">
             <el-input v-model="formData.endTime" disabled />
        </el-form-item>
         <el-form-item label="人数">
             <el-input v-model="formData.amount" disabled />
        </el-form-item>
         <el-form-item label="描述">
             <el-input v-model="formData.describe" disabled />
        </el-form-item>
   </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">
            关闭
        </el-button>
    </div>
    </el-dialog>
     <span @click="visible = true">
      <slot />
    </span>
    </span>

</template>

<script>
  import UploadOneImage from "@/components/Upload/UploadOneImage"
  import { parseTime } from '@/utils'

  export default {
    name: "PreviewDialog",
    components:{UploadOneImage},
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        formData: {},
        visible: false,
      }
    },
    created() {
      this.formData = Object.assign({}, this.data)
      this.formData.status = this.formData.status == "0" ? '已结束' : '进行中'
      this.formData.startTime =parseTime(this.formData.startTime, '{y}-{m}-{d} {h}:{i}');
      this.formData.endTime =parseTime(this.formData.endTime, '{y}-{m}-{d} {h}:{i}');
    },
    methods:{
      onUploadSuccess(path){
        //上传成功之后设置渲染的数据
        this.formData.image =path
      }
    }
  }
</script>

<style scoped>

</style>
