<template>
  <div class="content">
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
export default {
  name: "newsItem",
  props: ["item"],
  data() {
    return {};
  },
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