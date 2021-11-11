<template>
  <div class="users-show">
    <!-- Page body
                ============================================================ -->
    <div id="page-body" class="page-body">
      <!-- row -->
      <div class="row main-row justify-content-center">
        <!-- Content area
                        ==================================================== -->
        <div id="primary" class="content-area col-lg-12">
          <!-- Main -->
          <main id="main" class="content-area-container site-main pt-72">
            <!-- Section -->
            <div class="main-section pt-0 pb-0">
              <!-- Media (Background) -->
              <div class="section-media section-media-bg">
                <!-- Owl slider -->
                <div
                  class="owl-slider owl-carousel"
                  data-owl-slider-items-xl="1"
                  data-owl-slider-items-lg="1"
                  data-owl-slider-items-md="1"
                  data-owl-slider-items-sm="1"
                  data-owl-slider-items-xs="1"
                  data-owl-slider-items-margin="0"
                  data-owl-slider-loop="yes"
                  data-owl-slider-autoplay="yes"
                  data-owl-slider-animateIn="fadeIn"
                  data-owl-slider-animateOut="fadeOut"
                  data-owl-slider-mouseDrag="no"
                  data-owl-slider-touchDrag="no"
                  data-page-direction="ltr"
                ></div>
                <!-- /End Owl slider -->
              </div>
              <!-- /End Media (Background) -->

              <!-- overlay -->
              <div class="section-overlay dark-1-color-bg" style="opacity: 0.8"></div>

              <!-- container -->
              <div class="container gx-4">
                <!-- row -->
                <div class="row gx-36 height-lg-100vh align-items-center justify-content-center">
                  <!-- col-lg-12 -->
                  <div class="col-lg-12">
                    <!-- GAP -->

                    <!-- Sign form -->
                    <div class="form-block form-block-validation form-block-sign">
                      <!-- Form container -->
                      <div class="form-block-container">
                        <!-- Logo -->
                        <h1 class="form-block-sign-logo light-color">
                          <a href="#" title="Spotifilter">
                            <img src="/assets/images/spotifilter-logo-black.png" alt="SPOTIFILTER" />
                          </a>
                        </h1>
                        <!-- /End Logo -->

                        <!-- Form -->

                        <form v-on:submit.prevent="usersEdit()" class="row form-block-sign-form">
                          <div class="justify-content-center">
                            <ul>
                              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                            </ul>
                          </div>

                          <!-- Name -->
                          <div class="col-md-12">
                            <label class="label">
                              Name
                              <input class="form-control" type="text" v-model="editUserParams.name" />
                            </label>
                          </div>
                          <!-- /End Name -->

                          <!-- Username or Email Address -->
                          <div class="col-md-12">
                            <label class="label">
                              Email
                              <input class="form-control" type="email" v-model="editUserParams.email" />
                            </label>
                          </div>
                          <!-- /End Username or Email Address -->

                          <!-- Password -->
                          <div class="col-md-12">
                            <label class="label">
                              Password
                              <input class="form-control" type="password" v-model="editUserParams.password" />
                            </label>
                          </div>
                          <!-- /End Password -->

                          <!-- Password -->
                          <div class="col-md-12">
                            <label class="label">
                              Confirm Password
                              <input
                                class="form-control"
                                type="password"
                                v-model="editUserParams.password_confirmation"
                              />
                            </label>
                          </div>
                          <!-- /End Password -->

                          <!-- Submit button -->
                          <div class="col-lg-12">
                            <button type="submit" class="btn btn-accent btn-block" v-on:click="usersEdit()">
                              <span>Save</span>
                            </button>
                          </div>
                          <!-- /End Submit button -->
                        </form>

                        <!-- /End Form -->
                      </div>
                      <!-- /End Form container -->
                    </div>
                    <!-- /End Sign form -->
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

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      editUserParams: {},
      errors: [],
      isShow: true,
      confirmation: false,
    };
  },
  created: function () {
    this.usersShow();
  },
  methods: {
    usersShow: function () {
      axios.get(`/users/${localStorage.getItem("user_id")}"`).then((response) => {
        console.log(response.data);
        this.user = response.data;
        this.editUserParams = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
        };
      });
    },
    usersEdit: function () {
      axios
        .patch(`/users/${localStorage.getItem("user_id")}"`, this.editUserParams)
        .then((response) => {
          console.log(response.data);
          this.usersShow();
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
