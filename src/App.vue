<template>
  <div id="app">
    <!-- Header
  ============================================================ -->
    <header class="header-section header-section-layout-2 header-section-fixed">
      <!-- Header section container -->
      <div class="header-section-container">
        <!-- Header menu section -->
        <div class="header-menu-section">
          <!-- Header menu section container -->
          <div class="header-menu-section-container">
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg">
              <!-- container -->
              <div class="container gx-4">
                <!-- Toggler button -->
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#mobile-menu"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-wd">MENU</span>
                  <span class="navbar-toggler-lines-wrapper">
                    <i class="navbar-toggler-line navbar-toggler-line-top"></i>
                    <i class="navbar-toggler-line navbar-toggler-line-middle"></i>
                    <i class="navbar-toggler-line navbar-toggler-line-bottom"></i>
                  </span>
                </button>
                <!-- /End Toggler button -->
                <!-- Logo -->

                <router-link class="navbar-brand" to="/" title="spotifilter">
                  <img src="/assets/images/spotifilter-logo-2.png" alt="SpotiFilter" class="normal" />
                  <!-- <img src="/assets/images/spotifilter_logo.png" alt="Bason" class="transparent" /> -->
                </router-link>

                <!-- /End Logo -->

                <!-- Header menu (Desktop) -->
                <div class="header-menu desktop-menu navbar-collapse">
                  <!-- Header menu links -->
                  <ul class="navbar-nav ms-auto">
                    <!-- Home -->
                    <li class="nav-item">
                      <router-link class="nav-link" to="/"><span>Home</span></router-link>
                    </li>
                    <!-- Shared Playlists -->
                    <li class="nav-item">
                      <router-link class="nav-link" to="/playlists/shared"><span>Shared Playlists</span></router-link>
                    </li>
                    <!-- Not Logged In -->
                    <li v-if="!isLoggedIn()" class="nav-item">
                      <router-link class="nav-link" to="login"><span>Log In</span></router-link>
                    </li>
                    <li v-if="!isLoggedIn()" class="nav-item">
                      <router-link class="nav-link" to="/signup"><span>Sign Up</span></router-link>
                    </li>
                    <!-- My Account -->
                    <li v-if="isLoggedIn() && user_id !== 5" class="nav-item">
                      <router-link class="nav-link" :to="`/users/${getUserId()}`"><span>My Account</span></router-link>
                    </li>
                    <!-- Logout -->
                    <li v-if="isLoggedIn()" class="nav-item">
                      <router-link class="nav-link" to="/logout"><span>Logout</span></router-link>
                    </li>
                  </ul>
                  <!-- /End Header menu links -->

                  <!-- /End Header buttons -->
                </div>
                <!-- /End Header menu (Desktop) -->
              </div>
              <!-- /End container -->

              <!-- Header menu (Mobile) -->
              <div class="header-menu mobile-menu collapse" id="mobile-menu"></div>
              <!-- /End Header menu (Mobile) -->
            </nav>
            <!-- /End Navbar -->
          </div>
          <!-- /End Header menu section container -->
        </div>
        <!-- /End Header menu section -->
      </div>
      <!-- /End Header section container -->
    </header>
    <!-- /End Header section -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/shared_playlists">Shared Playlists</router-link>
      |
      <span v-if="!isLoggedIn()">
        <router-link to="/login">Login</router-link>

        |
        <router-link to="/signup">Signup</router-link>

        |
      </span>
      <span v-if="isLoggedIn()">
        <router-link :to="`/users/${getUserId()}`">My Account</router-link>
        |
        <router-link to="/logout">Logout</router-link>
      </span>
    </div> -->
    <div id="main-wrapper">
      <div id="main-container">
        <router-view />
        <!-- Footer
                ============================================================ -->
        <footer id="colophon" class="footer-section site-footer">
          <!-- footer container -->
          <div class="footer-section-container">
            <!-- footer top -->
            <div class="footer-section-top">
              <!-- Section -->
              <div class="main-section">
                <!-- container -->
                <div class="container gx-4">
                  <!-- row -->
                  <div class="row gx-36">
                    <!-- col-lg-4 -->
                    <div class="col-lg-4">
                      <!-- Text -->
                      <div class="widget widget_text light-color">
                        <h6 class="widget-title font-weight-500"><span>About SpotiFilter</span></h6>

                        <div class="textwidget">
                          <p>
                            This app was created using a Rails backend and a Vue.js frontend. I incorporated the theme
                            "Bason" from wrapbootstrap.com. The project represents the culmination of my learning while
                            attending the Actualize Coding Bootcamp and is the result many long nights. If you find any
                            bugs, please email whisler1@gmail.com as I would be happy to learn how to fix them!
                          </p>
                        </div>
                      </div>
                      <!-- /End Text -->
                    </div>
                    <div class="col-lg-4">
                      <div class="widget widget_text light-color">
                        <h6 class="widget-title font-weight-500"><span>Contact</span></h6>
                        <!-- Block -->
                        <div class="main-block">
                          <!-- Block container -->
                          <div class="main-block-container">
                            <!-- Block body -->
                            <div class="main-block-body">
                              <!-- Block content -->
                              <div class="main-block-content">
                                <ul class="icon-list">
                                  <li>
                                    <i class="fas fa-home"></i>
                                    Chicago
                                  </li>
                                  <li>
                                    <i class="fas fa-envelope"></i>
                                    whisler1@gmail.com
                                  </li>
                                </ul>
                              </div>
                              <!-- /End Block content -->
                            </div>
                            <!--/End Block body -->
                          </div>
                          <!-- /End Block container -->
                        </div>
                        <!-- /End Block -->
                      </div>
                      <!-- /End col-lg-4 -->
                    </div>
                  </div>
                  <!-- /End row -->
                </div>
                <!-- /End container -->
              </div>
              <!-- /End Section -->
            </div>
            <!-- /End footer top -->
          </div>
          <!-- /End footer container -->
        </footer>
        <!-- /End footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      userId: 0,
    };
  },
  created: function () {
    this.isLoggedIn();
    this.getUserId();
  },
  mounted: function () {},
  methods: {
    isLoggedIn: function () {
      return localStorage.jwt;
    },
    getUserId: function () {
      console.log(localStorage.user_id);
      this.userId = localStorage.user_id;
      console.log("user id", this.userId);
      return this.userId;
    },
  },
};
</script>
