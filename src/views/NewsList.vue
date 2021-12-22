<template>
  <div class="news-item" v-for="(item, i) in newsList" :key="i">
    <newsItem :item="item" />
  </div>
</template>

<script>
import axios from "axios";
import newsItem from "./NewsItem.vue";
axios.defaults.baseURL = "/toutiao";

export default {
  name: "NewsList",
  components: { newsItem },
  data() {
    console.log("data", this.$router);
    return {
      topic: this.$router,
      newsList: [],
      // tag: this.$router.tag,
    };
  },
  methods: {
    getNewsList: function () {},
  },
  watch: {
    $route() {
      console.log("route改变了", this, this.$route.params.tag);
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
          console.log(this.newsList[0], res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created: function () {
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
        console.log(this.newsList);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.news-item {
  margin: 10px;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 2px dashed black;
  color: gray;
}
.content {
  background-color: rgba(0, 0, 0, 0);
}
/* .news-type {
  margin-left: 8px;
  text-align: center;
  font-size: 24px;
  line-height: 40px;
  color: #ea986c;
} */
</style>