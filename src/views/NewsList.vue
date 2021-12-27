<template>
  <div class="news-item" v-for="(item, i) in newsList" :key="item.item_id">
    <newsItem :item="item" />
  </div>
</template>

<script>
import axios from "axios";
import newsItem from "./NewsItem.vue";
import { getNews } from "@/service/api";
import Utils from "@/utils";
axios.defaults.baseURL = "/toutiao";

export default {
  name: "NewsList",
  components: { newsItem },
  data() {
    console.log("data", this.$router);
    return {
      topic: this.$router,
      newsList: [],
      tag: '__all__'
    };
  },
  methods: {
    _getNews: async function() {
      let data = await getNews(this.tag);
      this.newsList.push(...data.data);
    },
  },
  watch: {
    $route() {
      // console.log("route改变了", this, this.$route.params.tag);
      Utils.update("loading", true);
      this.tag = this.$route.params.tag;
      axios
        .get("list/", {
          params: {
            ac: "wap",
            format: "json_raw",
            tag: this.$route.params.tag,
            as: "A175ADC1C1BAE7E",
            cp: "5D118A3E877E8E1",
            _signature: "f60bLAAAIr6R60RntmQLRn-tGz",
          },
          headers: {},
        })
        .then((res) => {
          this.newsList = res.data.data;
          this.hasMore = res.data.hasMore;
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          Utils.update("loading", false);
        });
    },
  },
  created: function () {
    Utils.update("loading", true);
    axios
      .get("list/", {
        params: {
          ac: "wap",
          format: "json_raw",
          tag: "__all__",
          as: "A175ADC1C1BAE7E",
          cp: "5D118A3E877E8E1",
          _signature: "f60bLAAAIr6R60RntmQLRn-tGz",
        },
        headers: {},
      })
      .then((res) => {
        this.newsList = res.data.data;
        this.hasMore = res.data.hasMore;
        this.hasImage = res.data.has_image;
        // has_image为true，image_list是空时，图片在image_url中，不为空则在image_list数组里
        this.imageUrl = res.data.has_image
          ? res.data.image_list.length > 0
            ? res.data.image_list[0]
            : image_url
          : null;
        console.log(this.newsList);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        Utils.update("loading", false);
      });
  },
  mounted() {
    const scrollFn = (e) => {
      const target = e.target.scrollingElement;
      const toBottom =
        target.scrollTop + target.clientHeight + 50 > target.scrollHeight;
      if (toBottom) {
        this._getNews();
      }
    };
    window.addEventListener("scroll", Utils.debounce(scrollFn));
  },
};
</script>

<style scoped>
.news-item {
  position: relative;
  background-color: rgba(0, 0, 0, 0);
}

.news-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(to right, white, rgba(34, 34, 34, 0.609), white);
}
</style>