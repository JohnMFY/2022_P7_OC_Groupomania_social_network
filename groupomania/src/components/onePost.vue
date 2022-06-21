<template>
  <article class="post">
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
      <h5>{{ post.updatedAt.toLocaleString() }}</h5>
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
        <button class="delete option" @click="deleteComment"><i class="fa-solid fa-xmark fa-lg"></i></button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'onePost',
  props: { post: Object },
  data () {
    return {
      user: {
        userId: null,
        admin: false
      }
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    editPost () {
      console.log('test')
    },
    deletePost (e) {
      fetch(`http://localhost:3000/posts/${this.post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `bearer ${this.user.token}`
        }
      }).then(res => res.json())
        .then(() => {
          window.location.reload()
        })
    },
    deleteComment () {
    }
  }
}

</script>

<style lang="scss" scoped>
.post{
  border: solid 2px rgba(240, 10, 10, 0.8);
  border-radius: 20px;
  background-color: rgb(255, 215, 215);
  box-shadow: rgba(240, 10, 10, 0.6) 3px 1px 8px 0px, rgba(255, 255, 255, 0.8) -3px -1px 8px 0px;
  width: 50%;
  margin: 0% 25% 2% 25%;
  padding: 1%;
  &_header{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    h3{
      box-shadow: rgba(240, 10, 10, 0.5) 0px 0px 0px 3px;
      background-color: white;
      padding: 1%;
      border-radius: 20px;
      width:auto
    }
    .post_btn{
      width: 10%;
      display: flex;
      justify-content: space-around;
    }
  }
  &_content{
    background-color: white;
    padding: 1% 0%;
    margin: 2% 0%;
    border-radius: 20px;
    box-shadow: rgb(240, 10, 10) 0px 20px 30px -10px;
    h2{
      text-decoration: underline;
    }
    p{
      text-align: start;
      padding-left: 2%;
    }
    img{
      object-fit: contain;
      max-width: 33%;
      max-height: 33%;
      border-radius: 20px;
    }
    h5{
      text-align: start;
      text-decoration: overline underline;
      margin: 0% 2%;
    }
  }
  &_commentForm{
    padding: 2% 0%;
    display: flex;
    justify-content: center;
    #comment_input{
      width: 50%;
    }
    .commentForm_btn{
      margin: 0% 2%;
      padding: 2%;
      border-radius: 30px;
      border: solid 2px rgb(78, 81, 102);
    }
    .commentForm_btn:hover{
      border: solid red 2px;
      color: rgb(78, 81, 102);
    }
    .commentForm_btn:active{
      color: white;
      background-color: rgb(78, 81, 102);
    }
  }
  &_comment{
    margin: 2%;
    padding: 0% 1%;
    background-color: white;
    display: flex;
    flex-flow: row nowrap;
    border-radius: 20px;
    align-items: center;
    justify-content: flex-start;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    h4{
      box-shadow: rgba(240, 10, 10, 0.5) 0px 0px 0px 3px;
      padding: 1%;
      margin: 1% 0.5% 1% 0%;
      border-radius: 20px;
      width: auto;
    }
    p{
      display: flex;
      text-align: start;
      margin: 2%;
      width: 80%;

    }
    .comment_btn{
      width: 10%;
      display: flex;
      justify-content: space-around;
      align-content: flex-end;
    }
  }
  .option{
    border: solid 2px rgb(78, 81, 102);
    border-radius: 20px;
  }
  .option:hover{
    border: solid 2px red;
  }
  .edit{
    padding: 7% 8%;
  }
  .edit:hover{
    color:orangered;
  }
  .delete{
    padding: 6% 9%;
  }
  .delete:hover{
    color: red;
  }
  .edit:active, .delete:active{
    background-color: rgb(78, 81, 102);
    color: white;
  }
}
@media screen and (max-width: 1024px){
  .post{
  width: auto;
  margin: 5%;
  padding: 1%;
  &_header{
    h3{
      width:auto
    }
    .post_btn{
      width: 25%;
    }
  }
  &_commentForm{
    padding: 2% 0%;
    #comment_input{
      width: 76%;
    }
    .commentForm_btn{
      margin: 1% 2%;
    }
  }
  &_comment{
    flex-flow: column wrap;
    h4{
      padding: 1%;
      margin: 4% 0.5% 1% 0%;
      width: auto;
    }
    p{
      display: flex;
      text-align: start;
      margin: 2% 5%;
      width: 90%;

    }
    .comment_btn{
      width:33%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 4% auto;
    }
  }
  .edit{
    padding: 7% 8%;
  }
  .delete{
    padding: 6% 9%;
  }
}
}
</style>
