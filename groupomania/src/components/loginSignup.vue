<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <article>
      <div class="container">
        <span id="logError"></span>
        <div>
          <button v-if="this.mod == 'login'" @click="this.mod='signup'">Signup</button>
          <button v-if="this.mod == 'signup'" @click="this.mod='login'">Login</button>
        </div>
        <form v-if="this.mod == 'signup'" class="create-account" @submit.prevent="signup" method="post">
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
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,60}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
        <form v-if="this.mod == 'login'" class="login" @submit.prevent="login" method="post">
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
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,60}"
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
/* eslint-disable */ 
export default {
  name: "Login_Signup",
  props: { msg: String },
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      signupData: {
        userName: "",
        email: "",
        password: "",
      },
      mod: 'signup'
    };
  },
  methods: {
    login(e) {
      if (e.currentTarget.reportValidity()) {
        fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {
            email: this.loginData.email,
            password: this.loginData.password,
          }),
        })
          .then(async (result) =>{
            if(result.ok){         
            return result.json() 
            }else{
              return Promise.reject(await result.json())
            }
          })
          .then((data) => {
            localStorage.setItem('user', JSON.stringify(data));
            this.$router.push('/Network')
          })
          .catch((error)=> {
            document.querySelector('#logError').innerHTML = error.error
          })
      }
    },
    signup(e) {
      if (e.currentTarget.reportValidity()) {
        fetch('http://localhost:3000/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( {
            email: this.signupData.email,
            userName: this.signupData.userName,
            password: this.signupData.password,
          }),
        })
          .then(async (result) =>{
            if(result.ok){         
            return result.json() 
            }else{
              return Promise.reject(await result.json())
            }
          })
          .then((data) => {
            localStorage.setItem('user', JSON.stringify(data));
            this.$router.push('/Network')
          })
      }
    },
  },
};
</script>

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
#logError{
  color: red;
}
</style>
