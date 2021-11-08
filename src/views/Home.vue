<template>
  <div class="home">
    <!-- Page body
                ============================================================ -->
    <div id="page-body" class="page-body">
      <!-- row -->
      <div class="row main-row justify-content-center">
        <!-- Content area
                        ==================================================== -->
        <div id="primary" class="content-area col-lg-12">
          <!-- Main -->
          <main id="main" class="content-area-container site-main">
            <!-- Section -->
            <div
              class="main-section pt-0 pb-0 dark-1-color-bg bg-image"
              style="background-image: url(/assets/images/mixer-background.jpeg)"
            >
              <div class="mask mask-custom">
                <!-- container -->
                <div class="container gx-4">
                  <!-- row -->
                  <div class="row gx-36 align-items-center justify-content-center height-100vh pt-72 pb-72">
                    <!-- col-lg-12 -->
                    <div class="col-lg-12">
                      <!-- GAP -->
                      <div class="gap gap-72 d-none d-xl-block"></div>

                      <!-- Section title -->
                      <div
                        class="section-title section-title-intro text-center light-color mb-12"
                        data-animation="animate__zoomIn"
                      >
                        <!-- Section title container -->
                        <div class="section-title-container">
                          <!-- Section title body -->
                          <div class="section-title-body">
                            <!-- Section title heading -->
                            <div class="section-title-heading">
                              <h1 class="font-weight-900">
                                WELCOME TO
                                <br />
                                SPOTIFILTER
                              </h1>
                            </div>
                            <!-- /End Section title heading -->
                          </div>
                          <!--/End Section title body -->
                        </div>
                        <!-- /End Section title container -->
                      </div>
                      <!-- /End Section title -->

                      <!-- GAP -->
                      <div class="gap gap-6 d-none d-md-block"></div>

                      <!-- Section title -->
                      <div
                        class="section-title section-title-intro text-center light-color"
                        data-animation="animate__zoomIn"
                        data-animation-delay="200"
                      >
                        <!-- Section title container -->
                        <div class="section-title-container">
                          <!-- Section title body -->
                          <div class="section-title-body">
                            <!-- Block content -->
                            <div class="section-title-content">
                              <p class="secondary-font-family white-color">
                                Select a playlist to apply a filter and create something new.
                              </p>
                            </div>
                            <!-- /End Block content -->
                          </div>
                          <!--/End Section title body -->
                        </div>
                        <!-- /End Section title container -->
                      </div>
                      <!-- /End Section title -->

                      <!-- GAP -->
                      <div class="gap gap-18 d-none d-md-block"></div>

                      <!-- Section title -->
                      <div
                        class="section-title section-title-intro text-center light-color mb-0"
                        data-animation="animate__zoomIn"
                        data-animation-delay="400"
                      >
                        <!-- Section title container -->
                        <div class="section-title-container">
                          <!-- Section title body -->
                          <div class="section-title-body">
                            <!-- Block content -->
                            <div class="section-title-content">
                              <p><a href="#" class="btn btn-light btn-lg btn-round">DISCOVER MORE</a></p>
                            </div>
                            <!-- /End Block content -->
                          </div>
                          <!--/End Section title body -->
                        </div>
                        <!-- /End Section title container -->
                      </div>
                      <!-- /End Section title -->
                    </div>
                    <!-- /End col-lg-12 -->
                  </div>
                  <!-- /End row -->
                </div>
                <!-- /End container -->
              </div>
            </div>
            <!-- /End Section -->
            <!-- Section -->
            <div class="main-section">
              <!-- container -->
              <div class="container gx-4">
                <!-- row -->
                <div class="row gx-36">
                  <!-- col-lg-8 -->
                  <div class="col-lg-8 offset-lg-2"></div>
                  <!-- /End col-lg-8 -->

                  <!-- col-lg-8 -->
                  <div class="col-lg-8 offset-lg-2">
                    <!-- Search form -->
                    <div class="form-block form-block-search form-block-search-layout-4" clear-search>
                      <!-- Form container -->
                      <div class="form-block-container">
                        <!-- Form -->
                        <form class="row">
                          <!-- col-lg-12 -->
                          <!-- Dropdown Button -->

                          <div class="col-lg-12">
                            <input
                              class="form-control"
                              type="search"
                              name="s"
                              placeholder="Search..."
                              value=""
                              autocomplete="off"
                              aria-label="Search"
                              v-model="filterAttribute"
                            />

                            <button type="submit" value="" aria-label="Submit" class="body-color">
                              <i class="fas fa-search"></i>
                              <span>SEARCH</span>
                            </button>
                          </div>

                          <!-- /End col-lg-12 -->
                        </form>

                        <!-- /End Form -->
                      </div>

                      <!-- /End Form container -->
                    </div>
                    <!-- /End Search form -->

                    <a
                      href="#"
                      v-on:click.prevent="setSortAttribute('name')"
                      class="btn btn-md btn-dark ml-18 mr-18 mb-36"
                    >
                      Sort by Title
                    </a>
                    <a
                      href="#"
                      v-on:click.prevent="setSortAttribute('tracks.total')"
                      class="btn btn-md btn-dark ml-18 mr-18 mb-36"
                    >
                      Sort by Total Tracks
                    </a>
                  </div>
                  <!-- /End col-lg-8 -->
                </div>
                <!-- /End row -->
              </div>
              <!-- /End container -->
            </div>
            <!-- /End Section -->
            <!-- Section -->
            <div class="main-section pt-72 pb-72">
              <!-- container -->
              <div class="container gx-4">
                <!-- row -->
                <div class="row gx-36">
                  <!-- col-lg-12 -->
                  <div class="col-lg-12">
                    <!-- Portfolio wrapper -->
                    <div class="portfolio-block-wrapper portfolio-block-layout-3 portfolio-block-front">
                      <!-- Loop -->
                      <div
                        v-if="playlists.length"
                        class="row gx-36 gy-36 row-cols-lg-3 row-cols-md-2 grid-wrapper isotope-grid"
                        style="position: relative; height: 100%"
                      >
                        <!-- Grid item -->
                        <div
                          v-for="playlist in orderBy(filterBy(playlists, filterAttribute), sortAttribute, sortOrder)"
                          v-bind:key="playlist.id"
                          class="grid-item isotope-item isotope-graphics"
                        >
                          <!-- Post -->
                          <article class="main-block portfolio-block format-standard">
                            <!-- Block container -->
                            <div class="main-block-container portfolio-block-container">
                              <!-- Block header -->
                              <div class="main-block-header portfolio-block-header">
                                <router-link :to="`/playlists/${playlist.id}`" class="overlay-effect zoom-effect">
                                  <img v-bind:src="playlist.images[0].url" v-bind:alt="playlist.id" />
                                </router-link>
                              </div>
                              <!-- /End Block header -->

                              <!-- Block body -->
                              <div class="main-block-body portfolio-block-body">
                                <!-- Block heading -->
                                <div class="main-block-heading portfolio-block-heading">
                                  <h2 class="h5 title">
                                    <a href="#">{{ playlist.name }}</a>
                                  </h2>

                                  <ul class="meta-block">
                                    <li class="meta-block-category">
                                      <span>
                                        <a href="#">Total Tracks: {{ playlist.tracks.total }}</a>
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                                <!-- /End Block heading -->
                              </div>
                              <!--/End Block body -->
                            </div>
                            <!-- /End Block container -->
                          </article>
                          <!-- /End Post -->
                        </div>
                        <!-- /End Grid item -->
                      </div>
                      <!-- /End Loop -->

                      <!-- Pagination -->
                      <div class="row gx-36">
                        <!-- col-lg-12 -->
                        <div class="col-lg-12">
                          <nav aria-label="Page navigation" class="pagination-block">
                            <a href="#" class="btn btn-accent">LOAD MORE</a>
                          </nav>
                        </div>
                        <!-- /End col-lg-12 -->
                      </div>
                      <!-- /End Pagination -->
                    </div>
                    <!-- /End Portfolio wrapper -->
                  </div>
                  <!-- /End col-lg-12 -->
                </div>
                <!-- /End row -->
              </div>
              <!-- /End container -->
            </div>
            <!-- /End Section -->
          </main>
          <!-- /End Main -->
        </div>
        <!-- /End Content area -->
      </div>
      <!-- /End row -->
    </div>
    <!-- /End Page body -->

    <!--  -->
    <!-- My Code -->
    <!-- <p>Select a playlist to apply a filter.</p> -->
    <div>
      <!-- <h2>Please authorize to allow Spotifiliter to use playlist information.</h2> -->
      <a
        :href="`https://accounts.spotify.com/authorize?client_id=${apiKey}&response_type=code&redirect_uri=http://localhost:8080/spotify/callback&scope=playlist-read-private playlist-modify-private user-read-private user-read-email playlist-read-collaborative user-library-modify playlist-modify-public`"
      >
        <button>Authorize Spotifilter</button>
      </a>
    </div>
    <hr width="80%" />
    <div v-if="isLoggedIn()">
      <!-- <input v-model="filterAttribute" type="text" /> -->
      <!-- <div v-for="playlist in filterBy(playlists, filterAttribute)" v-bind:key="playlist.id">
        <h2>{{ playlist.name }}</h2>
        <div v-if="playlist.images">
          <img v-bind:src="playlist.images[0].url" v-bind:alt="playlist.id" />
        </div>
        <p>Total Tracks: {{ playlist.tracks.total }}</p>
        <router-link :to="`/playlists/${playlist.id}`">
          <button>Select</button>
        </router-link>
        <hr size="1" noshade width="50%" />
      </div> -->
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
      filterAttribute: "",
      sortOrder: 1,
      sortAttribute: "",
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
    setSortAttribute: function (attribute) {
      // if i click on the SAME button, change sort order to the opposite.
      if (this.sortAttribute === attribute) {
        this.sortOrder = this.sortOrder * -1;
        // if i click on a DIFFERENT button, change sort attribute and change sort order to ascending
      } else {
        this.sortAttribute = attribute;
        this.sortOrder = 1;
      }
    },
  },
};
</script>
