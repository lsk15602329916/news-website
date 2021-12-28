<template>
  <el-button
    size="small"
    @click="dialogVisible = true"
    style="
      --el-button-bg-color: rgb(176, 190, 252);
      --el-button-border-color: rgb(176, 190, 252);
      --el-button-hover-bg-color: rgb(100, 126, 243);
      --el-button-hover-border-color: rgb(100, 126, 243);
      --el-button-active-bg-color: rgb(100, 126, 243);
      --el-button-active-border-color: rgb(100, 126, 243);
      color: white;
    "
    >登录</el-button
  >
  <el-dialog
    v-model="dialogVisible"
    title="登录后内容更精彩"
    width="40%"
    :before-close="handleClose"
    class="dialog"
    :center="true"
  >
    <div class="box" :class="rotate ? 'flip' : ''">
      <!-- 登录 -->
      <el-card shadow="never" class="login" v-if="isLogin">
        <el-row>
          <el-col :offset="2" :span="10">
            <el-radio-group
              style="width: 100%; margin-bottom: 20px"
              size="medium"
              v-model="loginType"
              @change="changeTab"
            >
              <el-radio-button
                v-for="(item, index) in tabName"
                :key="index"
                :label="item"
              ></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-carousel
          :autoplay="false"
          arrow="never"
          ref="carousel"
          indicator-position="none"
        >
          <el-carousel-item>
            <el-row>
              <el-col :span="14">
                <el-form :rules="rules" ref="fromV" :model="ruleForm">
                  <el-form-item prop="phoneNumber">
                    <el-input
                      v-model="ruleForm.phoneNumber"
                      placeholder="请输入手机号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      v-model="ruleForm.password"
                      placeholder="请输入密码"
                      type="password"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox
                      v-model="isAgree"
                      label="是否同意《用户协议》和《隐私政策》"
                      name="type"
                    ></el-checkbox>
                  </el-form-item>
                  <el-form-item size="large">
                    <el-button type="primary" style="width: 100%" :disabled='!isAgree'
                      >登录</el-button
                    >
                  </el-form-item>
                  <div class="flex">
                    <el-link type="primary" @click="rotate = !rotate"
                      >注册</el-link
                    >
                    <el-link type="primary" @click="isLogin = !isLogin"
                      >忘记密码</el-link
                    >
                  </div>
                </el-form>
              </el-col>
              <el-col></el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <el-row>
              <el-col :span="14">
                <el-form :rules="rules" ref="fromV" :model="ruleForm">
                  <el-form-item prop="phoneNumber">
                    <el-input
                      v-model="ruleForm.phoneNumber"
                      placeholder="请输入手机号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="confirmSMS">
                    <el-input
                      v-model="ruleForm.confirmSMS"
                      placeholder="请输入验证码"
                      type="text"
                    >
                      <template #append>
                        <el-button
                          type="info"
                          :disabled="buttonStatus"
                          @click="getConfirm"
                          >{{
                            confirmTime > 0 ? confirmTime + "s" : "获取验证码"
                          }}</el-button
                        >
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox
                      v-model="isAgree"
                      label="是否同意《用户协议》和《隐私政策》"
                      name="type"
                    ></el-checkbox>
                  </el-form-item>
                  <el-form-item size="large">
                    <el-button type="primary" style="width: 100%" :disabled='!isAgree'
                      >登录</el-button
                    >
                  </el-form-item>
                  <div class="flex">
                    <el-link type="primary" @click="rotate = !rotate"
                      >注册</el-link
                    >
                    <el-link type="primary" @click="isLogin = !isLogin"
                      >忘记密码</el-link
                    >
                  </div>
                </el-form>
              </el-col>
              <el-col></el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <!-- 忘记密码 -->
      <el-card shadow="never" class="login" v-else-if="!isLogin">
        <el-row>
          <el-col :offset="2" :span="10">
            <el-radio-group
              style="width: 100%; margin-bottom: 20px"
              size="medium"
              v-model="progress"
            >
              <el-radio-button
                v-for="(item, index) in tabName2"
                :key="index"
                :label="item"
                :disabled="item !== progress ? true : false"
                type="primary"
              ></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-carousel
          :autoplay="false"
          arrow="never"
          ref="carousel2"
          indicator-position="none"
        >
          <el-carousel-item>
            <el-row>
              <el-col :span="14">
                <el-form :rules="rules" ref="fromV" :model="ruleForm">
                  <el-form-item prop="phoneNumber">
                    <el-input
                      v-model="ruleForm.phoneNumber"
                      placeholder="请输入手机号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="confirm">
                    <el-input
                      v-model="ruleForm.confirm"
                      placeholder="请输入验证码"
                      type="password"
                    >
                      <template #append>
                        <el-button
                          type="info"
                          :disabled="buttonStatus"
                          @click="getConfirm"
                          >{{
                            confirmTime > 0 ? confirmTime + "s" : "获取验证码"
                          }}</el-button
                        >
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox
                    v-model="isAgree"
                      label="是否同意《用户协议》和《隐私政策》"
                      name="type"
                    ></el-checkbox>
                  </el-form-item>
                  <el-form-item size="large">
                    <el-button
                      type="primary"
                      style="width: 100%"
                      :disabled='!isAgree'
                      @click="findPassword"
                      >手机验证</el-button
                    >
                  </el-form-item>
                  <div class="flex">
                    <el-link type="primary" @click="isLogin = !isLogin"
                      >登录</el-link
                    >
                  </div>
                </el-form>
              </el-col>
              <el-col></el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item>
            <el-row>
              <el-col :span="14">
                <el-form :rules="rules" ref="fromV" :model="ruleForm">
                  <el-form-item prop="phoneNumber">
                    <el-input
                      v-model="ruleForm.phoneNumber"
                      placeholder="请输入手机号码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="confirm">
                    <el-input
                      v-model="ruleForm.confirm"
                      placeholder="请输入验证码"
                      type="password"
                    >
                      <template #append>
                        <el-button
                          type="info"
                          :disabled="buttonStatus"
                          @click="getConfirm"
                          >{{
                            confirmTime > 0 ? confirmTime + "s" : "获取验证码"
                          }}</el-button
                        >
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox
                      v-model="isAgree"
                      label="是否同意《用户协议》和《隐私政策》"
                      name="type"
                    ></el-checkbox>
                  </el-form-item>
                  <el-form-item size="large">
                    <el-button
                      type="primary"
                      style="width: 100%"
                      :disabled='!isAgree'
                      @click="findPassword"
                      >修改密码</el-button
                    >
                  </el-form-item>
                  <div class="flex">
                    <el-link type="primary" @click="isLogin = !isLogin"
                      >登录</el-link
                    >
                  </div>
                </el-form>
              </el-col>
              <el-col></el-col>
            </el-row>
          </el-carousel-item>
        </el-carousel>
      </el-card>
      <!-- 注册 -->
      <el-card shadow="never" class="register">
        <el-row>
          <el-col :span="14">
            <el-form :rules="rules" ref="fromV" :model="ruleForm">
              <el-form-item prop="phoneNumber">
                <el-input
                  v-model="ruleForm.phoneNumber"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="ruleForm.password"
                  placeholder="请输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="confirm">
                <el-input
                  v-model="ruleForm.confirm"
                  placeholder="请输入验证码"
                  type="password"
                >
                  <template #append>
                    <el-button
                      type="info"
                      :disabled="buttonStatus"
                      @click="getConfirm"
                      >{{
                        confirmTime > 0 ? confirmTime + "s" : "获取验证码"
                      }}</el-button
                    >
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox
                  v-model="isAgree"
                  label="是否同意《用户协议》和《隐私政策》"
                  name="type"
                ></el-checkbox>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" style="width: 100%" :disabled='!isAgree'
                  >注册并登录</el-button
                >
              </el-form-item>
              <div class="flex">
                <el-link type="primary" @click="rotate = !rotate">登录</el-link>
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
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from "@vue/runtime-core";
import { ElMessageBox } from "element-plus";
import { sendSMS } from "@/service/api";
// import MyInput from './input.vue'

