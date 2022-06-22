<template>
  <div class="topPage">
    <div class="profile">
      <h4>Profile</h4>
      <div class="profile_btn">
        <button class="edit option" @click="goProfile"><i class="fa-solid fa-pencil fa-lg"></i></button>
        <button class="logout option" @click="logout"><i class="fa-solid fa-right-from-bracket"></i></button>
      </div>
    </div>
    <form class="postForm" @submit.prevent="postForm" method="post">
      <div class="postForm_input">
        <label for="title">Post title:</label>
        <input
          type="text"
          v-model="postData.title"
          name="title"
          id="title"
          minlength="3"
          maxlength="150"
          required
          placeholder="Enter your title here..."
        />
      </div>
      <div class="postForm_input">
        <label for="content">Content: </label>
        <textarea
          v-model="postData.content"
          name="content"
          id="content"
          minlength="3"
          maxlength="400"
          required
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
        <button class="postForm_btn">send</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'postForm',
  data () {
    return {
      postData: {
        title: '',
        content: '',
        imageUrl: ''
      }
    }
  },
  methods: {
    postForm (e) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (e.currentTarget.reportValidity()) {
        const data = new FormData()
        data.append('post', JSON.stringify({
          title: this.postData.title,
          content: this.postData.content
        }))
        data.append('imageUrl', document.querySelector('#image').files[0])
        fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            Authorization: `bearer ${user.token}`
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
    goProfile () {
      this.$router.push('/profile')
    },
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.topPage{
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  .profile{
    width: 5%;
    margin: auto 2%;
    padding: 0% 1% 1% 1%;
    background-color: rgb(255, 215, 215);
    border: solid rgb(240, 10, 10) 2px;

    &_btn{
      display: flex;
      justify-content: space-around;
      .option{
        border: solid 2px rgb(78, 81, 102);
        border-radius: 20px;
      }
      .option:hover{
        border: solid 2px red;
      }
      .edit{
        padding: 7%;
      }
      .edit:hover{
        color:orangered;
      }
      .logout{
        padding: 7% 8%;
      }
      .logout:hover{
        color: red;
      }
      .edit:active, .logout:active{
        background-color: rgb(78, 81, 102);
        color: white;
      }
    }
  }
  .postForm {
    display: flex;
    flex-flow: column wrap;
    width: 33%;
    border: solid rgb(240, 10, 10) 2px;
    border-radius: 10px;
    padding: 1%;
    margin: 2% 33% 4% 21%;
    background-color: rgb(255, 215, 215);
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
    }
    button{
      display: flex;
      justify-content: center;
      width: 33%;
      margin: 2% 33%;
      padding: 1%;
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
@media screen and (max-width: 1024px){
  .topPage{
  flex-flow: column wrap;
    .profile{
    width: 66%;
    margin: 4% 33%;
    padding: 0% 1% 1% 1%;
      h4{
        margin: 2% auto;
      }
      &_btn{
        margin: 1% 0%;
        .edit{
          padding: 2%;
        }
        .logout{
          padding: 2% 2.5%;
        }
      }
    }
    .postForm {
      display: flex;
      flex-flow: column wrap;
      width: 80%;
      border: solid rgb(240, 10, 10) 2px;
      border-radius: 10px;
      padding: 1%;
      margin: auto;
    }
  }
}
</style>
