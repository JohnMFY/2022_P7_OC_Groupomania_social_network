<template>
    <div class="post_comment">
        <h4>{{ comment.user.userName }}</h4>
        <p>{{ comment.content }}</p>
        <div class="comment_btn" v-if="user.userId == comment.userId || user.admin">
        <button class="delete option" @click="deleteComment"><i class="fa-solid fa-xmark fa-lg"></i></button>
        </div>
    </div>
</template>
<script>
export default {
  name: 'oneComment',
  props: { comment: Object },
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
    deleteComment (e) {
      fetch(`http://localhost:3000/comment/${this.comment.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `bearer ${this.user.token}`
        }
      }).then(res => res.json())
        .then(() => {
          window.location.reload()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.post_comment{
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
  .delete{
    padding: 6% 9%;
  }
  .delete:hover{
    color: red;
  }
  .delete:active{
    background-color: rgb(78, 81, 102);
    color: white;
  }
@media screen and (max-width: 1024px){
    .post_comment{
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
    .delete{
        padding: 6% 9%;
    }
}
</style>
