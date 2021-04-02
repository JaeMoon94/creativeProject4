<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form">

      <form class="pure-form">
      <div>
        <h2>Login</h2>
        <input placeholder="username" class = "bigger" v-model="usernameLogin">
        <input type="password" placeholder="password" class = "bigger" v-model="passwordLogin">
      </div>
      <div>
        <button type="submit" class="pure-button" @click.prevent = "login" @click="login()">Login</button>
      </div>
    </form>

      <div>
        <h2>Register for an account</h2>
        <input placeholder="First Name" class = "bigger" v-model="firstName">
        <input placeholder="Last Name" class = "bigger" v-model="lastName">
      </div>
      <div>
        <input placeholder="username"  class = "bigger" v-model="username">
        <input type="password" placeholder="password" class = "bigger" v-model="password">
      </div>
      <div>
        <button type="submit" class="pure-button" @click.prevent="register" @click="register()">Register</button>
      </div>
    </form>
    <div  v-if="error" class="error">
      <p>{{error}}</p>
    </div>
    
  <div v-if="errorLogin" class = "error">
    <p >{{errorLogin}}</p>
  </div>
</div>
<div class = "back"></div>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Home',
  data: function() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      usernameLogin: "",
      passwordLogin: "",
      error: "",
      errorLogin: "",
      registerReady: true
    }
  },
  components: {
  },
  methods: {
    async register() {
      if (!this.registerReady) {
        return
      }
      this.registerReady = false;
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password) {
        this.registerReady = true;
        return;
      }
      try {
        let response = await axios.post('/api/users', {
          firstname: this.firstName,
          lastname: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
        this.$root.$data.profile = response.data.profile;
        this.$router.push("/")
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
        this.$root.$data.profile = null;
      }
      this.firstName = ""
      this.lastName = ""
      this.username = ""
      this.password = ""
      this.registerReady = true
    },
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin) {
        return;
      }
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
        this.$root.$data.profile = response.data.profile;
        this.$router.push("/")
      } catch (error) {
        this.errorLogin = error.response.data.message;
        this.$root.$data.user = null;
        this.$root.$data.profile = null;
      }
      this.usernameLogin = ""
      this.passwordLogin = ""
    }
  }
}
</script>
