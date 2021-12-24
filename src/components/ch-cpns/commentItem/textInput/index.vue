<template>
  <div class="d-flex">
    <v-hover v-slot="{ hover, props }">
      <v-card flat class="flex-grow-1 d-flex" v-bind="props">
        <textarea
          class="text-area pa-1 flex-grow-1"
          v-model="commentContent"
          rows="5"
        ></textarea>
        <v-overlay v-if="overlay" :model-value="hover" @click="toLogin" contained class="align-center justify-center cursor white--text">
          登录后才能评论，去登录
        </v-overlay>
      </v-card>
    </v-hover>

    <v-btn
      class="btn align-self-end ml-3" 
      color="blue-grey" 
      size="small"
      :disabled="overlay || !commentContent"
      @click="sendComment"
    >发送</v-btn>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { comment } from '@/service/api';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  props: {
    belong_comment: [String, Number],
    replyTo: [String, Number]
  },
  setup(props, context) {
    let commentContent = ref('')
    let overlay = computed(() => !store.state.user.id)
    const store = useStore()
    const route = useRoute()

    const sendComment = async () => {
      let o = {
        user_id: store.state.user.id,
        item_id: route.params.item_id,
        reply_to: props.replyTo?.toString(),
        belong_comment: props.belong_comment || props.replyTo,
        text: commentContent.value
      }
      await comment(o).then(res => {
        context.emit('update-comment')
        commentContent.value = ''
      }).catch(err => {
        console.log(err);
      })
    }

    const toLogin = () => {
      console.log('登录');
    }

    return {
      commentContent,
      sendComment,
      toLogin,
      overlay
    }
  }
}
</script>

<style scoped>
  .text-area {
    background: rgb(228, 228, 228);
    border: 3px solid gray;
    border-radius: 5px;
  }

  .btn {
    color: white;
  }
</style>