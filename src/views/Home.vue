<template>
  <div class="home">
    <h1>Welcome to SpotiFilter</h1>
    <div v-if="isLoggedIn()">
      <p>Select a playlist to apply a filter.</p>
    </div>
    <div v-if="playlists.length === 0">
      <h2>Please authorize to allow Spotifiliter to use playlist information.</h2>
      <a
        :href="`https://accounts.spotify.com/authorize?client_id=${apiKey}&response_type=code&redirect_uri=http://localhost:8080/spotify/callback&scope=playlist-read-private playlist-modify-private user-read-private user-read-email playlist-read-collaborative user-library-modify playlist-modify-public`"
      >
        <button>Authorize Spotifilter</button>
      </a>
    </div>
    <hr width="80%" />
    <div v-if="isLoggedIn()">
      <div v-for="playlist in filterBy(playlists, 'rock')" v-bind:key="playlist.id">
        <h2>{{ playlist.name }}</h2>
        <div v-if="playlist.images">
          <img v-bind:src="playlist.images[0].url" v-bind:alt="playlist.id" />
        </div>
        <p>Total Tracks: {{ playlist.tracks.total }}</p>
        <router-link :to="`/playlists/${playlist.id}`">
          <button>Select</button>
        </router-link>
        <hr size="1" noshade width="50%" />
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
// global axios
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      playlists: [],
      apiKey: process.env.VUE_APP_SPOTIFY_API,
    };
  },
  created: function () {
    this.playlistsIndex();
  },
  methods: {
    playlistsIndex: function () {
      axios.get("/playlists").then((response) => {
        console.log(response.data);
        this.playlists = response.data;
      });
    },
    isLoggedIn: function () {
      return localStorage.jwt;
    },
  },
};
</script>
