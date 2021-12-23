<template>
  <div>
    <input :type='inputType.type' :placeholder="inputType.placeholder">
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name:'myInput',
  props:['type'],
  setup(props) {
    // console.log(props.type)
    const inputType = props.type
    console.log(inputType);
    return {
      inputType
    }
  },
})
</script>

<style scoped>
input[type='text'], input[type='password'] {
  display: block;
  border-radius: .4rem;
  padding: .8rem 1rem;
  background-color: #fff;
  width: 20rem;
  height: 3rem;
}
input[type='text']:focus, input[type='password']:focus {
  outline: none;
}

input[type='checkbox'] {
 width: 1rem;
 height: 1rem; 
 border: none;
}
</style>
