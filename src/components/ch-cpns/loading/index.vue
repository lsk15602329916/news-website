<template>
  <div class="text-center">
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
    >
      <v-card
        color="rgba(0,0,0,0.5)"
        width="150"
      >
        <v-card-text class="d-flex white--text justify-center align-center">
          加载中...
          <v-progress-circular
            indeterminate
            class="ml-1"
            color="white"
          ></v-progress-circular>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { ref, watch } from '@vue/runtime-core';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const store = useStore()
      let loading = ref(false)

      watch(() => store.state.loading, (newVal) => {
        loading.value = newVal
      }, {
        immediate: true
      })

      return {
        loading
      }
    }
  }
</script>