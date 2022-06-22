<template>
  <section class="allPost">
    <h2 class="emptyApi" v-if="posts.length < 1">No contents for the moment</h2>
    <postVue
      v-for="post in posts"
      :key="post.id"
      :post='post'
    >
    </postVue>
  </section>
</template>
<script>
import postVue from '@/components/onePost.vue'
export default {
  components: {
    postVue
  },
  name: 'allPosts',
  data () {
    return {
      posts: [],
      user: null
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
    fetch('http://localhost:3000/posts', {
      method: 'GET',
      headers: {
        Authorization: `bearer ${this.user.token}`,
        'Content-Type': 'application/json'
      }
    }).then(async (result) => {
      this.posts = await result.json()
      this.posts.forEach(post => { post.updatedAt = new Date(post.updatedAt) })
    }).catch(err => console.log(err.message))
  }
}
</script>

<style lang="scss" scoped>
.emptyApi{
  min-height: 100vh;
}
</style>