export default defineComponent({
  name: "loginDialog",
  // components: {
  //   MyInput
  // },
  setup() {
    const dialogVisible = ref(false);
    const rotate = ref(false);
    let fromV = ref(null);
    const carousel = ref();
    const carousel2 = ref();
    const isAgree = ref(false)
    const ruleForm = reactive({
      phoneNumber: "18319328003",
      password: "",
      confirm: "",
    });
    const rules = {
      phoneNumber: [
        { required: true, message: "手机号不能为空", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确手机号", trigger: "blur" },
      ],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        { min: 6, max: 15, message: "密码位数只能在6~15之间", trigger: "blur" },
        {
          pattern: /^[A-Za-z0-9][A-Z-z0-9_.]{5,14}$/,
          message: "密码由字母或数字开头，且只能为字母,数字,下划线及（.）",
          trigger: "blur",
        },
      ],
      confirmSMS: [
        { required: true, message: "验证码不能为空", trigger: "blur" },
        { pattern: /^\d{6}$/, message: "验证码为6位有效数字", trigger: "blur" }
      ]
    };
    const buttonStatus = ref(false);
    const confirmTime = ref(0);
    const loginType = ref("密码登录");
    const tabName = reactive(["密码登录", "验证码登录"]);
    const progress = ref("手机验证");
    const tabName2 = reactive(["手机验证", "密码修改"]);
    const isLogin = ref(true);
    // 关闭弹窗
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };

    // 切换登录方式
    const changeTab = () => {
      loginType.value === "密码登录"
        ? carousel.value.next()
        : carousel.value.prev();
    };

    const getConfirm = () => {
      const endTime = new Date().getTime() + 60 * 1000;
      localStorage.setItem("endTime", endTime);
      // console.log(endTime);
      getConfirmTime();
      buttonStatus.value = true;
    };
    // 获取验证码
    const _sendSMS = async () => {
      await sendSMS(ruleForm.phoneNumber)
    }
      _sendSMS()

    const getConfirmTime = () => {
      const endTime = localStorage.getItem("endTime");
      confirmTime.value = Math.ceil((endTime - new Date().getTime()) / 1000);
      buttonStatus.value = true;
      let timer = null;
      const cb = () => {
        if (new Date() < endTime) {
          confirmTime.value--;
        } else {
          confirmTime.value = 0;
          buttonStatus.value = false;
          clearInterval(timer);
        }
      };
      timer = setInterval(cb, 1000);
    };

    // 修改密码
    const findPassword = () => {
      progress.value = tabName2[1];
      carousel2.value.next();
    };
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

    onMounted(() => {
      getConfirmTime();
    });
    return {
      dialogVisible,
      ruleForm,
      rotate,
      // username,
      // password,
      rules,
      handleClose,
      confirmTime,
      getConfirm,
      buttonStatus,
      loginType,
      tabName,
      progress,
      tabName2,
      changeTab,
      carousel,
      carousel2,
      isLogin,
      findPassword,
      isAgree
    };
  },
});
</script>

<style lang="scss">
a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
}
a:hover {
  text-decoration: underline;
  color: gray;
}

.box {
  height: 100%;
  display: flex;
  align-items: center;
  // position: relative;
  // overflow: hidden;
}

.flex {
  display: flex;
  justify-content: space-around;
}
.el-dialog__body {
  height: 100%;
  padding-top: 10px;
}
.el-dialog__title {
  font-size: 24px;
}
.el-card__body {
  height: 100%;
}

.login {
  transform: rotateY(0deg);
}

.register {
  transform: rotateY(-180deg);
}

.login {
  width: 94%;
  position: absolute;
  backface-visibility: hidden;
  transition: 1s linear;
}

.register {
  width: 94%;
  // position: absolute;
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
