<template>
  <v-app :class="$store.state.theme">
    <router-view></router-view>
    <LoginDialog @getStatus="getStatus"></LoginDialog>
    <loading />
    <alert />
  </v-app>
</template>

<script>
// import Home from "./views/Home.vue";
import loading from "@/components/ch-cpns/loading";
import LoginDialog from '@/components/loginDialog.vue'
import alert from "@/components/ch-cpns/alert";
import Utils from '@/utils';
export default {
  name: "App",
  components: { loading, alert, LoginDialog },
  setup() {
    const getStatus = (flag) => {
      // console.log(flag)
      // this.loginStatus = flag
      Utils.update('loginStatus', flag)
    }

    return {
      getStatus
    }
  },
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
