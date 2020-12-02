<template>
  <div class="createPost-container">
    <el-form :model="postForm"  label-width="80px" :rules="rules"   ref="postForm"    >
      <sticky :z-index=10 :class-name="'sub-navbar '  + postForm.status">
        <el-button v-if="!isEdit"  >显示帮助</el-button>
        <el-button v-loading="loading"
                   style="margin-left: 10px" type="success"
                   class="submit-btn"
                   @click="onSubmit">
          {{ isEdit ? '编辑用户' : '新增用户' }}
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
            <Warning/>
            <el-form-item  style="margin-bottom: 40px;" prop="username" required>
              <el-row>
                <el-col :span="24">
                  <MDinput v-model="postForm.username"  :maxlength="100" name="name" required>
                   用户名
                  </MDinput>
                </el-col>
              </el-row>
            </el-form-item>

          <el-row>
            <el-col :span="6">
              <el-form-item label="用户状态" prop="deleted" label-width="90px" class="postInfo-container-item">
                <el-switch v-model="postForm.deleted"></el-switch>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="tel" prop="tel" required label-width="120px" class="postInfo-container-item">
                <el-input type="input" v-model="postForm.tel"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="email" prop="email" required label-width="90px" class="postInfo-container-item">
                <el-input type="input" v-model="postForm.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="角色">
            <el-select v-model="postForm.ids"  label-width="90px" style="width:150px"  size="small" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="content" label="用户描述" style="margin-top:30px;margin-bottom: 30px;">
            <Tinymce ref="editor" v-model="postForm.desc" :height="400" />
          </el-form-item>

          <el-form-item prop="avatar" style="margin-bottom: 0;" required>
            <upload-user-image
              @onSuccess="onUploadSuccess"
              :imageUrl=postForm.avatar
              :isShow="false"
            > </upload-user-image>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('postForm')">确定</el-button>
            <el-button @click="resetForm('postForm')">重置</el-button>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>

  import MDinput from "@/components/MDinput/index";
  import Sticky from "@/components/Sticky/index";
  import Tinymce from '@/components/Tinymce'
  import UploadUserImage from "@/components/Upload/UploadUserImage"
  import Warning from "./Warning"
  import {getUser,updateUser,listAllRole} from "../../../../api/sys";
  import {validURL} from "../../../../utils/validate";
  import {ymdFromat} from "../../../../utils/calendar";

  const mappingRule = {
    username:"用户名",
    tel:"电话",
    email:"邮箱",
  }

  const defaultForm = {
    username:'',//标题
    avatar:'',//头像
    deleted:'',//状态
    desc:'',//描述
  }

    export default {
        name: "detail" ,
        components:{MDinput,Sticky,UploadUserImage,Warning,Tinymce},
        props:{
          isEdit: {
            type: Boolean,
            default: false
          }
        },
      created() {
        if (this.isEdit) {
          const email = this.$route.params && this.$route.params.email
          this.getUser(email);
        }
        // 加载角色列表数据
        this.getAllRoles();
      },
        data(){
          const validateRequire = (rule, value, callback) => {
            if (value === '') {
              this.$message({
                message: mappingRule[rule.field] + '为必传项', type: 'error'
              })
              callback(new Error(mappingRule[rule.field] + '为必传项'))
            } else {
              callback()
            }
          }
          const validateSourceUri = (rule, value, callback) => {
            if (value) { //校验uri 是否为正确 但是不是必填项
              if (validURL(value)) {
                callback()
              } else {
                this.$message({
                  message: '外链url填写不正确',
                  type: 'error'
                })
                callback(new Error('外链url填写不正确'))
              }
            } else {
              callback()
            }
          };
          return {
            postForm: {
              avatar:'http://cdn.jiachang8.com/Fh0WS5cABxWsjJBc87i_cz2xqbIi',//图片
            },
            loading: false,
            rules: {
              username: [{validator: validateRequire}],
              avatar:[{validator: validateSourceUri}],
            },
            options:[],
          };
        },

      methods: {

// ------------------------------------------------ 功能函数-------------------------
        toDefault() {
          this.postForm = Object.assign({}, defaultForm)
        },

        setData(data){
          const {
            id,
            username,
            avatar,
            deleted,
            desc,
            tel,
            email,
            roles
          } =data
          //转换后端返回角色数据格式 用于页面渲染
          let ids = []
          for (const role of roles) {
            ids.push(role.id)
          }
          this.postForm = {
            id,
            username,
            avatar,
            deleted,
            desc,
            tel,
            email,
            ids
          }
            this.postForm.deleted= deleted ===1
        },

//---------------------------------------------------网络请求---------------------------------
        getUser(email) {
          getUser({email:email}).then(res=>{
            this.setData(res.data.data)
          })
        },
        getAllRoles(){
          listAllRole().then(res=>{
          const roles = res.data.data
            for (const role of roles) {
              const option ={
                value:role.id,
                label:role.roleName,
              }
              this.options.push(option)
            }
          })
        },
//---------------------------------------------------事件绑定---------------------------------
        //表单提交
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            function buildUser(user) {
              user.deleted = user.deleted ? 1 : 0;
              user.desc = fnCleanStrTags(user.desc)
              if (user.ids) {
                let idsStr = user.ids.join(",");
                user.ids=idsStr
              }
            }
             function fnCleanStrTags (str) {
              let s = str.replace(/<.*?>/ig,"");
              return s;
            }
            if (valid) {
              this.loading = true;
              const user = Object.assign({}, this.postForm);
              //修改状态属性
              buildUser(user)
              if (!this.isEdit) {
                // 新增用户
                createUser(user).then(res => {
                  console.log('createUser', res)
                  this.loading = false;
                  this.$notify({
                    title: '成功',
                    message: res.msg,
                    type: "success",
                    duration: 2000
                  });
                  this.$router.push('/sys/user/list')
                }).catch(() => {
                  this.loading = false
                });
              } else {
                //编辑用户
                updateUser(user).then(res=>{
                  console.log('updateUser', res)
                  this.loading = false;
                  this.$notify({
                    title: '成功',
                    message: res.msg,
                    type: "success",
                    duration: 2000
                  });
                  this.$router.push('/sys/user/list')
                }).catch(() => {
                  this.loading = false
                });
              }
            } else {
              console.log('error submit!!');
              return callback()
            }
          });
        },
        resetForm(formName) {
          this.toDefault();
        },
        //表单提交
        onSubmit(){

        },
        //图片上传回调函数
        onUploadSuccess(url){
          console.log("图片上传成功:"+url)
          this.postForm.avatar =url
        },
        // 下拉框事件
        onSelectChange(option){
        //强制刷新vue框架视图 否则数据改了视图没有改变 双向绑定不起作用
          this.$forceUpdate();
        }
      },

    }
</script>

<style scoped lang="scss">
  .createPost-container {
     position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .line{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .postInfo-container-item {
        float: left;
      }
    }
  }
</style>
