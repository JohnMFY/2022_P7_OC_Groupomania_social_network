<template>
  <section class="allPost">
    <h2 v-if="posts.length < 1">No contents for the moment</h2>
    <article
      v-else
      class="post"
      v-for="post of posts"
      :key="post.id"
    >
      <div class="post_header">
        <h4>{{ post.user.userName }}</h4>
        <div class="post_btn">
          <!-- v-if="user.id == post.userId || user.admin" -->
          <button class="edit"><i class="fa-solid fa-pencil"></i></button>
          <button class="delete">
            <i class="fa-solid fa-xmark fa-lg"></i>
          </button>
        </div>
      </div>

      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>

      <div class="commentForm">
        <div>
          <textarea
            v-model="comment_content"
            name="commentForm_input"
            id="comment_input"
            minlength="2"
            maxlength="150"
            required
            placeholder="Comment here..."
          ></textarea>
          <button class="commentForm_btn">
            <i class="fa-solid fa-comment fa-lg"></i>
          </button>
        </div>
      </div>

      <div class="comment" v-for="comment of post.comments" :key="comment.id">
        <h4>{{ comment.user.userName }}</h4>
        <p>{{ comment.content }}</p>
        <div class="comment_btn">
          <!-- v-if="user.id == comment.userId || user.admin" -->
          <button class="edit"><i class="fa-solid fa-pencil"></i></button>
          <button class="delete">
            <i class="fa-solid fa-xmark fa-lg"></i>
          </button>
        </div>
      </div>
    </article>
  </section>
</template>
<script>
export default {
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
    }).catch(err => console.log(err.message))
  }
}
</script>

<style lang="scss" scoped>
.post{
  border: solid 2px rgba(240, 10, 10, 0.8);
  box-shadow: rgba(240, 10, 10, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  width: 50%;
  margin: 0% 25% 2% 25%;

}
</style>
