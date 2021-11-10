<template>
  <div class="signup">
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
                >
                  <!-- Slider item -->
                  <div class="owl-slider-item" style="background-image: url(/assets/images/pages/022.jpg)"></div>
                  <!-- /End Slider item -->

                  <!-- Slider item -->
                  <div class="owl-slider-item" style="background-image: url(/assets/images/pages/023.jpg)"></div>
                  <!-- /End Slider item -->

                  <!-- Slider item -->
                  <div class="owl-slider-item" style="background-image: url(/assets/images/pages/024.jpg)"></div>
                  <!-- /End Slider item -->
                </div>
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
                    <div class="gap gap-36"></div>

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

                        <form
                          v-on:submit.prevent="submit()"
                          class="row form-block-sign-form"
                          style="padding: 12px 24px"
                        >
                          <div class="justify-content-center" v-if="errors.length > 0">
                            <ul>
                              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                            </ul>
                          </div>

                          <!-- Username or Email Address -->
                          <div class="col-md-12">
                            <label class="label">
                              Name
                              <input v-model="newUserParams.name" class="form-control" type="text" />
                            </label>
                          </div>
                          <!-- Email Address -->
                          <div class="col-md-12">
                            <label class="label">
                              Email
                              <input v-model="newUserParams.email" class="form-control" type="email" />
                            </label>
                          </div>
                          <!-- /End Username or Email Address -->

                          <!-- Password -->
                          <div class="col-md-12">
                            <label class="label">
                              Password
                              <input v-model="newUserParams.password" class="form-control" type="password" />
                            </label>
                          </div>
                          <!-- /End Password -->

                          <!-- Confirm Password -->
                          <div class="col-md-12">
                            <label class="label">
                              Password confirmation
                              <input
                                v-model="newUserParams.password_confirmation"
                                class="form-control"
                                type="password"
                              />
                            </label>
                          </div>
                          <!-- /End Password -->

                          <!-- Submit button -->
                          <div class="col-lg-12">
                            <button type="submit" class="btn btn-accent btn-block">
                              <span>LOG IN</span>
                            </button>
                          </div>
                          <!-- /End Submit button -->
                        </form>

                        <!-- /End Form -->

                        <!-- Links -->

                        <div class="form-block-sign-footer justify-content-center" style="padding: 0px">
                          <small><a id="signup" href="/signup">New account? Sign up</a></small>
                        </div>
                        <!-- /End Links -->
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
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div>
        <label>Name:</label>
        <input type="text" v-model="newUserParams.name" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" v-model="newUserParams.email" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="newUserParams.password" />
      </div>
      <div>
        <label>Password confirmation:</label>
        <input type="password" v-model="newUserParams.password_confirmation" />
      </div>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
