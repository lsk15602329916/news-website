<template>
  <v-app :class="$store.state.theme">
    <router-view></router-view>
    <loading />
    <alert />
  </v-app>
</template>

<script>
// import Home from "./views/Home.vue";
import loading from "@/components/ch-cpns/loading";
import alert from "@/components/ch-cpns/alert";
export default {
  name: "App",
  components: { loading, alert },
  setup() {},
};
</script>

<style lang="scss">
.dark {
  background: #333333;
  color: gray;
}
#main-box {
  margin: 0 auto;
  width: 1000px;
  height: 100%;
  position: relative;
}

#navigator {
  position: absolute;
  left: 0px;
}

#newsList {
  height: 100%;
  position: absolute;
  left: 256px;
}
</style>
