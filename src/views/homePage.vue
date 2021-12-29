<template>
  <div class="bg">
      <el-container class="container">
    <el-header height="110px">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="100" :src="formMessage.head"></el-avatar>
        </el-col>
        <el-col :span="5" class="flex flex-column justify-sa">
          <div class="f-24">{{formMessage.name}}</div>
          <div class="flex flex-row justity-st">
            <div class="mr-10">点赞 {{likeCount}}</div>
            <div class="mr-10">收藏 {{favNewsCount}}</div>
            <div>历史 {{historyCount}}</div>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName">
        <el-tab-pane label="个人信息" name="个人信息">
          <el-form ref="form" :model="formMessage" label-width="120px" style="width:500px; margin-top:10px" :rules='formRules'>
            <!-- <el-form-item label="头像" prop='head'> -->
              <!-- <el-upload
                class="avatar-uploader"
                id='fileInput'
                action=""
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
              </el-upload> -->
              <!-- <input type="file" id="fileInput" @change="beforeAvatarUpload"/>
            </el-form-item> -->
            <el-form-item label="昵称" prop='name'>
              <el-input v-model="formMessage.name" :disabled='formLock'></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop='phoneNumber'>
              <el-input v-model="formMessage.phoneNumber" :disabled='formLock'></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop='email'>
              <el-input v-model="formMessage.email" :disabled='formLock'></el-input>
            </el-form-item>
            <el-form-item label="生日" >
              <el-date-picker v-model="formMessage.birth" type="date" placeholder="选择你的生日" format="YYYY-MM-DD" value-format="x" :disabled='formLock'>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="formMessage.sex" :disabled='formLock'>
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="uploadData" :disabled='formLock'>修改信息</el-button>
              <el-button @click="formLock = !formLock" :disabled='!formLock'>启用修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="收藏列表" name="收藏列表">
          <div v-for="(item, i) in favNewsList" :key="item.news_id" @click="open(item.news_id)" class="content"> 
            <el-row :gutter="20" >
              <el-col :span="24"><div class="title">{{item.title}}</div></el-col>
            </el-row>
            <el-row :gutter="20"  style="margin-top:20px">
              <el-col :span="4"><div>{{item.author}}</div></el-col>
              <el-col :offset="14" :span="6">{{getTimeStr(item.createdAt)}}</el-col>
            </el-row>
            <el-divider v-if="i < favCount - 1" border-style="dashed"></el-divider>
            <el-divider v-else border-style="dashed">到底啦！！</el-divider>
          </div>
        </el-tab-pane>
        <el-tab-pane label="点赞列表" name="点赞列表">
          <el-row :gutter="20" v-for="(item, i) in commentlist" :key="item.commentid">
            <el-col :span="18"><div>{{'"' + item.text + '"'}}</div></el-col>
            <el-col :span="6"><div>{{formatTime(item.likecreatedtime)}}</div></el-col>
            <el-divider v-if="i < likeCount - 1" border-style="dashed"></el-divider>
            <el-divider v-else border-style="dashed">到底啦！！</el-divider>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="浏览记录" name="浏览记录">
          <div v-for="(item, i) in historyList" :key="item.item_id" @click="open(item.item_id)" class="content"> 
            <el-row :gutter="20" >
              <el-col :span="24"><div class="title">{{item.title}}</div></el-col>
            </el-row>
            <el-row :gutter="20"  style="margin-top:20px">
              <el-col :span="4"><div>{{item.author}}</div></el-col>
              <el-col :offset="14" :span="6">{{getTimeStr(item.createdAt)}}</el-col>
            </el-row>
            <el-divider v-if="i < historyCount - 1" border-style="dashed"></el-divider>
            <el-divider v-else border-style="dashed">到底啦！！</el-divider>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue-demi';
import { Plus } from '@element-plus/icons-vue'
// import { IconPicture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { uploadUserInfo, getLikeList, getHistory, getUserInfo, getFavList } from "@/service/api";
import InspireCloud from '@byteinspire/js-sdk'
import Utils from "@/utils";

// const InspireCloud = require('@byteinspire/js-sdk')

