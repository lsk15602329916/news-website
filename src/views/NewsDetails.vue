<template>
  <v-container ref="win">
    <v-row>
      <v-col cols="2">
      </v-col>
      <v-col cols="8">
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
          <v-btn v-if="newsComments.data?.has_more" block>
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
    let overlay = ref(true)
    let news = ref([])
    let newsTime = ref('')
    const _getNewsDetails = async () => {
      newsDetails.value = await getNewsDetails(route.params.item_id);
      console.log(newsDetails.value.data?.detail_source)
      console.log(newsDetails.value.data?.publish_time)
      let time = new Date(parseInt(newsDetails.value.data?.publish_time) * 1000)
      console.log(time)
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

    const getComments = async () => {
      newsComments.value = await getNewsComments({
        item_id: route.params.item_id
      })
    }
    const _getComments = async () => {
      newsComments.value = await getComments({
        item_id: route.params.item_id,
        user_id: store.state.user.id
      })
    }

    const updateComment = async (o) => {
      await _getComments()
    }

    const changeComment = async (toggle, i) => {
      if(isFirstShow.value) isFirstShow.value = false
      toggle()
      if(i) {
        await _getComments()
      } else {
        await _getNewsComments()
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
    _getNewsComments()
    _getNews()
    return {
      newsDetails,
      newsComments,
      news,
      overlay,
      isFirstShow,
      changeComment,
      win,
      updateFav,
      updateComment,
      newsTime
    };
  },
};
</script>

<style scoped>
  .text-area {
    background: rgb(228, 228, 228);
    border: 3px solid gray;
    border-radius: 5px;
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
  /*img{*/
  /*  display: inline-block;*/
  /*  width: 100%;*/
  /*  align-content: center;*/
  /*}*/
</style>

