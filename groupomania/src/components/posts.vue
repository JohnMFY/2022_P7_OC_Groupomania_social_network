<template>
  <section class="allPost">
    <h2 class="emptyApi" v-if="posts.length < 1">No contents for the moment</h2>
    <article
      v-else
      class="post"
      v-for="post of posts"
      :key="post.id"
    >
      <div class="post_header">
        <h3>{{ post.user.userName }}</h3>
        <div class="post_btn" v-if="user.userId == post.userId || user.admin">
          <button class="edit option"><i class="fa-solid fa-pencil"></i></button>
          <button class="delete option">
            <i class="fa-solid fa-xmark fa-lg"></i>
          </button>
        </div>
      </div>
      <div class="post_content">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
      </div>
      <div class="post_commentForm">
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

      <div class="post_comment" v-for="comment of post.comments" :key="comment.id">
        <h4>{{ comment.user.userName }}</h4>
        <p>{{ comment.content }}</p>
        <div class="comment_btn" v-if="user.userId == comment.userId || user.admin">
          <button class="edit option"><i class="fa-solid fa-pencil"></i></button>
          <button class="delete option">
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
.emptyApi{
  min-height: 100vh;
}
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
      width:10%
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
      padding: 2% 2%;
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
    flex-flow: row wrap;
    border-radius: 20px;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    h4{
      box-shadow: rgba(240, 10, 10, 0.5) 0px 0px 0px 3px;
      padding: 1%;
      margin: 1% 0.5%;
      border-radius: 20px;
      width: 10%;
    }
    p{
      display: flex;
      text-align: start;
      margin-left: 2%;
      width: 75%;

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
</style>
