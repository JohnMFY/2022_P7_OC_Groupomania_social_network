<template>
  <section class="allPost" id="app">
    <h2 v-if="posts.length < 1">No contents for the moment</h2>
    <article v-else class="post" v-for="post of posts.slice().reverse()" :key="post.id">
      <div class="post_header">
        <h4>{{ post.user.userName }}</h4>
        <div class="post_btn">
          <!-- v-if="user.id == post.userId" -->
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
          <!-- v-if="user.id == comment.userId || admin = true" -->
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
  name: 'allPosts'
}
/*
const apiData = {
  data () {
    return {
      group: 'Groupomania',
      posts: []
    }
  },
  created () {
    fetch('http://localhost:3000/posts')
      .then((response) => response.json())
      .then((json) => {
        this.posts = json
      })
  }
}

const app = Vue.createApp(apiData).mount('#app')
*/
/*
async created() {
  // GET request using fetch with async/await
  const response = await fetch("https://api.npms.io/v2/search?q=vue");
  const data = await response.json();
  this.totalVuePackages = data.total;
}
*/
</script>
