<template>
  <div>
    <el-card header="请先登录" class="login_card">
      <el-form :model="model" :rules="loginRules" ref="loginRef" @submit.native.prevent="login">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {},
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 ~ 15 个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async login () {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return
        const res = await this.$http.post('login', this.model)
        sessionStorage.token = res.data.token
        this.$router.push('/')
        this.$message.success('登录成功')
      })
    }
  }
}
</script>

<style scoped>
.login_card{
  margin: 5rem auto;
  width: 25rem;
}
</style>
