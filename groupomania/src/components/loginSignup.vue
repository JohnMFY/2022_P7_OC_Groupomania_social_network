<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <article>
      <div class="container">
        <div>
          <h3 v-if="this.mod == 'login'">To create an account<a @click="this.mod='signup'">SIGNUP</a></h3>
          <h3 v-if="this.mod == 'signup'">If you have an account<a @click="this.mod='login'">LOGIN</a></h3>
        </div>
        <span id="logError"></span>
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
            document.querySelector('#logError').innerHTML = ' <i class="fa-solid fa-triangle-exclamation"></i> ' + error.error + ' <i class="fa-solid fa-triangle-exclamation"></i>'
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
          }).catch(() => {
            document.querySelector('#logError').innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Account creation failed <i class="fa-solid fa-triangle-exclamation"></i>'
          })
      }
    },
  },
};
</script>

<style scoped lang="scss">
h1{
  margin-top: 3%;
}
.container {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  margin: 3% auto 5% auto;
  h3{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    a{
      border: solid 2px red ;
      border-radius: 5px;
      padding: 0% 0.25%;
      margin-left: 0.5%;
      background-color: rgb(255, 215, 215);
      box-shadow: rgba(240, 10, 10, 0.4) 5px 5px, rgba(240, 10, 10, 0.3) 10px 10px;
    }
    a:hover{
      color: red;
    }
  }
  form {
    display: flex;
    flex-flow: column nowrap;
    width: 33%;
    margin: 1% 32%;
    border: solid red 2px;
    border-radius: 30px;
    padding: 1%;
    background-color: rgb(255, 215, 215);
    box-shadow: rgba(240, 10, 10, 0.4) -5px 5px, rgba(240, 10, 10, 0.3) -10px 10px, rgba(240, 10, 10, 0.2) -15px 15px, rgba(240, 10, 10, 0.1) -20px 20px, rgba(240, 10, 10, 0.05) -25px 25px;
    
    h2{
      text-decoration: underline;
    }
    
    input{
      margin: 2% 0%;
      height: 20px;
      border: solid white 2px;
      border-radius: 5px;
      padding: 0.5%;
    }
    input:focus{
      outline: none ;
      border: solid red 2px;
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
#logError{
  color: red;
}
@media screen and (max-width: 1024px){
  h1{
    margin: 4%;
  }
  .container {
    form {
      width: 80%;
      margin: 4% 9%;
      padding: 2%;
    }
  }
}
</style>
