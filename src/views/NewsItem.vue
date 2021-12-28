<template>
  <div class="content" @click="open">
    <div class="newsText" :style="`width:${item.has_image}?80%:100%`">
      <h2>
        <a class="news_title">{{ item.title }}</a>
      </h2>
      <p>{{ item.abstract }}</p>
      <div class="newsInfo">
        <p>
          <span style="margin-right: 2rem">{{ item.media_name }} </span>
          <span>{{ toTime(item.publish_time) }} </span>
        </p>
      </div>
    </div>
    <img
      class="pic"
      v-if="item.has_image"
      :src="
        item.has_image
          ? item.image_list.length
            ? item.image_list[0].url
            : item.image_url || item.large_image_url
          : null
      "
    />
  </div>
</template>

<script>
import Utils from "@/utils";
export default {
  name: "newsItem",
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    open() {
      const { item_id, group_id } = this.item;
      Utils.openTag(`NewsDetails`, {
        item_id: item_id,
        group_id: group_id,
      });
    },
    toTime(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  cursor: pointer;
  padding: 10px 4rem;
  justify-content: space-between;
  align-items: center;
  color: gray;
}

.content:hover {
  background: rgba(0, 0, 0, 0.08);
  transition: 0.4s;
}
h2 {
  margin: 0 0 0.4rem;
}
a,
a:hover {
  text-decoration: none;
}

.pic {
  margin-left: 1rem;
  height: 15%;
  width: 20%;
  background-color: #fff;
}

.news_title:hover {
  color: rgb(124, 143, 228);
}

.newsInfo {
  margin: 0.8em 0 0 0;
  font-size: 0.8em;
}
</style>