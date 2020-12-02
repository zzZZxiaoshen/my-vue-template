<template>
  <div class="createPost-container">
    <el-form :model="postForm"  label-width="80px" :rules="rules"   ref="postForm"    >
      <sticky :z-index=10 :class-name="'sub-navbar '  + postForm.status">
        <el-button v-if="!isEdit"  >显示帮助</el-button>
        <el-button v-loading="loading"
                   style="margin-left: 10px" type="success"
                   class="submit-btn"
                   @click="onSubmit">
          {{ isEdit ? '编辑活动' : '新增活动' }}
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
            <Warning/>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="image" label="图片上传" style="margin-bottom: 0;" required>
                    <upload-one-image
                      @onSuccess="onUploadSuccess"
                      :imageUrl=postForm.image
                      :isShow="false"
                    > </upload-one-image>
                  </el-form-item>
                </el-col>
              </el-row>
            <el-form-item  style="margin-bottom: 40px;" prop="title" required>
              <el-row>
                <el-col :span="24">
                  <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                    标题
                  </MDinput>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="活动类型">
              <el-select v-model="postForm.type" placeholder="活动类型" @change="onSelectChange">
                <el-option v-for="option in typeList" :label="option.label"
                           :value="option.value" >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address" required>
              <el-input type="input" v-model="postForm.address"></el-input>
            </el-form-item>
            <el-form-item label="活动时间" required>
              <el-col :span="11">
                <el-form-item prop="startTime">
                  <el-date-picker type="date" placeholder="选择开始日期" v-model="postForm.startTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endTime">
                  <el-date-picker placeholder="选择结束日期" v-model="postForm.endTime" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="活动状态" prop="status">
              <el-switch v-model="postForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="人数" prop="amount" required>
              <el-input type="input" v-model="postForm.amount"></el-input>
            </el-form-item>
          <el-form-item label="label" prop="label" required>
            <el-input type="input" v-model="postForm.label"></el-input>
          </el-form-item>
          <el-form-item label="描述" >
            <el-input type="textarea" v-model="postForm.describe"></el-input>
          </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('postForm')">立即创建</el-button>
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
  import UploadOneImage from "@/components/Upload/UploadOneImage"
  import Warning from "./Warning"
  import {createActive,updateActive,getActiveData} from "../../../api/active";
  import {validURL} from "../../../utils/validate";
  import {ymdFromat} from "../../../utils/calendar";

  const mappingRule = {
    title:"标题",
    address:"地址",
    startTime:"开始时间",
    endTime:"结束时间",
    amount:"人数",
    label:"标签",
    image:"图片"
  }

  const defaultForm = {
    title:'',//标题
    label:'',//标签
    image:'',//图片
    address:'',//地址
    status:'',//状态
    startTime:'',//开始时间
    endTime:'',//结束时间
    amount:'',//人数
    describe:'',//描述
    type:''//活动类型
  }

    export default {
        name: "detail" ,
        components:{MDinput,Sticky,UploadOneImage,Warning},
        props:{
          isEdit: {
            type: Boolean,
            default: false
          }
        },
      created() {
        if (this.isEdit) {
          const id = this.$route.params && this.$route.params.id
          this.getActive(id);
        }

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
              image:'',//图片
            },
            loading: false,
            rules: {
              title: [{validator: validateRequire}],
              address:[{validator: validateRequire}],
              image:[{validator: validateSourceUri}],
              startTime:[{validator: validateRequire}],
              endTime:[{validator: validateRequire}],
              amount:[{validator: validateRequire}],
            },
            typeList:[{label:'万里',value:9}
                ,{label:'长城',value:10}
                ,{label:'自由',value:11}
                ,{label:'自在',value:12}]
          };
        },

      methods: {


// ------------------------------------------------ 功能函数-------------------------
        toDefault() {
          this.postForm = Object.assign({}, defaultForm)
        },

        setData(data){
          const {
            image,
            title,
            tabType,
            address,
            startTime,
            endTime,
            status,
            amount,
            label,
            describe
          } =data

          this.postForm = {
            image,
            title,
            address,
            startTime,
            endTime,
            status,
            amount,
            label,
            describe
          }
          this.postForm.type = tabType.typeName;
          this.postForm.status= status ===1
        },

//---------------------------------------------------网络请求---------------------------------
        getActive(id) {
          getActiveData({id:id}).then(res=>{
            this.setData(res.data.data)
          })
        },

//---------------------------------------------------事件绑定---------------------------------
        //表单提交
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            function buildActive(active,typeList) {
              active.status = active.status ? 0 : 1;
              active.startTime = ymdFromat(active.startTime)
              active.endTime = ymdFromat(active.endTime)
              active.describe = active.describe ===undefined? '暂无' : active.describe;
              const type= typeList.find(function (item) {
                if (item.label===active.type.replace(/\s+/g,"")) {
                return item
                }
              })
              active.type = type.value
            }

            if (valid) {
              this.loading = true;
              const active = Object.assign({}, this.postForm);
              //修改状态属性
              buildActive(active,this.typeList)
              if (!this.isEdit) {
                // 新增活动
                createActive(active).then(res => {
                  console.log('createActive', res)
                  this.loading = false;
                  this.$notify({
                    title: '成功',
                    message: res.msg,
                    type: "success",
                    duration: 2000
                  });
                  this.$router.push('/active/list')
                }).catch(() => {
                  this.loading = false
                });
              } else {
                //编辑书籍
                updateActive(active).then(res=>{
                  console.log('updateActive', res)
                  this.loading = false;
                  this.$notify({
                    title: '成功',
                    message: res.msg,
                    type: "success",
                    duration: 2000
                  });
                  this.$router.push('/active/list')
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
          this.postForm.image =url
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
    }
  }
</style>
