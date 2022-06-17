<template>
  <div class="profile">
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
  <button class="delete" @click="deleteUser"><i class="fa-solid fa-triangle-exclamation fa-lg"></i> Delete account <i class="fa-solid fa-triangle-exclamation fa-lg"></i></button>
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
          this.posts = await result.json()
        }).catch(err => console.log(err.message))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.profile{
  min-height: 60vh;
  h2{
    text-decoration: underline;
    margin: 2%;
  }
  .userForm {
    display: flex;
    flex-flow: column nowrap;
    padding: 1%;
    width: 33%;
    margin-left:33%;
    background-color: rgb(255, 215, 215);
    border: solid rgb(240, 10, 10) 2px;
    box-shadow: rgba(240, 10, 10, 0.4) -5px 5px, rgba(240, 10, 10, 0.3) -10px 10px, rgba(240, 10, 10, 0.2) -15px 15px, rgba(240, 10, 10, 0.1) -20px 20px, rgba(240, 10, 10, 0.05) -25px 25px;
    input{
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
  .delete{
    width: 35%;
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 800;
    .fa-triangle-exclamation{
      display: none;
    }
  }
  .delete:hover{
    color: red;
    .fa-triangle-exclamation{
      display: contents;
    }
  }
}
</style>
