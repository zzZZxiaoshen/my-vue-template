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
          <el-form-item label="用户名">
              <el-input v-model="formData.username" disabled/>
            </el-form-item>
          <el-form-item label="头像">
                <upload-one-image
                  @onSuccess="onUploadSuccess"
                  :imageUrl=formData.avatar
                  :isShow="false"
                > </upload-one-image>
          </el-form-item>
       <el-form-item label="创建时间">
           <el-input v-model="formData.gmtCreate" disabled />
        </el-form-item>
        <el-form-item label="用户状态">
            <el-select v-model="formData.deleted" placeholder="用户状态" style="width: 100%" disabled>
              <el-option label="禁用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="描述">
             <el-input v-model="formData.desc" disabled />
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
      this.formData.status = this.formData.deleted == "0" ? '禁用' : '启用'
      this.formData.gmtCreate =parseTime(this.formData.gmtCreate, '{y}-{m}-{d} {h}:{i}');
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
