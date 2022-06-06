<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <article>
      <div class="container">
        <form class="sign-up">
          <h2>Create login</h2>
          <div>Use your email for registration</div>
          <input type="text" v-model="userName" name="userName" id="name" required minlength="3" maxlength="20" placeholder="Name">
          <input type="email" v-model="email" name="email" id="email" required maxlength="150" placeholder="Email">
          <input type="password" v-model="password" name="password" id="password" required minlength="8" maxlength="60" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Password">
          <button>Sign Up</button>
        </form>
        <form class="sign-in">
          <h2>Sign In</h2>
          <div>Use your account</div>
          <input type="email" v-model="email" name="email" id="email" required maxlength="150" placeholder="Email">
          <input type="password" v-model="password" name="password" id="password" required minlength="8" maxlength="60" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least two number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Password">
          <button>Sign Up</button>
        </form>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Login_Signup',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container{
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  form{
    display: flex;
    flex-flow: column nowrap;
    width: 33%;
  }
}
</style>
