<template>
  <v-app>
    <Home />
  </v-app>
</template>

<script>
import Home from "./views/Home.vue";
export default {
  name: "App",
  components: { Home },
};
</script>

<style>
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