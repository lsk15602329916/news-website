<template>
  <div :class="{ card: true, active: news.active }">
    <div class="content">
      <span class="news-type">{{ news.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsNavigator",
  props: ["news"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.card {
  margin: 8px;
  height: 3rem;
  width: 8%;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  justify-content: center;
  cursor: pointer;
  border-bottom: 2px solid rgba(255, 255, 255, 0);
  transition: 0.4s;
  font-size: 20px;
  line-height: 40px;
  color: rgb(176, 190, 252);
}
.card:hover {
  color: rgb(100, 126, 243);
  border-bottom: 2px solid rgb(100, 126, 243);
}
.card.active {
  color: rgb(100, 126, 243);
  border-bottom: 2px solid rgb(100, 126, 243);
}
.content {
  height: 40px;
  width: 100%;
  margin: 10px 10px;
  display: flex;
  justify-content: center;
}

</style>