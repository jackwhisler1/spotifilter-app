<template>
  <div class="shared-playlists">
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
            <div class="main-section pt-72 pb-72">
              <!-- Breadcrumb container -->
              <div class="breadcrumb-section-container">
                <!-- container -->
                <div class="container gx-4">
                  <!-- row -->
                  <div class="row align-items-center justify-content-between">
                    <!-- Title -->
                    <div class="breadcrumb-title">
                      <h1 class="breadcrumb-heading h1 font-weight-600 pt-30">Shared on Spotifilter</h1>
                    </div>
                    <!-- /End Title -->
                  </div>
                  <!-- /End row -->
                </div>
                <!-- /End container -->
              </div>
              <!-- /End Breadcrumb container -->
              <!-- container -->
              <div class="container gx-4">
                <!-- row -->
                <div class="row gx-36">
                  <!-- col-lg-12 -->
                  <div class="col-lg-12">
                    <!-- Blog wrapper -->
                    <div class="blog-block-wrapper blog-block-small-image blog-block-front blog-block-cols-1">
                      <!-- Loop -->
                      <div class="row gx-36 gy-0 row-cols-1 grid-wrapper">
                        <!-- Grid item -->
                        <div v-for="playlist in shared_playlists" v-bind:key="playlist.id" class="grid-item">
                          <!-- Post -->
                          <article class="main-block blog-block format-standard">
                            <!-- Block container -->
                            <div class="main-block-container blog-block-container">
                              <!-- Block header -->
                              <div class="main-block-header blog-block-header">
                                <a href="#">
                                  <img v-bind:src="playlist.images[0].url" v-bind:alt="playlist.id" />
                                </a>
                              </div>
                              <!-- /End Block header -->

                              <!-- Block body -->
                              <div class="main-block-body blog-block-body">
                                <!-- Block heading -->
                                <div class="main-block-heading blog-block-heading">
                                  <h2 class="h5 title">
                                    {{ playlist.name }}
                                  </h2>

                                  <ul class="meta-block">
                                    <li class="meta-block-author">
                                      <span>
                                        {{ playlist.description }}
                                      </span>
                                    </li>
                                  </ul>
                                  <div
                                    class="
                                      hr-divider hr-divider-layout-3
                                      heading-color
                                      hr-divider-fullwidth hr-divider-1px-border
                                    "
                                  ></div>
                                </div>
                                <!-- /End Block heading -->

                                <!-- Block content -->
                                <div class="main-block-content blog-block-content">
                                  <ul class="icon-list ordered-list grey-2-color-border">
                                    Sample:
                                    <li>
                                      "{{ playlist.tracks.items[0].track.name }}" by
                                      {{ playlist.tracks.items[0].track.artists[0].name }}
                                    </li>
                                    <li>
                                      "{{ playlist.tracks.items[1].track.name }}" by
                                      {{ playlist.tracks.items[1].track.artists[0].name }}
                                    </li>
                                    <li>
                                      "{{ playlist.tracks.items[2].track.name }}" by
                                      {{ playlist.tracks.items[2].track.artists[0].name }}
                                    </li>
                                    <li>
                                      "{{ playlist.tracks.items[3].track.name }}" by
                                      {{ playlist.tracks.items[3].track.artists[0].name }}
                                    </li>
                                  </ul>
                                </div>
                                <!-- /End Block content -->

                                <!-- Block footer -->
                                <div class="main-block-footer blog-block-footer">
                                  <router-link :to="`/playlists/${playlist.id}`">
                                    <a href="#" class="read-more-link font-size-14">
                                      <i class="fas fa-arrow-right"></i>
                                      Select
                                    </a>
                                  </router-link>
                                </div>
                                <!-- /End Block footer -->
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
                    </div>
                    <!-- /End Blog wrapper -->
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
