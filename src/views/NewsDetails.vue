<template>
  <v-container ref="win">
    <v-row>
      <v-col cols="2">
      </v-col>
      <v-col cols="8" v-show="newsDetails.data?.content">
        <div v-html="newsDetails.data?.content"></div>
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
    let isFirstShow = ref(true)
    const win = ref(null)
    
    const _getNewsDetails = async () => {
      newsDetails.value = await getNewsDetails(route.params.item_id);
    }
    
    const _getNewsComments = async () => {
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
      updateComment
    };
  }
};
</script>

<style scoped>
  
</style>