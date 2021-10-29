<template>
  <div class="spotify-callback"></div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    axios.get(`/api/spotify/callback?code=${this.$route.query.code}`).then((response) => {
      console.log(response);
      this.$router.push("/");
    });
  },
};
</script>
