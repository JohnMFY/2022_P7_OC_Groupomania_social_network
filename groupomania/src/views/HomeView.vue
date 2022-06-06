<template>
  <div class="home">
    <LoginSignup msg="Welcome to Your corporation Network"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginSignup from '@/components/loginSignup.vue'

export default {
  name: 'HomeView',
  components: {
    LoginSignup
  }
}
</script>
