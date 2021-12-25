<template>
  <div class="content" @click="open">
    <div class="newsText">
      <h2>{{ item.title }}</h2>
      <p>{{ item.abstract }}</p>
      <div class="newsInfo">
        <p>{{ item.media_name }}</p>
      </div>
    </div>
    <div class="pic"></div>
  </div>
</template>

<script>
import Utils from '@/utils';
export default {
  name: "newsItem",
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    open() {
      const { item_id, group_id } = this.item
      Utils.openTag(
        `NewsDetails`, 
        {
          item_id: item_id,
          group_id: group_id
        }
      )
    }
  }
};
</script>

<style scoped>
.content{
  display: flex;
}

/* .pic {
  height: inherit;
  width: 100px;
  background-color: #fff;
} */
</style>