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
      const token = localStorage.getItem('token')
      if (e.currentTarget.reportValidity()) {
        fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: this.postData.title,
            content: this.postData.content
          })
        })
          .then(async (result) => {
            if (result.ok) {
              return result.json()
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
  .postFrom{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    form {
      display: flex;
      flex-flow: column nowrap;
      width: 33%;
  }
  }
</style>
