<template>
  <div class="d-flex px-2 mt-2">
    <v-avatar size="24">
      <img
        alt="user"
        :src="comment.user.avatar_url"
      >
    </v-avatar>
    <span class="ml-2">{{ comment.user.name }}</span>
    <span class="mx-3">回复</span>
    <v-avatar size="24">
      <img
        alt="user"
        :src="user.avatar_url"
      >
    </v-avatar>
    <span class="ml-2">{{ user.name }}</span>
    <v-spacer></v-spacer>
    <span class="mt-2 ml-2">{{ comment.favCount || 0 }}</span>
    <v-btn
      size="x-small"
      flat
      icon
      @click="fav"
    >
      <v-icon
        size="x-small"
      >
        {{ `mdi-thumb-up${comment.isFav ? '' : '-outline'}` }}
      </v-icon>
    </v-btn>
  </div>
  <p class="pl-2">{{ comment.text }}</p>
  <div class="d-flex">
    <v-btn
      class="ml-2"
      flat
      size="xx-small"
      @click="showInput"
    >
      <span class="text-caption">回复</span>
    </v-btn>
    <v-spacer></v-spacer>
    <div class="text-caption mr-3">{{ comment.createdAt?.slice(0, 19).split('T').join(' ') }}</div>
  </div>
  <text-input 
    v-if="show"
    @update-comment="updateComment"
    class="mt-2"
    :belong_comment="comment.belong_comment"
    :replyTo="comment._id"
  />
</template>

<script>
import { favComment } from '@/service/api';
import textInput from '../textInput';
import { useStore } from 'vuex';
import { ref } from '@vue/reactivity';
export default {
  props: {
    comment: {
      type: Object,
      default() {
        return {}
      }
    },
    user: {
      type: Object,
      default() {
        return {}
      }
    },
    belong_comment: [String, Number]
  },
  components: {
    textInput
  },
  emits: ['update-second-fav', 'update-com'],
  setup(props, context) {
    const store = useStore()
    let show = ref(false)
    const fav = async () => {
      await favComment({
        // user_id: store.state.user.id,
        comment_id: props.comment._id
      }).then(res => {
        if(res.code === 401 || res.data === null) {
          Utils.showErrorAlert('请先登录')
        } else {
          context.emit('update-second-fav', res.data)
        }
      }).catch(err => {
        console.log(err);
      })
    }

    const showInput = () => {
      show.value = !show.value
    }

    const updateComment = async (id) => {
      context.emit('update-com', id)
    }

    return {
      show,
      showInput,
      fav,
      updateComment
    }
  }
}
</script>

<style>

</style>