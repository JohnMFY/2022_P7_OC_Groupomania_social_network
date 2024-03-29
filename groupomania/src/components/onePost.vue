<template>
  <article class="post">

    <div class="post_header">
      <h3>{{ post.user.userName }}</h3>
      <div class="post_btn" v-if="user.userId == post.userId || user.admin">
        <button class="edit option" @click="show = !show" v-show="!show"><i class="fa-solid fa-pencil"></i></button>
        <button class="edit option" v-show="show" @click="show = !show"><i class="fa-solid fa-rotate-left"></i></button>
        <button class="delete option" @click="deletePost()"><i class="fa-solid fa-xmark fa-lg"></i></button>
      </div>
    </div>

    <div v-show="!show" class="post_content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <img :src="post.imageUrl" :alt="post.imageUrl" v-if="post.imageUrl">
      <h5>{{ post.updatedAt.toLocaleString() }}</h5>
    </div>
     <form id="edit" v-show="show" @submit.prevent="editPost() ; show = !show" method="put" class="postForm">
      <div class="postForm_input">
        <label for="title">Edit title:</label>
        <input
          type="text"
          v-model="postData.title"
          name="title"
          id="title"
          maxlength="150"
          placeholder="Enter your title here..."
        />
      </div>
      <div class="postForm_input">
        <label for="content">Edit Content: </label>
        <textarea
          v-model="postData.content"
          name="content"
          id="content"
          maxlength="400"
          placeholder="Enter your post here..."
        ></textarea>
      </div>
      <div class="postForm_input">
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
      <div class="postForm_input">
        <button class="edit option"><i class="fa-solid fa-circle-check"></i></button>
      </div>
    </form>
    <form class="post_commentForm" @submit.prevent="postComment">
      <textarea
        v-model="commentData.content"
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
    </form>

    <commentVue
      v-for="comment of post.comments"
      :key="comment.id"
      :comment='comment'
    >
    </commentVue>

  </article>
</template>

<script>
import commentVue from '@/components/oneComment.vue'
export default {
  components: {
    commentVue
  },
  name: 'onePost',
  props: { post: Object },
  data () {
    return {
      show: false,
      postData: {
        title: this.post.title,
        content: this.post.content,
        imageUrl: null
      },
      user: {
        userId: null,
        admin: false
      },
      commentData: {
        content: '',
        postId: ''
      }
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    editPost () {
      if (document.querySelector('#edit').reportValidity()) {
        const data = new FormData()
        data.append('post', JSON.stringify({
          title: this.postData.title,
          content: this.postData.content
        }))
        if (document.querySelector('#image').files.length > 0) {
          data.append('imageUrl', document.querySelector('#image').files[0])
        }
        fetch(`http://localhost:3000/posts/${this.post.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `bearer ${this.user.token}`
          },
          body: data
        })
          .then(async (result) => {
            if (result.ok) {
              window.location.reload()
            } else {
              return Promise.reject(await result.json())
            }
          })
      }
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
    postComment (e) {
      if (e.currentTarget.reportValidity()) {
        fetch('http://localhost:3000/comment', {
          method: 'POST',
          headers: {
            Authorization: `bearer ${this.user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            content: this.commentData.content,
            postId: this.post.id
          })
        })
          .then(async (result) => {
            if (result.ok) {
              window.location.reload()
            } else {
              return Promise.reject(await result.json())
            }
          })
      }
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
   .postForm {
      display: flex;
      flex-flow: column wrap;
      width: 80%;
      border: dotted white 4px;
      border-radius: 10px;
      padding: 1%;
      margin: 2% 10%;
      background-color: rgb(78, 81, 102);
      color: white;
      box-shadow: rgba(78, 81, 102, 0.4) 0px 0px 0px 2px, rgba(78, 81, 102, 0.65) 0px 4px 6px -1px, rgba(78, 81, 102, 0.08) 0px 1px 0px;
      &_input{
        width:100%;
        display: flex;
        flex-flow:column nowrap;
        label{
          font-weight: bold;
        }
        input, #content{
          margin: 2% 0%;
        }
        button{
          display: flex;
          justify-content: center;
          width: 33%;
          margin: 2% 33%;
          padding: 2%;
          border: solid #4E5166 2px;
          border-radius: 5px;
          font-weight: bolder;
          box-shadow: rgba(78, 81, 102, 0.4) -4px 4px 4px 4px;
        }
        button:hover{
          box-shadow: rgba(78, 81, 102, 0.6) -2px 2px 2px 2px;
          border: solid rgb(240, 10, 10) 2px;
        }
        button:active{
          box-shadow: rgba(78, 81, 102, 0.8) 0px 2px 2px;
          background: lighten(#4E5166, 10%);
          color: white;
        }
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
      margin: 3% auto;
    }
    img{
      object-fit: contain;
      max-width: 80%;
      border-radius: 20px;
      border: dotted gray 1px;
      box-shadow: 3px 3px 2px gray;
    }
    h5{
      text-align: start;
      text-decoration: overline underline;
      margin: 2%;
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
