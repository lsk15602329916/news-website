<template>
  <v-alert
    v-model="show"
    density="compact"
    :type="alert.type"
    class="ma-2 alert"
  >
    {{ alert.text }}
  </v-alert>
</template>

<script>
import { ref, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore()
    let alert = ref({})
    let show = ref(false)
    watch(() => store.state.alertInfo, (newVal) => {
      alert.value = newVal
      show.value = true
      setTimeout(() => {
        show.value = false
      }, 2000)
    }, {
      deep: true
    })

    return {
      alert,
      show
    }
  }
}
</script>

<style scoped>
  .alert {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 50px;
  }
</style>