<template>
  <div>
    <h2>PROFILE</h2>
    <form class="userForm" @submit.prevent="userForm" method="post">
      <input
        type="text"
        v-model="userData.userName"
        name="userName"
        required
        minlength="3"
        maxlength="20"
        placeholder="User Name"
      />
      <input
        type="email"
        v-model="userData.email"
        name="email"
        required
        maxlength="150"
        placeholder="Email"
      />
    <div class="userForm_input">
      <button class="postForm_btn">modify profile</button>
    </div>
  </form>
  <button class="userForm_btn" @click="deleteUser">Delete account</button>
  </div>
</template>
<script>
export default {
  name: 'userProfile',
  data () {
    return {
      userData: {
        userName: '',
        email: ''
      }
    }
  },
  methods: {
    userForm (e) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (e.currentTarget.reportValidity()) {
        fetch(`http://localhost:3000/user/${userId}`, {
          method: 'PUT',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName: this.userData.userName,
            email: this.userData.email
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
    },
    deleteUser (e) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (e.currentTarget.reportValidity()) {
        fetch(`http://localhost:3000/user/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }).then(async (result) => {
          this.posts = result.json()
        }).catch(err => console.log(err.message))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.userForm {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
