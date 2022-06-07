<template>
  <div>
    <formPost/>
    <allPosts/>
  </div>
</template>

<script>
import formPost from '@/components/formPost.vue'
import allPosts from '@/components/posts.vue'
export default {
  name: 'NetworkView',
  components: {
    formPost,
    allPosts
  }
}
</script>
