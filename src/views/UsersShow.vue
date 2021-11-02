<template>
  <div class="users-show">
    <div v-if="isShow">
      <h1>My Account</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name: {{ user.name }}</label>
        <br />
        <label>Email: {{ user.email }}</label>
      </div>
      <button v-on:click="isShow = !isShow">Edit Account Details</button>
    </div>
    <div v-if="!isShow">
      <form v-on:submit.prevent="usersEdit()">
        <h1>Edit Account Details</h1>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
        <div>
          <label>Name:</label>
          <input type="text" v-model="editUserParams.name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" v-model="editUserParams.email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="editUserParams.password" />
        </div>
        <div>
          <label>Password confirmation:</label>
          <input type="password" v-model="editUserParams.password_confirmation" />
        </div>
        <button v-on:click="usersEdit(), (isShow = !isShow)">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      editUserParams: {},
      errors: [],
      isShow: true,
      confirmation: false,
    };
  },
  created: function () {
    this.usersShow();
  },
  methods: {
    usersShow: function () {
      axios.get(`/users/${localStorage.getItem("user_id")}"`).then((response) => {
        console.log(response.data);
        this.user = response.data;
        this.editUserParams = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
        };
      });
    },
    usersEdit: function () {
      axios
        .patch(`/users/${localStorage.getItem("user_id")}"`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
          this.usersShow();
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    confirmPassword: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          console.log(response.data);
          this.confimration = true;
          // axios.get("/api/spotify_authorize");
        })
        .catch((error) => {
          console.log("login error", error.response);
          this.errors.push(error.response.request.statusText);
        });
    },
  },
};
</script>
