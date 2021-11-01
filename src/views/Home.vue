<template>
  <div class="home">
    <h1>Welcome to SpotiFilter</h1>
    <a
      href="https://accounts.spotify.com/authorize?client_id=975e5460298e4e3aadfb5388395e65b9&response_type=code&redirect_uri=http://localhost:8080/spotify/callback&scope=playlist-read-private playlist-modify-private user-read-private user-read-email user-library-modify playlist-modify-public"
    >
      Buttin
    </a>
    <button v-on:click="authorize()">Authorize Spotifilter</button>
    <div v-for="playlist in playlists" v-bind:key="playlist.id">
      <h2>{{ playlist.name }}</h2>
      <p>Total Tracks: {{ playlist.tracks.total }}</p>
      <router-link :to="`/playlists/${playlist.id}`">
        <button>Select</button>
      </router-link>
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
  },
  methods: {
    authorize: function () {
      axios
        .get(
          `https://accounts.spotify.com/authorize?client_id=${process.env.VUE_APP_SPOTIFY_API}&response_type=code&redirect_uri=http://localhost:8080/spotify/callback&scope=playlist-read-private playlist-modify-private user-read-private user-read-email user-library-modify playlist-modify-public`
        )
        .then((response) => {
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
