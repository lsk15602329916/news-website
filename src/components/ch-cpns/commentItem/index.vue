<template>
  <v-card flat>
    <div class="d-flex pa-2">
      <v-avatar size="36">
        <img
          alt="user"
          :src="comment.user.avatar_url"
        >
      </v-avatar>
      <span class="ml-2">{{ comment.user.name }}</span>
      <v-spacer></v-spacer>
      <v-btn
        size="x-small"
        icon
        @click="fav"
      >
        <v-icon
          size="small"
        >
          mdi-thumb-up-outline
        </v-icon>
      </v-btn>
      <span class="pt-1 ml-2">{{0}}</span>
    </div>
    <v-card-text class="pt-0 pl-12">
      <p>{{ comment.text }}</p>
      <v-btn @click="showReplyInput" size="x-small" flat class="text-caption">回复</v-btn>
      <v-btn v-if="!comment.reply_data.reply_list.length" flat size="x-small" style="color: #00BCD4">
        查看回复 <v-icon size="xx-small">mdi-chevron-down</v-icon>
      </v-btn>
      <div class="d-flex">
        <textarea class="text-area flex-grow-1" rows="5"></textarea>
        <v-btn class="btn align-self-end ml-3" size="small">发送</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    console.log(props.comment);
    let showReply = ref(false)
    const fav = () => {
      console.log(123);
    }

    const showReplyInput = () => {

    }

    return {
      showReply,
      showReplyInput,
      fav
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
</style>