<template>
  <div class="playlists-show">
    <span>
      <router-link :to="`/playlists/${playlist.id}`">
        <button v-on:click="createPlaylist()">Create Filtered Playlist</button>
      </router-link>
      <router-link to="/">
        <button>Back</button>
      </router-link>
      <button v-on:click="deletePlaylist()">
        Delete Playlist
        <FlashMessage></FlashMessage>
      </button>
    </span>
    <h1>{{ playlist.name }}</h1>
    <div v-for="track in tracks" v-bind:key="track.id">
      <div v-if="track.track.album.images[0]">
        <h2>{{ track["track"]["name"] }} by {{ track["track"]["album"]["artists"][0]["name"] }}</h2>
        <p>{{ track["track"]["album"]["name"] }}</p>
        <img v-bind:src="track.track.album.images[0].url" v-bind:alt="track.track.album.images" />
      </div>
    </div>
  </div>
</template>

<style>
img {
  max-width: 10%;
}
</style>

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
        this.tracks = response.data.tracks.items;
      });
    },
    createPlaylist: function () {
      axios
        .post("/playlists", this.playlist)
        .then((response) => {
          console.log("playlists create", response);
          this.$router.push(`/playlists/${response.data.id}`);
        })
        .catch((error) => {
          console.log("playlists create error", error.response);
        });
    },
    deletePlaylist: function () {
      axios.delete(`/playlists/${this.$route.params.id}`).then(
        this.flashMessage.success({
          title: "Playlist Deleted",
          time: 1200,
        })
      );
      setTimeout(() => this.$router.push("/"), 1200);
    },
  },
};
</script>
