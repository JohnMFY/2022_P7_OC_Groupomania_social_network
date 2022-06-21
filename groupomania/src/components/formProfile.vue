<template>
  <div class="profile">
    <h2>PROFILE</h2>
    <article class="user">
      <h3> {{ user.userName }} </h3>
      <h4> {{ user.email }} </h4>
      <button @click="back">back</button>
    </article>
    <button class="delete" @click="deleteUser"><i class="fa-solid fa-triangle-exclamation fa-lg"></i> Delete account <i class="fa-solid fa-triangle-exclamation fa-lg"></i></button>
  </div>
</template>
<script>
export default {
  name: 'userProfile',
  data () {
    return {
      user: []
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:3000/user/${this.user.userId}`, {
      method: 'GET',
      headers: {
        Authorization: `bearer ${this.user.token}`,
        'Content-Type': 'application/json'
      }
    }).then(async (result) => {
      this.user = await result.json()
    }).catch(err => console.log(err.message))
  },
  methods: {
    back () {
      this.$router.push('/Network')
    },
    deleteUser () {
      this.user = JSON.parse(localStorage.getItem('user'))
      fetch(`http://localhost:3000/user/${this.user.userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `bearer ${this.user.token}`,
          'Content-Type': 'application/json'
        }
      }).then(() => {
        alert('Account Deleted !')
        localStorage.clear()
        this.$router.push('/')
      })
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
  .user {
    display: flex;
    flex-flow: column nowrap;
    padding: 1%;
    width: 33%;
    margin-left:33%;
    background-color: rgb(255, 215, 215);
    border: solid rgb(240, 10, 10) 2px;
    box-shadow: rgba(240, 10, 10, 0.4) -5px 5px, rgba(240, 10, 10, 0.3) -10px 10px, rgba(240, 10, 10, 0.2) -15px 15px, rgba(240, 10, 10, 0.1) -20px 20px, rgba(240, 10, 10, 0.05) -25px 25px;
    h3{
      margin: 2% 33%;
      border: solid 2px black;
      border-radius: 15px;
      width: auto;
      background-color: white;
    }
    h4{
      margin: 4% 0%;
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
@media screen and (max-width: 1024px){
  .profile{
  min-height: 81vh;
    h2{
      text-decoration: underline;
      margin: 4%;
    }
    .user {
      padding: 2%;
      width: 78%;
      margin: 10%;
    }
    button{
      width: 50%;
      margin: 2% 25%;
      padding: 1%;
    }
    .delete{
      width: 80%;
      margin: 10% auto;
    }
  }
}
</style>
