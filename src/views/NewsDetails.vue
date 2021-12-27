<template>
  <v-container ref="win">
    <v-row>
      <v-col cols="2">
      </v-col>
      <v-col cols="8" v-show="newsDetails.data">
        <h1 v-html="newsDetails.data?.title" class="title-style"></h1>
        <div class="father">
          <span class="son" v-html="newsTime  +  '&nbsp' + '&nbsp' + '&nbsp'+ '&nbsp'+ '&nbsp'+ ' 来源：' + newsDetails.data?.source" > </span>
        </div>
        <div v-html="newsDetails.data?.content" class="test"></div>
        <v-divider class="my-5"></v-divider>
        <!-- <p class="font-weight-bold my-2">精彩评论</p> -->
        <v-item-group class="d-flex" mandatory>
          <v-item v-slot="{ isSelected, toggle }">
            <v-card
              :color="isSelected || isFirstShow ? 'orange' : ''"
              class="d-flex align-center px-2"
              flat
              dark
              @click="changeComment(toggle, 0)"
            >
              <v-scroll-y-transition>
                <div
                  class="font-weight-bold my-2"
                >
                  精彩评论
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
          <v-divider vertical class="mx-1"></v-divider>
          <v-item v-slot="{ isSelected, toggle }">
            <v-card
              :color="isSelected ? 'orange' : ''"
              class="d-flex align-center px-2"
              flat
              dark
              @click="changeComment(toggle, 1)"
            >
              <v-scroll-y-transition>
                <div
                  class="font-weight-bold my-2"
                >
                  其他评论
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-item-group>
        <div>
          <text-input
            class="my-3"
            @update-comment="updateComment"
          />
          <comment-item
            v-for="item in newsComments.data?.comments"
            @update-fav="updateFav($event, item)"
            :key="item.id"
            @update-com="updateComment"
            :comment="item"
          />
          <v-btn v-if="newsComments.data?.has_more" @click="showAllComments(1)" block>
            <span class="grey--text">查看全部评论 >></span>
          </v-btn>
        </div>
        <v-divider class="my-5"></v-divider>
        <p class="font-weight-bold my-2">热门推荐</p>
        <div>
          <news-item
            v-for="item in news"
            :key="item.item_id"
            :news="item"
          />
        </div>
      </v-col>
      <v-col cols="2">

      </v-col>
    </v-row>
  </v-container>
  <v-navigation-drawer 
    v-model="show"
    temporary
    disable-resize-watcher
    width="400"
    app
  >
    <v-list-item
      class="px-2 nav-top"
    >
      <v-item-group class="d-flex" mandatory>
        <v-item v-slot="{ isSelected, toggle }">
          <v-card
            :color="isSelected || isAllFirstShow ? 'orange' : ''"
            class="d-flex align-center px-2"
            flat
            dark
            @click="changeAllComment(toggle, 0)"
          >
            <v-scroll-y-transition>
              <div
                class="font-weight-bold my-2"
              >
                精彩评论
              </div>
            </v-scroll-y-transition>
          </v-card>
        </v-item>
        <v-divider vertical class="mx-1"></v-divider>
        <v-item v-slot="{ isSelected, toggle }">
          <v-card
            :color="isSelected ? 'orange' : ''"
            class="d-flex align-center px-2"
            flat
            dark
            @click="changeAllComment(toggle, 1)"
          >
            <v-scroll-y-transition>
              <div
                class="font-weight-bold my-2"
              >
                其他评论
              </div>
            </v-scroll-y-transition>
          </v-card>
        </v-item>
      </v-item-group>
      <v-spacer></v-spacer>
      <v-btn
        icon
        flat
        size="small"
        @click.stop="show = false"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider class="mt-16"></v-divider>
    <comment-item
      v-for="item in allComments.data?.comments"
      :key="item.id"
      :comment="item"
      @update-fav="updateFav($event, item)"
      @update-com="updateAllComment"
    />
    <v-btn
      @click="showAllComments"
      block
    >
      加载更多...
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
import { getNewsDetails, getNewsComments, getNews, getComments } from "@/service/api";
import newsItem from "@/components/ch-cpns/newsItem";
import commentItem from "@/components/ch-cpns/commentItem";
import textInput from '@/components/ch-cpns/commentItem/textInput';
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import Utils from '@/utils';
export default {
  components: {
    newsItem,
    commentItem,
    textInput
  },
  setup(props) {
    const route = useRoute();
    const store = useStore()
    let newsDetails = ref({})
    let newsComments = ref([])
    let allComments = ref([])
    let curAllComment = ref(0)
    let curTTCommentCount = ref(0)
    let curMYCommentCount = ref(0)
    let allTTComments = ref([])
    let allMYComments = ref([])
    let overlay = ref(true)
    let news = ref([])
    let isFirstShow = ref(true)
    let isAllFirstShow = ref(true)
    const win = ref(null)
    let show = ref(false)
    let newsTime = ref('')

    const _getNewsDetails = async () => {
      newsDetails.value = await getNewsDetails(route.params.item_id);
      let time = new Date(parseInt(newsDetails.value.data?.publish_time) * 1000)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      let hours = time.getHours()
      let minute = time.getMinutes()
      let second = time.getSeconds()

      if (month < 10) { month = '0' + month }
      if (date < 10) { date = '0' + date }
      if (hours < 10) { hours = '0' + hours }
      if (minute < 10) { minute = '0' + minute }
      if (second < 10) { second = '0' + second }
      newsTime.value =  year + '年' + month + '月' + date + '日' + ' ' + hours + ':' + minute + ':' + second
      console.log(newsTime)
      }

    const _getNewsComments = async (newsCom, offset, count) => {
      let comments = await getNewsComments({
        item_id: route.params.item_id,
        offset: offset?.value,
        count
      })

      if(!comments.data.has_more) {
        Utils.showErrorAlert('没有更多了')
        return;
      }
      try {
        if(newsComments === newsCom) throw new Error()
        newsCom.value.data.comments.push(...comments.data.comments)
      } catch(e) {
        newsCom.value = comments
      }
      offset && (offset.value += comments.data.comments.length)
    }
    const _getComments = async (newsCom, offset, count) => {
      let comments = await getComments({
        item_id: route.params.item_id,
        user_id: store.state.user.id,
        offset: offset?.value,
        count
      })

      if(!comments.data.has_more) {
        Utils.showErrorAlert('没有更多了')
        return;
      }
      try {
        if(newsComments === newsCom) throw new Error()
        newsCom.value.data.comments.push(...comments.data.comments)
      } catch(e) {
        newsCom.value = comments
      }
      offset && (offset.value += comments.data.comments.length)
    }

    const updateComment = async () => {
      await _getComments(newsComments)
    }

    const changeComment = async (toggle, i) => {
      if(isFirstShow.value) isFirstShow.value = false
      toggle()
      if(i) {
        await _getComments(newsComments)
      } else {
        await _getNewsComments(newsComments)
      }
    }

    const _getNews = async () => {
      let newsList = await getNews('__all__')
      news.value.push(...newsList.data)
    }

    const updateFav = (k, item) => {
      item.isFav = Boolean(k)
      item.favCount += (k ? 1 : -1)
    }

    const handleGetAllComments = async (fn, comments, offset, count) => {
      await fn(comments, offset, count)
    }

    const showAllComments = async (flag) => {
      show.value = true
      // 第一次获取
      console.log(curTTCommentCount.value);
      if(!curTTCommentCount.value) {
        await handleGetAllComments(_getComments, allMYComments, curMYCommentCount, 10)
        await handleGetAllComments(_getNewsComments, allTTComments, curTTCommentCount, 10)
        allComments.value = allTTComments.value
        return
      }

      if(!flag) {
        if(curAllComment.value) {
          handleGetAllComments(_getComments, allMYComments, curMYCommentCount, 10)
          allComments.value = allMYComments.value
        } else {
          handleGetAllComments(_getNewsComments, allTTComments, curTTCommentCount, 10)
          allComments.value = allTTComments.value
        }
      }
    }

    const changeAllComment = (toggle, i) => {
      if(isAllFirstShow.value) isAllFirstShow.value = false
      curAllComment.value = i
      allComments.value = i ? allMYComments.value : allTTComments.value
      toggle()
    }

    const updateAllComment = async (id) => {
      let idx = allMYComments.value.data.comments.findIndex(n => n._id === id)
      await getComments({
        item_id: route.params.item_id,
        user_id: store.state.user.id,
        offset: idx,
        count: 1
      }).then(res => {
        allMYComments.value.data.comments.splice(idx, 1, res.data.comments[0])
      }).catch(err => {
        console.log(err);
      })
    }

    onMounted(() => {
      const scrollFn = (e) => {
        const target = e.target.scrollingElement
        const toBottom = (target.scrollTop + target.clientHeight + 50) > target.scrollHeight
        if(toBottom) {
          _getNews()
        }
      }

      window.addEventListener('scroll', Utils.debounce(scrollFn))
    })
    
    _getNewsDetails()
    _getNewsComments(newsComments)
    _getNews()
    return {
      newsDetails,
      newsComments,
      news,
      overlay,
      isFirstShow,
      isAllFirstShow,
      changeComment,
      win,
      updateFav,
      updateComment,
      updateAllComment,
      newsTime,
      showAllComments,
      changeAllComment,
      curTTCommentCount,
      curMYCommentCount,
      show,
      allComments
    };
  },
};
</script>

<style scoped>
  .container {
    background: #333333;
  }
  .pgc-img {
    text-align: center;
  }
  .pgc-img img {
    display: inline-block;
    width: 100%;
  }
  .text-area {
    background: rgb(228, 228, 228);
    border: 3px solid gray;
    border-radius: 5px;
  }
  .nav-top {
    position: fixed;
    top: 0;
    display: flex;
    z-index: 10000;
    width: 100%;
    background: white;
  }

  .btn {
    color: white;
  }
  .title-style{
    text-align: center;
  }
  .father{
    /*position: relative;*/
    /*background-color: blue;*/
    width: 100%;
    height: 30px;
  }
  .son {
    display: inline-block;
    width: 100%;
    height: 20px;
    /*position: absolute;*/
    margin: 0 auto;
    line-height: 15px;
    text-align: center;
    border-bottom: 1px solid rgba(128, 128, 128, 0.92);
    font-size: 14px;
    color: grey;
  }
</style>

