<template>
  <div class="playlists-show">
    <span>
      <button v-on:click="createPlaylist()">Create Filtered Playlist</button>
      <br />
      <router-link to="/">
        <button>Back</button>
      </router-link>
      <button v-if="playlistCreator === userId" v-on:click="deletePlaylist()">
        Delete Playlist
        <FlashMessage></FlashMessage>
      </button>
      <button v-on:click="isShow = !isShow">Edit Playlist Details</button>
      <form v-if="isShow" method="dialog">
        <div>
          Playlist Title
          <input type="text" v-model="editPlaylistParams.name" />
        </div>
        <div>
          Description:
          <input type="text" v-model="editPlaylistParams.description" />
        </div>
        <button v-on:click="editPlaylist()">Submit</button>
        <button>Close</button>
      </form>
    </span>

    <h1>{{ playlist.name }}</h1>
    <p>{{ playlist.description }}</p>
    <div v-for="track in tracks" v-bind:key="track.id">
      <div v-if="track.track.album.images[0]">
        <h3>"{{ track["track"]["name"] }}" by {{ track["track"]["album"]["artists"][0]["name"] }}</h3>
        <p>{{ track["track"]["album"]["name"] }}</p>
        <img v-bind:src="track.track.album.images[0].url" v-bind:alt="track.track.album.images" />
      </div>
    </div>
  </div>
</template>

<style>
img {
  max-width: 20%;
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
      userId: "",
      playlistCreator: "",
      editPlaylistParams: {
        name: "",
        description: "",
      },
      isShow: false,
    };
  },
  created: function () {
    this.showPlaylist();
    this.getUserId();
  },
  methods: {
    showPlaylist: function () {
      axios.get(`/playlists/${this.$route.params.id}`).then((response) => {
        console.log("playlist show", response.data);
        this.playlist = response.data;
        this.tracks = response.data.tracks.items;
        this.playlistCreator = response.data.owner.id;
      });
    },
    createPlaylist: function () {
      axios
        .post("/playlists", this.playlist)
        .then((response) => {
          console.log("playlists create", response);
          this.$router.push(`/playlists/${response.data.id}`);
          this.showPlaylist();
        })
        .catch((error) => {
          console.log("playlists create error", error.response);
        });
    },
    editPlaylist: function () {
      axios
        .patch(`/playlists/${this.$route.params.id}`, this.editPlaylistParams)
        .then((response) => {
          console.log("playlists edit", response);
          this.showPlaylist();
          this.editPlaylistParams = {
            name: "",
            description: "",
          };
          this.isShow = !this.isShow;
        })
        .catch((error) => {
          console.log("playlists edit error", error.response);
        });
    },
    deletePlaylist: function () {
      if (confirm("Do you really want to delete this playlist?")) {
        axios.delete(`/playlists/${this.$route.params.id}`).then(
          this.flashMessage.success({
            title: "Playlist Deleted",
            time: 1200,
          })
        );
        setTimeout(() => this.$router.push("/"), 1200);
      }
    },
    getUserId: function () {
      axios
        .get(`/spotify_usernames/${localStorage.getItem("user_id")}`)
        .then((response) => {
          console.log(response.data);
          this.userId = response.data.id;
        })
        .catch((error) => {
          console.log("username show error", error.response);
        });
    },
  },
};
</script>
