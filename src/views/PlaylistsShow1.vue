<template>
  <div class="playlists-show">
    <div v-for="track in tracks" v-bind:key="track.id">
      <div v-if="track.track.album.images[0]">
        <h2>{{ track["track"]["name"] }} by {{ track["track"]["album"]["artists"][0]["name"] }}</h2>
        <p>{{ track["track"]["album"]["name"] }}</p>
        <img v-bind:src="track.track.album.images[0].url" v-bind:alt="track.track.album.images" />
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      playlist: {},
      tracks: [],
      newPlaylistParams: {},
    };
  },
  created: function () {
    this.showPlaylist();
  },
  methods: {
    showPlaylist: function () {
      axios.get(`/playlists/${this.$route.params.id}`).then((response) => {
        console.log("playlist show", response.data);
        this.playlist = response.data;
        this.tracks = response.data.items;
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
