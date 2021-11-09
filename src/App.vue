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
                <a class="navbar-brand" href="/" title="Spotifilter">
                  <img src="/assets/images/spotifilter-logo-2.png" alt="SpotiFilter" class="normal" />
                  <!-- <img src="/assets/images/spotifilter_logo.png" alt="Bason" class="transparent" /> -->
                </a>
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
                      <router-link class="nav-link" to="/shared_playlists"><span>Shared Playlists</span></router-link>
                    </li>
                    <!-- Not Logged In -->
                    <li v-if="!isLoggedIn()" class="nav-item">
                      <a
                        href="javascript:void(0)"
                        class="nav-link"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-login"
                      >
                        <span>Login</span>
                      </a>
                    </li>
                    <li v-if="!isLoggedIn()" class="nav-item">
                      <router-link class="nav-link" to="/signup"><span>Sign Up</span></router-link>
                    </li>
                    <!-- My Account -->
                    <li v-if="isLoggedIn()" class="nav-item">
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
    <!-- Modal (Default) -->
    <div class="modal fade" id="modal-login">
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
              <!-- GAP -->
              <div class="col-lg-12">
                <div class="gap gap-36"></div>
              </div>
              <!-- /End GAP -->

              <!-- col-lg-12 -->
              <div class="col-lg-12">
                <!-- Image block -->
                <div class="main-block image-block text-center">
                  <!-- Block container -->
                  <div class="main-block-container image-block-container">
                    <!-- Block header -->
                    <div class="main-block-header image-block-header">
                      <img src="assets/images/subscribe.jpg" alt="Image" class="width-auto" />
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
                <div class="form-block form-block-mailchimp">
                  <!-- Form container -->
                  <div class="form-block-container">
                    <!-- Form -->
                    <form class="row">
                      <!-- Email address -->
                      <div class="col-lg-12">
                        <label class="label" aria-label="Email address">
                          <input
                            class="form-control mt-0"
                            type="email"
                            name="EMAIL"
                            placeholder="Email address"
                            v-model="newSessionParams.email"
                          />
                        </label>
                      </div>
                      <!-- /End Email address -->
                      <!-- Email address -->
                      <div class="col-lg-12">
                        <label class="label" aria-label="Password">
                          <input
                            class="form-control mt-0"
                            type="password"
                            name="EMAIL"
                            placeholder="Password"
                            v-model="newSessionParams.password"
                          />
                        </label>
                      </div>
                      <!-- /End Email address -->

                      <!-- Submit button -->
                      <div class="col-lg-12">
                        <button
                          type="submit"
                          v-on:click.prevent="logIn()"
                          class="btn btn-accent btn-block"
                          data-bs-dismiss="modal"
                        >
                          <span>Submit</span>
                        </button>
                      </div>
                      <!-- /End Submit button -->
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
    <!-- /End Header section -->

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
                <!-- col-lg-2 -->
                <div class="col-lg-2">
                  <!-- Image -->
                  <div class="widget widget_image">
                    <a href="index.html" title="Bason">
                      <img src="/assets/images/spotifilter-logo-white.png" alt="Spotifilter" />
                    </a>
                  </div>
                  <!-- /End Image -->
                </div>
                <!-- /End col-lg-2 -->

                <!-- col-lg-4 -->
                <div class="col-lg-4">
                  <!-- Text -->
                  <div class="widget widget_text light-color">
                    <h6 class="widget-title font-weight-500"><span>About Bason</span></h6>

                    <div class="textwidget">
                      <p>
                        Sed blandit quis tellus sit amet. Proin pharetra dolor non egestas pulvinar. Maecenas justo
                        eros, sed sodales ut, vulputate viverra risus.
                      </p>
                    </div>
                  </div>
                  <!-- /End Text -->
                </div>
                <!-- /End col-lg-4 -->

                <!-- col-lg-2 -->
                <div class="col-lg-2">
                  <!-- Navigation Menu -->
                  <div class="widget widget_nav_menu light-color">
                    <h6 class="widget-title font-weight-500"><span>Company</span></h6>

                    <ul>
                      <li><a href="#">About us</a></li>
                      <li><a href="#">Portfolio</a></li>
                      <li><a href="#">Shop</a></li>
                      <li><a href="#">Contact us</a></li>
                    </ul>
                  </div>
                  <!-- /End Navigation Menu -->
                </div>
                <!-- /End col-lg-2 -->

                <!-- col-lg-2 -->
                <div class="col-lg-2">
                  <!-- Navigation Menu -->
                  <div class="widget widget_nav_menu light-color">
                    <h6 class="widget-title font-weight-500"><span>Account</span></h6>

                    <ul>
                      <li><a href="#">Sign in</a></li>
                      <li><a href="#">Sign up</a></li>
                      <li><a href="#">Reset password</a></li>
                      <li><a href="#">View account</a></li>
                    </ul>
                  </div>
                  <!-- /End Navigation Menu -->
                </div>
                <!-- /End col-lg-2 -->

                <!-- col-lg-2 -->
                <div class="col-lg-2">
                  <!-- Text -->
                  <div class="widget widget_text light-color">
                    <h6 class="widget-title font-weight-500"><span>Contact us</span></h6>

                    <div class="textwidget">
                      <p>
                        <b>Email:</b>
                        <br />
                        <a href="mailto:support@example.com">support@example.com</a>
                      </p>

                      <p>
                        <b>Phone:</b>
                        <br />
                        <a href="tel:+11234567890">+1 123 456-7890</a>
                      </p>
                    </div>
                  </div>
                  <!-- /End Text -->
                </div>
                <!-- /End col-lg-2 -->
              </div>
              <!-- /End row -->
            </div>
            <!-- /End container -->
          </div>
          <!-- /End Section -->
        </div>
        <!-- /End footer top -->

        <!-- footer copyright -->
        <div class="footer-section-copyright">
          <!-- Section -->
          <div class="main-section">
            <!-- container -->
            <div class="container gx-4">
              <!-- row -->
              <div class="row gx-36 align-items-center">
                <!-- col-lg-6 -->
                <div class="col-lg-6">
                  <!-- Content -->
                  <div class="footer-section-copyright-content light-color text-center text-lg-start">
                    <p>
                      &copy;
                      <span class="current-year">2021</span>
                      designed &amp; developed by
                      <a href="#" title="Graphicfort">Graphicfort</a>
                      , all rights reserved.
                    </p>
                  </div>
                  <!-- /End Content -->
                </div>
                <!-- /End col-lg-6 -->

                <!-- col-lg-6 -->
                <div class="col-lg-6">
                  <!-- Content -->
                  <div class="footer-section-copyright-content light-color text-center text-lg-end">
                    <!-- Nav menu -->
                    <nav class="nav-menu-block">
                      <ul>
                        <li>
                          <a href="#" title="Policy Privacy"><span>Policy Privacy</span></a>
                        </li>
                        <li>
                          <a href="#" title="Cookie Policy"><span>Cookie Policy</span></a>
                        </li>
                        <li>
                          <a href="#" title="Contact"><span>Contact</span></a>
                        </li>
                      </ul>
                    </nav>
                    <!-- /End Nav menu -->
                  </div>
                  <!-- /End Content -->
                </div>
                <!-- /End col-lg-6 -->
              </div>
              <!-- /End row -->
            </div>
            <!-- /End container -->
          </div>
          <!-- /End Section -->
        </div>
        <!-- /End footer copyright -->
      </div>
      <!-- /End footer container -->
    </footer>
    <!-- /End footer -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.jwt;
    },
    getUserId: function () {
      return localStorage.user_id;
    },
    logIn: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          console.log(response.data);
          // axios.get("/api/spotify_authorize");
        })
        .catch((error) => {
          console.log("login error", error.response);
          this.errors.push(error.response.request.statusText);
        });
    },
  },
};
</script>
