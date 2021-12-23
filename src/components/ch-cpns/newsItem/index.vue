<template>
  <v-card flat @click="open">
    <v-card-title>
      {{ news.title }}
      <v-spacer></v-spacer>
      <v-card-subtitle>{{news.media_name}} | {{news.datetime}}</v-card-subtitle>
    </v-card-title>
    
    <v-card-text :class="{'d-flex': news.image_list <= 1 }">
      {{ news.abstract }}
      <div class="d-flex mt-2">
        <v-img
          width="100"
          cover
          class="mx-1"
          v-for="item in news.image_list"
          :key="item.url"
          :src="item.url"
        ></v-img>
      </div>
    </v-card-text>
  </v-card>
  <v-divider></v-divider>
</template>

<script>
import Utils from '@/utils';
import { toRefs } from '@vue/reactivity';
export default {
  props: {
    news: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup(props) {
    const { item_id, group_id } = toRefs(props.news)
    const open = () => {
      Utils.openTag(`NewsDetails`, {
        item_id: item_id.value,
        group_id: group_id.value
      })
    }

    return {
      open
    }
  }
}
</script>

<style>

</style>