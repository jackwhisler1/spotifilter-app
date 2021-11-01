<template>
  <div class="playlists-show">
    <!-- <h1>Show Page for {{  }}</h1> -->
    <h1>Testing</h1>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      playlist: {},
      newPlaylistParams: {},
    };
  },
  created: function () {},
  methods: {
    showPlaylist: function () {
      axios.get(`/playlists/${this.$route.params.id}`).then((response) => {
        console.log("movies show", response);
        this.playlist = response.data;
      });
    },
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
