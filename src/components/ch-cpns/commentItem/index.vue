<template>
  <v-card
    flat
    :theme="$store.state.theme"
  >
    <div class="d-flex pa-2">
      <v-avatar size="36">
        <img
          alt="user"
          :src="comment.user.avatar_url"
        >
      </v-avatar>
      <span class="ml-2">{{ comment.user.name }}</span>
      <v-spacer></v-spacer>
      <span class="pt-1 ml-2">{{ comment.favCount || 0 }}</span>
      <v-btn
        size="x-small"
        icon
        flat
        @click="fav"
      >
        <v-icon
          size="small"
        >
          {{ `mdi-thumb-up${comment.isFav ? '' : '-outline'}` }}
        </v-icon>
      </v-btn>
    </div>
    <v-card-text class="pt-0 pl-12">
      <p>{{ comment.text }}</p>
      <v-btn @click="showReplyInput" size="x-small" flat class="text-caption">回复</v-btn>

      <v-btn 
        v-if="comment.reply_data.reply_list.length" 
        flat 
        size="x-small" 
        style="color: #00BCD4"
        @click="showSecondComment"
      >
        查看回复 <v-icon size="xx-small">{{`mdi-chevron-${secondComment ? 'up' : 'down'}`}}</v-icon>
      </v-btn>

      <div v-show="secondComment">
        <second-comment-item
          v-for="item in comment.reply_data.reply_list"
          @update-second-fav="updateSecondFav($event, item)"
          @update-com="updateComment"
          :key="item._id"
          :comment="item"
          :user="comment.user"
          :belong_comment="comment.belong_comment"
        />
      </div>

      <text-input
        v-if="showTextArea"
        @update-comment="updateComment"
        class="mt-2"
        :belong_comment="comment.belong_comment"
        :replyTo="comment._id"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import textInput from './textInput';
import secondCommentItem from './secondCommentItem';
import { favComment } from '@/service/api';
import Utils from '@/utils';
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    textInput,
    secondCommentItem
  },
  emits: ['update-fav', 'update-com'],
  setup(props, context) {
    // console.log(props.comment);
    let showReply = ref(false)
    let showTextArea = ref(false)
    let secondComment = ref(false)
    const store = useStore()

    const fav = async () => {
      await favComment({
        // user_id: store.state.user.id,
        comment_id: props.comment._id
      }).then(res => {
        if(res.code === 401 || res.data === null) {
          Utils.showErrorAlert('请先登录')
        } else {
          context.emit('update-fav', res.data)
        }
      }).catch(err => {
        console.log(err);
      })
    }

    const updateComment = (id) => {
      context.emit('update-com', id)
    }

    const updateSecondFav = (k, item) => {
      item.isFav = Boolean(k)
      item.favCount += (k ? 1 : -1)
    }

    const showReplyInput = () => {
      showTextArea.value = !showTextArea.value
    }

    const showSecondComment = () => {
      secondComment.value = !secondComment.value
    }

    return {
      showReply,
      showTextArea,
      showReplyInput,
      fav,
      secondComment,
      showSecondComment,
      updateComment,
      updateSecondFav
    }
  }
}
</script>

<style scoped>
  /* .text-area {
    background: rgb(228, 228, 228);
    border: 3px solid gray;
    border-radius: 5px;
  }

  .btn {
    color: white;
  } */
</style>