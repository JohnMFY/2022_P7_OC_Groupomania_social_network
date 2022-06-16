<template>
  <form class="postForm" @submit.prevent="postForm" method="post">
    <div class="postForm_input">
      <label for="title">Post title:</label>
      <input
        type="text"
        v-model="postData.title"
        name="title"
        id="title"
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
        data.append('image', document.querySelector('#image').files[0])
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .postForm {
  display: flex;
  flex-flow: column wrap;
  width: 33%;
  border: solid rgb(240, 10, 10) 2px;
  padding: 1%;
  margin: 2% 33% 4% 33%;
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
</style>
