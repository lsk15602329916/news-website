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
import { watch } from 'vue-demi';
import { useStore } from 'vuex';
export default {
  name: "App",
  components: { loading, alert, LoginDialog },
  setup() {
    const getStatus = (flag) => {
      // console.log(flag)
      // this.loginStatus = flag
      Utils.update('loginStatus', flag)
    }
    const store = useStore()

    watch(() => store.state.user, (newVal) => {
      if(newVal.phoneNumber) {
        localStorage.setItem('username', username || '')
        localStorage.setItem('phoneNumber', phone || '')
        localStorage.setItem('email', email || '')
        localStorage.setItem('gender', gender || '男')
        localStorage.setItem('birthday', birthday || '2021-01-01')
        localStorage.setItem('headportrait', headportrait || '../assets/image/head1')
      }
    }, {
      deep: true
    })

    watch(() => store.state.token, (newVal) => {
      console.log(newVal);
      localStorage.setItem('_TOKEN', newVal)
    })

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
