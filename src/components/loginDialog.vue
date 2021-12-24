<template>
  <el-button type="primary" size="small" @click="dialogVisible = true">登录</el-button>
  <el-dialog
    v-model="dialogVisible"
    title="登录后内容更精彩"
    width="40%"
    :before-close="handleClose"
  > 
    <div class="box" :class="rotate ? 'flip' : ''"> 
    <el-card shadow="never" class="login">
      <el-row>
        <el-col :span="14">
        <el-form
          :rules="rules"
          ref="fromV"
          :model="ruleForm"
        >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
           type="password" 
          ></el-input>
        </el-form-item>
        <el-form-item >
          <el-checkbox label="是否同意《用户协议》和《隐私政策》" name="type"></el-checkbox>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
        <div class="flex">
          <el-link type="primary"  @click="rotate = !rotate">注册</el-link>
          <el-link type="primary">忘记密码</el-link>
        </div>
      </el-form>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-card>
    <el-card shadow="never" class="register">
      <el-row>
        <el-col :span="14">
        <el-form
          :rules="rules"
          ref="fromV"
          :model="ruleForm"
        >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            placeholder="请输入密码"
           type="password" 
          ></el-input>
        </el-form-item>
        <el-form-item >
          <el-checkbox label="是否同意《用户协议》和《隐私政策》" name="type"></el-checkbox>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" style="width:100%">注册</el-button>
        </el-form-item>
        <div class="flex">
          <el-link type="primary" @click="rotate = !rotate">登录</el-link>
          <el-link type="primary">忘记密码</el-link>
        </div>
      </el-form>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-card>
  </div>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from "@vue/runtime-core";
import { ElMessageBox } from 'element-plus'
// import MyInput from './input.vue'

export default defineComponent({
  name: 'loginDialog',
  // components: {
  //   MyInput
  // },
  setup() {
    const dialogVisible = ref(false)
    const rotate = ref(false)
    let fromV = ref(null)
    const ruleForm = reactive({
      username: '',
      password: ''
    })
    // const username = ref('') 
    // const password = ref('') 

    const rules = {
      username: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
        { pattern: /^w+$/, message: '用户名只能由字母和数字组成', trigger: 'blur' }
      ],
      password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 15, message: '密码位数只能在6~15之间', trigger: 'blur' },
        { pattern: /^[A-Za-z0-9][A-Z-z0-9_.]{5,14}$/, message: '密码由字母或数字开头，且只能为字母,数字,下划线及（.）', trigger: 'blur' }
      ]
    }
    // 关闭弹窗
    const handleClose = (done) => {
      ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }

    // const submitForm = async () => {
    //   const form = unref(fromV);
    //   if (!form) return
    //   try {
    //     await form.validate()
    //     const { username, password } = ruleForm
    //     console.log(username, password)
    //   } catch (error) {
    //   } 
    // }

    // submitForm()
    return {
      dialogVisible,
      ruleForm,
      rotate,
      // username,
      // password,
      rules,
      handleClose,
    }
  }
})
</script>

<style lang="scss">
a,a:link,a:visited,a:hover,a:active{
    text-decoration: none;
    color:inherit;
}
a:hover {
  text-decoration: underline;
  color:gray;
}

.box{
  height: 300px;
}


.flex{
  display: flex;
  justify-content: space-around;;
}
.el-dialog__body {
  padding-top: 10px;
}
.el-dialog__title{
  font-size: 24px;
}
.login{
  transform: rotateY(0deg);
}

.register{
  transform: rotateY(-180deg);
}

.login, .register{
  width: 94%;
  position: absolute;
  backface-visibility: hidden;
  transition: 1s linear;
}

.flip .login {
  transform: rotateY(180deg);
}
/* 将back旋转180度 */
.flip .register {
  transform: rotateY(0deg);
}
 
</style>
