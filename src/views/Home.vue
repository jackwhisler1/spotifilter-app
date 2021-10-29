<template>
  <div class="home">
    <h1>Welcome to SpotiFilter</h1>
    <div v-for="playlist in playlists" v-bind:key="playlist.id">
      <h2>{{ playlist.name }}</h2>
      <p>Total Tracks: {{ playlist.tracks.total }}</p>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
// global axios
export default {
  data: function () {
    return {
      playlists: [],
    };
  },
  created: function () {
    this.playlistsIndex();
    this.authorize();
  },
  methods: {
    authorize: function () {
      axios.get("/api/spotify_authorize").then((response) => {
        console.log(response);
      });
    },
    playlistsIndex: function () {
      axios.get("/playlists").then((response) => {
        console.log(response.data);
        this.playlists = response.data;
      });
    },
  },
};
</script>
