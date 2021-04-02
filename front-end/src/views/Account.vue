<template>
<div class="users">
  <div class="box">
    <div v-if="!edit">
        <h1>User Information:</h1>
          <ul class = "information">
      <li> Name: {{this.$root.$data.user.firstname}} {{this.$root.$data.user.lastname}}</li>
      <li>Username: {{this.$root.$data.user.username}} </li>
      <br>
      <br>
          </ul>
      <h2 class = "button" v-on:click="edit=true" >CLICK HERE to Edit your Account Information </h2>
      </div>
      <div v-if="edit">
	<div>
        <h1>Enter the Information that you would like to change in the boxes below:</h1>
      </div>
      <div>
        <input placeholder="username"  class = "bigger" v-model="username">
        <input type="password" placeholder="password" class = "bigger" v-model="password">
      </div>
      <div>
        <button type="submit" class="pure-button" v-on:click="editAccount()" style="margin-top: 10px;">Change Username/Password</button>
      </div>
      <div id = "done"></div>
        <button class ="pure-button" v-on:click = "deleteAccount()"> Delete Account</button>
      </div>
      </div>
      <div class="back"></div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'UserDetails',
  data: function() {
    return {
      error: "",
      edit: false,
      username: "",
      password: "",
    }
  },
  components: {
  },
  methods: {
    async editAccount() {
    this.error = '';
    try {
	let response = await axios.put("/api/users/" + this.$root.$data.user.username, {
		username: this.username,
		password: this.password
	});
	this.$root.$data.user = response.data.user;
	this.$root.$data.profile = response.data.profile;
    } catch (error) {
	this.error = error.response.data.message;
    }
    this.username = ""
    this.password = ""
    this.edit = false;
  },
  async resetStats() {
    console.log("resetting")
	this.error = '';
	try {
		let response = await axios.put("/api/users/" + this.$root.$data.user.username, {
    });
    console.log(response)
		this.$root.$data.user = response.data.user;
		this.$root.$data.profile = response.data.profile;
	} catch (error) {
		this.error = error.response.data.message;
	}
	this.$router.push("/")
},
  SignOut() {
      this.$root.$data.user = null;
  },
  deleteAccount() {
    try {
      axios.delete('/api/users/' + this.$root.$data.user.username, {})
      this.SignOut()
      this.$router.push("/")
    }
    catch(error) {
      console.log(error)
    }
  },
}
}

</script>

