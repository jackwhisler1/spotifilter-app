<template>
  <div class="pl">
    <h1>Welcome to SpotiFilter</h1>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newPlaylistParams: {},
    };
  },
  created: function () {},
  methods: {
    createPlaylist: function () {
      axios
        .post("/playlists", this.newPlaylistParams)
        .then((response) => {
          console.log("playlists create", response);
          this.newPlaylistParams = {};
        })
        .catch((error) => {
          console.log("playlists create error", error.response);
        });
    },
  },
};
</script>