export default {
  components: {
    Plus,
  },
  // http://img.zcool.cn/community/0165cb5d14565ca8012155290a6d86.png@1280w_1l_2o_100sh.png
  setup() {
    const formMessage = reactive({
      head: localStorage.getItem("headportrait"),
      name: localStorage.getItem("username"),
      phoneNumber: localStorage.getItem("phoneNumber"),
      sex: localStorage.getItem("gender"),
      birth: localStorage.getItem("birthday"),
      email: localStorage.getItem('email')
    })
    const imageUrl = ref('')
    const formRules = {
      phoneNumber: [
        { required: true, message: "手机号不能为空", trigger: "blur" },
        { pattern: /^1[3-9]\d{9}$/, message: "请输入正确手机号", trigger: "blur" },
      ],
      name: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
        { pattern:  /^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/ , message: '请输入合法用户名', trigger: "blur" }
      ],
      email: [
        { required: true, message: "邮箱不能为空", trigger: "blur" },
        { pattern:  /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ , message: '请输入合法邮箱', trigger: "blur" }
      ]
    }

    const commentlist = reactive([])
    const historyList = reactive([])
    const favNewsList = reactive([])
    const historyCount = ref(0)
    const likeCount = ref(0)
    const favNewsCount = ref(0)
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

    const serviceId = 'qcx6h7'; // 替换成你的 serviceId，可在后台「设置」页面获取
    const fileUploadToken = 'dc11ebad-e726-473d-9f89-b9c8de669a9c'; // 替换成你的客户端上传 token，可在后台「设置」页面获取

    const inspirecloud = new InspireCloud({ serviceId });

    const handleAvatarSuccess = (res, file) => {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
    const  beforeAvatarUpload = (file) => {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('Avatar picture must be JPG format!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('Avatar picture size can not exceed 2MB!')
      // }
      // return isJPG && isLt2M
      
    // 获取到上传选择框
    const fileInputElement = document.getElementById('fileInput');
    console.log(fileInputElement.files[0]);

    if (fileInputElement.files.length > 0) {
      const file = fileInputElement.files[0];
      const filename = file.name;

      // 调用 JavaScript SDK 的 upload 方法实现上传，第二个参数为 File 对象
      inspirecloud.file.upload(filename, file, { token: fileUploadToken })
        .then((data) => {
        // 上传成功
         console.log(data.url);
        })
        .catch((error) => {
      // 调用失败，进行错误处理
        });
    }
    }
    const formatTime = (timeStamp) => {
      let date = new Date(timeStamp),
      Y = date.getFullYear() + '-',
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
      D = date.getDate() < 10 ? '0' +  date.getDate() + ' ' : date.getDate() + ' ',
      h = date.getHours() < 10 ? '0' +  date.getHours() + ':' : date.getHours() + ':',
      m = date.getMinutes() < 10 ? '0' +  date.getMinutes() + ':' : date.getMinutes() + ':',
      s = date.getSeconds() < 10 ? '0' +  date.getSeconds() : date.getSeconds()
      return Y+M+D+h+m+s
    }

    const uploadData = () => {
      // console.log(formMessage)
      _uploadUserInfo(formMessage).then()
    }

    const _uploadUserInfo = (form) => {
      uploadUserInfo({
        username: form.name,
        gender: form.sex,
        birthday: form.birth,
        email: form.email,
        phone: form.phoneNumber,
        headportrait: 'http://img.zcool.cn/community/0165cb5d14565ca8012155290a6d86.png@1280w_1l_2o_100sh.png'
      }).then((res) => {
        // console.log(res);
        _getUserInfo()
        formLock.value = true
      })
    }

    // 获取点赞列表
    const _getLikeList = () => {
      getLikeList().then(({code, data:{count, likelist}}) => {
        // console.log(likelist);
        if(code === 3200) {
          commentlist.push(...likelist)
          likeCount.value = count
        }
      })
    } 

    // 获取收藏列表
    const _getFavList = () => {
      getFavList().then(({code, data: {favlist}}) => {
        if(code === 3200) {
          favNewsList.push(...favlist)
          favNewsCount.value = favlist.length
        }
      })
    }

    const _getHistory = () => {
      getHistory().then(({code, data: {hislist}}) => {
        if(code === 3200) {
          historyList.push(...hislist)
          historyCount.value = hislist.length
        }
      })
    }

    const getTimeStr = (time) => {
      return formatTime(new Date(time).getTime() + 8*60*60*1000)
    }

    const _getUserInfo = () => {
      getUserInfo().then(({code, data:{username, phone, email, gender, birthday, headportrait}}) => { 
        if(code === 3200) {
          Utils.update('user', {
            username: username || '',
            phoneNumber: phone || '',
            email: email || '',
            gender: gender || '男',
            birthday: birthday || '2021-01-01',
            headportrait: headportrait || '../assets/image/head1'
          })
          localStorage.setItem('username', username || '')
          localStorage.setItem('phoneNumber', phone || '')
          localStorage.setItem('email', email || '')
          localStorage.setItem('gender', gender || '男')
          localStorage.setItem('birthday', birthday || '2021-01-01')
          localStorage.setItem('headportrait', headportrait || '../assets/image/head1')
        }
      })
    }
    // 跳转详情页
    const open = (id) => {
      // console.log(item);
      // const { item_id } = item;
      Utils.openTag(`NewsDetails`, {
        item_id: id,
      });
    }

    onMounted(() => {
      _getLikeList()
      _getHistory()
      _getFavList()
      _getUserInfo()
    })

    return {
      formMessage,
      formLock,
      formRules,
      newsList,
      activeName,
      imageUrl,
      likeCount,
      commentlist,
      historyList,
      historyCount,
      favNewsList,
      favNewsCount,
      handleAvatarSuccess,
      beforeAvatarUpload,
      uploadData,
      formatTime,
      getTimeStr,
      open
    }
  },
};
</script>

<style>
.bg {
  height: 100%;
  background: rgb(255, 228, 249);
  background: linear-gradient(
    -45deg,
    rgba(255, 228, 249, 0.8) 0%,
    rgba(205, 217, 252, 0.8) 100%
  );
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
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
.f-24{
  font-size: 24px;
}
.news:hover{
  cursor: pointer;
}
.news:hover .title, .news:hover .content{
  color: rgb(240, 50, 50);
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  width: 178px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin: 74px 0; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.content {
  cursor: pointer;
}

.content:hover {
  color: red;
}
</style>
