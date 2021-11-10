<template>
  <div>
    <div v-for="playlist in shared_playlists" v-bind:key="playlist.id">
      <h2>{{ playlist.name }}</h2>
      <img v-bind:src="playlist.images[0].url" v-bind:alt="playlist.id" />
      <p>Total Tracks: {{ playlist.tracks.total }}</p>
      <ul>
        Sample:
        <li>"{{ playlist.tracks.items[0].track.name }}" by {{ playlist.tracks.items[0].track.artists[0].name }}</li>
        <li>"{{ playlist.tracks.items[1].track.name }}" by {{ playlist.tracks.items[1].track.artists[0].name }}</li>
        <li>"{{ playlist.tracks.items[2].track.name }}" by {{ playlist.tracks.items[2].track.artists[0].name }}</li>
        <li>"{{ playlist.tracks.items[3].track.name }}" by {{ playlist.tracks.items[3].track.artists[0].name }}</li>
      </ul>
      <router-link :to="`/playlists/${playlist.id}`">
        <button>Select</button>
      </router-link>
      <hr size="1" noshade width="50%" />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      shared_playlists: [],
      apiKey: process.env.VUE_APP_SPOTIFY_API,
    };
  },
  created: function () {
    this.sharedPlaylistsIndex();
  },
  methods: {
    sharedPlaylistsIndex: function () {
      axios.get("/shared_playlists").then((response) => {
        console.log(response.data);
        this.shared_playlists = response.data;
      });
    },
    isLoggedIn: function () {
      return localStorage.jwt;
    },
  },
};
</script>
