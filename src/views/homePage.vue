<template>
  <div class="bg">
      <el-container class="container">
    <el-header height="110px">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="circleUrl"></el-avatar>
        </el-col>
        <el-col :span="5" class="flex flex-column justify-sa">
          <div>这是昵称</div>
          <div class="flex flex-row justity-st">
            <div class="mr-10">点赞</div>
            <div class="mr-10">收藏</div>
            <div>关注</div>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName">
        <el-tab-pane label="个人信息" name="个人信息">
          <el-form ref="form" :model="formMessage" label-width="120px" style="width:500px; margin-top:10px" :rules='formRules'>
            <el-form-item label="昵称" prop='name'>
              <el-input v-model="formMessage.name" :disabled='formLock'></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop='phoneNumber'>
              <el-input v-model="formMessage.phoneNumber" :disabled='formLock'></el-input>
            </el-form-item>
            <el-form-item label="生日" >
              <el-date-picker v-model="formMessage.birth" type="date" placeholder="选择你的生日" :disabled='formLock'>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="formMessage.sex" :disabled='formLock'>
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled='formLock'>修改信息</el-button>
              <el-button @click="formLock = !formLock" :disabled='!formLock'>启用修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="收藏列表" name="收藏列表">
          <el-row v-for="(item) in newsList" :key="item.newsId" class="news">
            <el-col :span="5">
              <div class="block">
                <el-image
                  style="width: 200px; height: 150px"
                  :src="item.src"
                  fit
                >
                  <template #error>
                    <div class="image-slot">
                      <el-icon :size='20'><component is="i-picture"></component></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
            </el-col>
            <el-col :span="15" :offset="1"  class="flex flex-column justify-sb">
                <div class="title">
                    {{item.title}}
                </div>
                <div class="content">
                    {{item.content}}
                </div>
            </el-col>
            <el-divider></el-divider>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="点赞列表" name="点赞列表">点赞列表</el-tab-pane>
        <el-tab-pane label="浏览记录" name="浏览记录">
            
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
  </div>
</template>

<script>
import { reactive, ref } from 'vue-demi';
// import { IconPicture } from '@element-plus/icons-vue'
export default {
  setup() {
    const formMessage = reactive({
      name: '123123',
      phoneNumber: '15602329916',
      sex: '男',
      birth: '2020-12-01'
    })
    const formRules = {
      phoneNumber: [
        { required: true, message: "手机号不能为空", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确手机号", trigger: "blur" },
      ],
      name: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
        { pattern:  /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/ , message: '请输入合法用户名', trigger: "blur" }
      ]
    }
    const activeName = ref('个人信息')
    const newsList = reactive([
      {
        id: 1,
        src: '',
        title: '12121',
        content: '#西安一男子与防疫人员冲突互殴#虽然远在广州，但是隔着屏幕，透过社交媒体西安民众自述，我能真切感受西安“封城”带来的全城焦虑感。相比去年年初武汉封城，大家还不清楚新冠病毒的厉害，也没有疫苗问世，大家更有耐心，遵守防疫管制措施；如今，疫情持续两年，西安也多次经历全民核酸检查，最近的十月份一轮，到如今日增上百例，反反复复的疫情导致社区禁闭，全民核酸检查协调工作中，也多次出现健康码崩溃，或社区防疫检测人员短缺的现象，在这种情形下，我多少能理解西安民众的焦灼心态。#直击西安封闭式管理首日#'
      },
      {
        id: 2,
        src: '',
        title: '12121',
        content: '12121'
      },      
      {
        id: 3,
        src: '',
        title: '12121',
        content: '12121'
      },     
      {
        id: 4,
        src: '',
        title: '12121',
        content: '12121'
      }
    ])
    const formLock = ref(true)
    return {
      formMessage,
      formLock,
      formRules,
      newsList,
      activeName
    }
  },
};
</script>

<style scoped>
.bg {
  height: 100%;
  background: rgb(255, 228, 249);
  background: linear-gradient(
    -45deg,
    rgba(255, 228, 249, 0.8) 0%,
    rgba(205, 217, 252, 0.8) 100%
  );
}

.container {
  width: 60%;
  margin: 0 auto;
  padding-top: 50px;
}
.flex {
  display: flex;
}

.justify-sa {
  justify-content: space-around;
}

.justify-sb {
  justify-content: space-between;
}
.justity-st {
  justify-content: start;
}
.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}
.mr-10 {
  margin-right: 10px;
}
.mtb-10 {
  margin: 30px 0;
}

.image-slot{
  height: 150px;
  width: 200px;
  line-height: 150px;
  text-align: center;
  font-size: 24px;
  background-color: rgb(223, 223, 223);
}

.title {
  font-size: 28px;
  font-weight: bold;
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
}

.content{
      overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
      margin-bottom: 10px;
}

.news:hover{
  cursor: pointer;
}
.news:hover .title, .news:hover .content{
  color: rgb(240, 50, 50);
}
</style>
