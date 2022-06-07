<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <article>
      <div class="container">
        <form class="create-account" method="post">
          <h2>Create account</h2>
          <div>Use your email for registration</div>
          <input
            type="text"
            v-model="signupData.userName"
            name="userName"
            required
            minlength="3"
            maxlength="20"
            placeholder="Name"
          />
          <input
            type="email"
            v-model="signupData.email"
            name="email"
            required
            maxlength="150"
            placeholder="Email"
          />
          <input
            type="password"
            v-model="signupData.password"
            name="password"
            required
            minlength="8"
            maxlength="60"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
        <form class="login" @submit.prevent="test()" method="post">
          <h2>Login</h2>
          <div>Use your account</div>
          <input
            type="email"
            v-model="loginData.email"
            name="email"
            required
            maxlength="150"
            placeholder="Email"
          />
          <input
            type="password"
            v-model="loginData.password"
            name="password"
            required
            minlength="8"
            maxlength="60"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least two number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Login_Signup',
  props:
  { msg: String },
  data () {
    return {
      loginData: {
        email: '',
        password: ''
      },
      signupData: {
        userName: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {

    test () {
      this.$router.push('/Network')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
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
