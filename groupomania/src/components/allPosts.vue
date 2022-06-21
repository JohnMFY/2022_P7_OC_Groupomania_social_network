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
      user: null,
      commentData: {
        content: '',
        postId: null
      }
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
  },
  methods: {
    postComment (e) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (e.currentTarget.reportValidity()) {
        const data = new FormData()
        data.append('post', JSON.stringify({
          title: this.commentData.content,
          content: this.commentData.postId
        }))
        fetch('http://localhost:3000/comment', {
          method: 'POST',
          headers: {
            Authorization: `bearer ${user.token}`
          },
          body: data
        })
          .then((result) => {
            if (result.ok) {
              alert('OK')
              // eslint-disable-next-line
              //window.location.reload()
            } else {
              return Promise.reject(result.json())
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.emptyApi{
  min-height: 100vh;
}
</style>
