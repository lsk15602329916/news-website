<template>
  <v-container>
    <v-row>
      <v-col cols="2">
      </v-col>
      <v-col cols="8">
        <div v-html="newsDetails.data?.content"></div>
        <v-divider class="my-5"></v-divider>
        <p class="font-weight-bold my-2">精彩评论</p>
        <div>
          <div class="d-flex my-3">
            <textarea :disabled="!$store.state.user.name" :placeholder="$store.state.user.name ? '' : '请先登录'" class="flex-grow-1 text-area pa-1" rows="5"></textarea>
            <v-overlay contained v-model="overlay"></v-overlay>
            <v-btn
              size="small"
              color="blue-grey"
              :disabled="!$store.state.user.name"
              class="align-self-end ml-3 btn"
            >发送</v-btn>
          </div>
          <comment-item
            v-for="item in newsComments.data?.comments"
            :key="item.id"
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
            v-for="item in news.data"
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
import { getNewsDetails, getNewsComments, getNews } from "@/service/api";
import newsItem from "@/components/ch-cpns/newsItem";
import commentItem from "@/components/ch-cpns/commentItem";
import { ref } from '@vue/reactivity';
export default {
  components: {
    newsItem,
    commentItem,
  },
  setup(props) {
    const route = useRoute();
    let newsDetails = ref({})
    let newsComments = ref([])
    let overlay = ref(true)
    let news = ref([])
    
    const _getNewsDetails = async () => {
      newsDetails.value = await getNewsDetails(route.params.item_id);
    }
    
    const getComments = async () => {
      newsComments.value = await getNewsComments({
        item_id: route.params.item_id
      })
    }

    const _getNews = async () => {
      news.value = await getNews('__all__')
    }
    
    _getNewsDetails()
    getComments()
    _getNews()
    return {
      newsDetails,
      newsComments,
      news,
      overlay
    };
  }
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
</style>