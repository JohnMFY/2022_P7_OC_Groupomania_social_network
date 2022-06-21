<template>
  <div>
    <formPost/>
    <allPosts/>
  </div>
</template>

<script>
import formPost from '@/components/formPost.vue'
import allPosts from '@/components/allPosts.vue'
export default {
  name: 'NetworkView',
  components: {
    formPost,
    allPosts
  }
}
</script>
<style lang="scss" scoped>

</style>
