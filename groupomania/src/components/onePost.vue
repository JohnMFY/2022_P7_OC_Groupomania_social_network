<template>
    <div class="post_header">
        <h3>{{ post.user.userName }}</h3>
        <div class="post_btn" v-if="user.userId == post.userId || user.admin">
          <button class="edit option" @click="editPost"><i class="fa-solid fa-pencil"></i></button>
          <button class="delete option" @click="deletePost()"><i class="fa-solid fa-xmark fa-lg"></i></button>
        </div>
      </div>
      <div class="post_content">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        <img :src="post.imageUrl" :alt="post.imageUrl" v-if="post.imageUrl">
        <p>{{ post.updatedAt }}</p>
      </div>
      <form class="post_commentForm">
        <textarea
          v-model="comment_content"
          name="commentForm_input"
          id="comment_input"
          minlength="2"
          maxlength="150"
          required
          placeholder="Comment here..."
        ></textarea>
        <button class="commentForm_btn" @click="postComment">
          <i class="fa-solid fa-comment fa-lg"></i>
        </button>
      </form>

      <div class="post_comment" v-for="comment of post.comments" :key="comment.id">
        <h4>{{ comment.user.userName }}</h4>
        <p>{{ comment.content }}</p>
        <div class="comment_btn" v-if="user.userId == comment.userId || user.admin">
          <button class="edit option" @click="editComment"><i class="fa-solid fa-pencil"></i></button>
          <button class="delete option" @click="deleteComment"><i class="fa-solid fa-xmark fa-lg"></i></button>
        </div>
      </div>
</template>

<script>
export default {
  name: 'onePost',
  props: ['post'],
  data () {
    return {
      user: null
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}

</script>
