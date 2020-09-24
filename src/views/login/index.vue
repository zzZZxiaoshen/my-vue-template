<template>
  <div class="login-container">
    <h2 class="title">登入系统</h2>
    <el-form autoComplete="on"
             :model="loginForm"
             :rules="loginRules"
             ref="loginForm" style="width: 80%; margin: auto;">
      <el-form-item prop="userName">
        <mt-field placeholder="用户名："
                  type="text"
                  v-model="loginForm.email"
                  name="userName"
                  autoComplete="on" style="border-radius:5px"></mt-field>
      </el-form-item>
      <el-form-item prop="userPassword">
        <mt-field placeholder="密码："
                  :type="passwordType"
                  v-model="loginForm.password"
                  name="userPassword"
                  autoComplete="on" style="border-radius:5px">
        </mt-field>
      </el-form-item>
      <mt-button
        type="primary"
        size="large"
        @click.prevent="handleLogin">登 录
      </mt-button>
    </el-form>

  </div>
</template>

<script>
  import {getToken,setToken} from '@/utils/auth'

  export default {
    // components: { LangSelect, SocialSign },
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码至少6位'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          email: '',
          password: ''
        },
        loginRules: {
          email: [
            {required: true, trigger: 'blur', validator: validateUsername}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePassword}
          ]
        },
        passwordType: 'password',
        showDialog: false
      }
    },
    mounted: function(){
        console.info( getToken())
        if (getToken()) {
          this.$router.push({path: '/'})
        }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store
              .dispatch('user/LoginByUsername', this.loginForm)
              .then((data) => {
                if (data.code == 0) {
                  setToken(data.data.token)
                  this.$router.push({path: '/'})
                }
              })
              .catch(() => {
                // this.$router.push({path: '/login'})
              })
          } else {
            return false
          }
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  $light_gray: #eee;
  .login-container {
    background-color: #2d3a4b;
    height: 100%;
  }

  .title {
    color: white;
    margin-top: 10%;
  }
</style>
