<template>
  <div class="playlists-show">
    <!-- Breadcrumb section
                ============================================================ -->
    <div
      class="
        breadcrumb-section breadcrumb-section-layout-2
        parallax-section
        text-center
        dark-1-color-bg dark-1-color-border
        light-color
      "
      style="background-image: url(assets/images/pages/012.jpg)"
    >
      <!-- overlay -->
      <div class="section-overlay dark-1-color-bg" style="opacity: 0.5"></div>

      <!-- Breadcrumb container -->
      <div class="breadcrumb-section-container">
        <!-- container -->
        <div class="container gx-4">
          <!-- row -->
          <div class="row align-items-center justify-content-between">
            <!-- Title -->
            <div class="breadcrumb-title">
              <h1 class="breadcrumb-heading h1 font-weight-600">{{ playlist.name }}</h1>
              <p class="breadcrumb-sub-heading">{{ playlist.description }}</p>
            </div>
            <!-- /End Title -->
          </div>
          <!-- /End row -->
        </div>
        <!-- /End container -->
      </div>
      <!-- /End Breadcrumb container -->
    </div>
    <!-- /End Breadcrumb section -->

    <div v-if="create_show">
      <div class="col-lg-12 text-center">
        <!-- Choose filter -->
        <span class="dropdown">
          <button
            class="btn btn-light btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style="margin: 10px"
          >
            Filter: {{ filter }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" role="menu">
            <li v-for="option in filterOptions" :key="option">
              <a class="dropdown-item" @click="filter = option" href="#">{{ option }}</a>
            </li>
          </ul>
        </span>

        <!-- Choose number of songs -->
        <span class="dropdown">
          <button
            class="btn btn-light btn-smdropdown-toggle"
            type="button"
            id="dropdownMenuButtonSongs"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style="margin: 10px"
          >
            Length: {{ total_tracks }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" role="menu">
            <li v-if="tracks.length >= 10">
              <a class="dropdown-item" @click="total_tracks = 10" href="#">10</a>
            </li>
            <li v-if="tracks.length >= 20">
              <a class="dropdown-item" @click="total_tracks = 20" href="#">20</a>
            </li>
            <li v-if="tracks.length >= 30">
              <a class="dropdown-item" @click="total_tracks = 30" href="#">30</a>
            </li>
            <li v-if="tracks.length >= 50">
              <a class="dropdown-item" @click="total_tracks = 50" href="#">50</a>
            </li>
            <li v-if="tracks.length >= 75">
              <a class="dropdown-item" @click="total_tracks = 75" href="#">75</a>
            </li>
            <li v-if="tracks.length >= 100">
              <a class="dropdown-item" @click="total_tracks = 100" href="#">1000</a>
            </li>
          </ul>
        </span>

        <span class="btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-light btn-sm" style="margin: 10px">
            <input type="checkbox" checked autocomplete="off" id="shared" @click="isShared = !isShared" />
            Share on SpotiFilter
          </label>
        </span>
        <button style="margin: 10px" class="btn btn-sm btn-accent" v-on:click="createPlaylist()">
          Create Filtered Playlist
        </button>
      </div>
    </div>
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
                    <div v-if="playlistCreator === userId">
                      <a href="#" class="btn btn-sm btn-dark" data-bs-toggle="modal" data-bs-target="#modal-default">
                        Edit Details
                      </a>
                    </div>
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

    <!-- Modal (Default) -->
    <div class="modal fade" id="modal-default">
      <!-- dialog -->
      <div class="modal-dialog modal-dialog-centered">
        <!-- content -->
        <div class="modal-content">
          <!-- close button -->
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

          <!-- body -->
          <div class="modal-body">
            <!-- row -->
            <div class="row gx-36 justify-content-center">
              <!-- col-lg-12 -->
              <div class="col-lg-12">
                <!-- Image block -->
                <div class="main-block image-block text-center">
                  <!-- Block container -->
                  <div class="main-block-container image-block-container">
                    <!-- Block header -->
                    <div class="main-block-header">
                      <img
                        v-bind:src="playlist.images[0].url"
                        v-bind:alt="playlist.id"
                        class="img-thumbnail"
                        style="max-width: 50%"
                      />
                    </div>
                    <!-- /End Block header -->
                  </div>
                  <!-- /End Block container -->
                </div>
                <!-- /End Image block -->
              </div>
              <!-- /End col-lg-12 -->

              <!-- GAP -->
              <div class="col-lg-12">
                <div class="gap gap-18"></div>
              </div>
              <!-- /End GAP -->

              <!-- col-lg-10 -->
              <div class="col-lg-10">
                <!-- Mailchimp form -->
                <div class="form-block">
                  <!-- Form container -->
                  <div class="form-block-container">
                    <!-- Form -->
                    <form class="row">
                      <!-- Title -->
                      <div class="col-lg-12">
                        <label class="label" aria-label="Playlist Title">
                          <input
                            class="form-control mt-0"
                            type="text"
                            name="Title"
                            placeholder="Title"
                            v-model="editPlaylistParams.name"
                          />
                        </label>
                      </div>
                      <!-- /End Title -->

                      <!-- Description -->
                      <div class="col-lg-12">
                        <label class="label" aria-label="Description">
                          <input
                            class="form-control mt-0"
                            type="text"
                            name="Description"
                            placeholder="Description"
                            v-model="editPlaylistParams.description"
                          />
                        </label>
                      </div>
                      <!-- /End Description -->

                      <!-- Submit button -->
                      <div class="col-lg-12 btn-custom">
                        <button
                          data-bs-dismiss="modal"
                          v-on:click="editPlaylist()"
                          type="submit"
                          class="btn btn-accent btn-custom"
                        >
                          <span>Save</span>
                        </button>
                        <button
                          v-on:click="deletePlaylist()"
                          type="submit"
                          class="btn btn-outline-danger"
                          data-bs-dismiss="modal"
                        >
                          <span>Delete</span>
                        </button>
                      </div>
                      <!-- /End Submit button -->

                      <!-- Message -->
                      <div class="col-lg-12"></div>
                      <!-- /End Message -->
                    </form>
                    <!-- /End Form -->
                  </div>
                  <!-- /End Form container -->
                </div>
                <!-- /End Mailchimp form -->
              </div>
              <!-- /End col-lg-10 -->
            </div>
            <!-- /End row -->
          </div>
          <!-- /End body -->
        </div>
        <!-- /End content -->
      </div>
      <!-- /End dialog -->
    </div>
    <!-- /End Modal (Default) -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      playlist: {},
      tracks: [],
      filterOptions: ["High Energy", "Calm", "Dance", "Faster Tempo", "Slower Tempo"],
      filter: "High Energy",
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
        axios.delete(`/playlists/${this.$route.params.id}`);
        this.$router.push("/");
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
