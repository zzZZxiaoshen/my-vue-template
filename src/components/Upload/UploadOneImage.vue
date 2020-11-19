<template>
    <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="action"
            :show-file-list="false"
            :on-success="uploadAvatar">
        <img v-if="dialogImageUrl" :src=dialogImageUrl class="avatar">
        <i v-else :class="isShow?'el-icon-plus avatar-uploader-icon':'el-icon-upload avatar-uploader-icon'"></i>
    </el-upload>

</template>

<script>
  import { getToken ,TokenKey} from '@/utils/auth'

    export default {
        name: "uploadOneImage",
        props:{
            imageUrl:{
                type:String,
                default:''
            },
            isShow:{
              type:Boolean,
              default:false
            }
        },
        data(){
            return {
                dialogImageUrl: undefined,
                action: `${process.env.VUE_APP_BASE_API}/api/upload/image`
            }
        },
        created() {
          this.dialogImageUrl= this.imageUrl === '' ? this.dialogImageUrl : this.imageUrl
        },
        computed: {
            headers() {
                return {
                  [TokenKey]:getToken()
                }
            }
        },
        methods:{
            uploadAvatar: function(res) {
                if(res.code === 0){
                    this.dialogImageUrl = res.data.path
                    this.$emit('onSuccess',res.data.path)
                }else{
                    this.$message.error('图片上传失败,请联系管理员')
                }
            },
        },

    }
</script>

<style >
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 148px;
        height: 148px;
        line-height: 148px;
        text-align: center;
    }
    .avatar {
        width: 148px;
        height: 148px;
        display: block;
    }

</style>
