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
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  color: red;
}
</style>
