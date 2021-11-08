<template>
  <div class="playlists-show">
    <div v-if="create_show">
      <span>
        <!-- Choose filter -->
        <label for="filter-select">Choose a filter:</label>
        <select required name="filters" id="filter-select" v-model="filter">
          <option value="High Energy">High Energy</option>
          <option value="Calm" selected>Calm</option>
          <option value="Dance">Dance</option>
          <option value="Faster Tempo">Faster Tempo</option>
          <option value="Slower Tempo">Slower Tempo</option>
          >
        </select>
        &nbsp;
        <!-- Choose number of songs -->
        <label for="total-tracks-select">Number of tracks:</label>
        <select required name="total-tracks" id="total-tracks-select" v-model="total_tracks">
          <!-- <div "> -->
          <option v-if="tracks.length < 10" value="minimum">Your playlist is too short!</option>

          <option v-if="tracks.length >= 10" value="10">10</option>

          <option v-if="tracks.length >= 20" value="20">20</option>

          <option v-if="tracks.length >= 30" value="30">30</option>

          <option v-if="tracks.length >= 50" value="50">50</option>

          <option v-if="tracks.length >= 75" value="75">75</option>

          <option v-if="tracks.length >= 100" value="100">100</option>

          <!-- <option value=""></option>
        <option value=""></option> -->
        </select>
        &nbsp;
        <label for="shared">Share:</label>
        <button id="shared" @click="isShared = !isShared">
          {{ isShared ? "ON" : "OFF" }}
        </button>
        &nbsp;
        <button v-on:click="createPlaylist()">Create Filtered Playlist</button>
      </span>
    </div>
    <br />
    <br />
    <router-link to="/">
      <button>Back</button>
      &nbsp;
    </router-link>
    <button v-if="playlistCreator === userId" v-on:click="deletePlaylist()">
      Delete Playlist
      <FlashMessage></FlashMessage>
    </button>
    &nbsp;
    <button v-if="playlistCreator === userId" v-on:click="isShow = !isShow">Edit Playlist Details</button>
    <form v-if="isShow" method="dialog">
      <div>
        Playlist Title
        <input type="text" v-model="editPlaylistParams.name" />
      </div>
      <div>
        Description:
        <input type="text" v-model="editPlaylistParams.description" />
      </div>
      <!-- <label for="shared">Share:</label>
        <button id="shared" @click="isShared = !isShared">
          {{ isShared ? "ON" : "OFF" }}
        </button> -->
      <button v-on:click="isShow = !isShow">Cancel</button>
      <button v-on:click="editPlaylist()">Submit</button>
    </form>

    <!--  -->
    <!--  -->
    <!--  -->
    <!-- Section -->
    <div class="main-section">
      <!-- container -->
      <div class="container gx-4">
        <!-- row -->
        <div class="row gx-36">
          <!-- col-lg-8 -->
          <div class="col-lg-8 offset-lg-2">
            <!-- Section title -->
            <div class="section-title text-center">
              <!-- Section title container -->
              <div class="section-title-container">
                <!-- Section title body -->
                <div class="section-title-body">
                  <!-- Section title heading -->
                  <div class="section-title-heading">
                    <h2>{{ playlist.name }}</h2>
                    <p>{{ playlist.description }}</p>
                  </div>
                  <!-- /End Section title heading -->
                </div>
                <!--/End Section title body -->
              </div>
              <!-- /End Section title container -->
            </div>
            <!-- /End Section title -->

            <!-- GAP -->
            <div class="gap gap-36"></div>
          </div>
          <!-- /End col-lg-8 -->

          <!-- col-lg-12 -->
          <div class="col-lg-12">
            <div class="table-responsive">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Song</th>
                    <th>Artist</th>
                    <th>Album</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="track in tracks" v-bind:key="track.id">
                    <th>{{ tracks.indexOf(track) + 1 }}</th>
                    <td>"{{ track["track"]["name"] }}"</td>
                    <td>{{ track["track"]["album"]["artists"][0]["name"] }}</td>
                    <td>{{ track["track"]["album"]["name"] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- /End col-lg-12 -->
        </div>
        <!-- /End row -->
      </div>
      <!-- /End container -->
    </div>
    <!-- /End Section -->
    <!-- Show Playlist Tracks -->
    <!--  -->
    <!--  -->
    <!--  -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      playlist: {},
      tracks: [],
      filter: "",
      newPlaylistParams: {},
      total_tracks: 20,
      userId: "",
      playlistCreator: "",
      editPlaylistParams: {
        name: "",
        description: "",
      },
      isShow: false,
      isShared: false,
      shared_params: {},
      create_show: true,
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
        this.setEditParams();
      });
    },
    createPlaylist: function () {
      this.playlist.filter = this.filter;
      this.playlist.total_tracks = this.total_tracks;
      // If share playlist option is marked, post to /shared_playlists
      // Send object with playlist_id: "", user_id: int

      axios
        .post("/playlists", this.playlist)
        .then((response) => {
          console.log("playlists create", response);
          if (this.isShared) {
            this.shared_params = {
              playlist_id: response.data.id,
              user_id: localStorage.getItem("user_id"),
            };
            axios.post("/shared_playlists", this.shared_params);
          }
          this.create_show = false;
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
    setEditParams: function () {
      this.editPlaylistParams = {
        name: this.playlist.name,
        description: this.playlist.description,
      };
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
