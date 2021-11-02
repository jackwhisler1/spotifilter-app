<template>
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <h1>Login</h1>

      <div v-if="errors.length > 0">
        <p>Username or password incorrect.</p>
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newSessionParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newSessionParams.password" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          console.log(response.data);
          // axios.get("/api/spotify_authorize");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log("login error", error.response);
          this.errors.push(error.response.request.statusText);
        });
    },
  },
};
</script>
