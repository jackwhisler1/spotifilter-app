import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PlaylistsShow1 from "../views/PlaylistsShow1.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import SpotifyCallback from "../views/SpotifyCallback.vue";
import FlashMessage from "@smartweb/vue-flash-message";

Vue.use(FlashMessage);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/playlists/:id",
    name: "playlists-show",
    component: PlaylistsShow1,
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/spotify/callback", name: "spotify-callback", component: SpotifyCallback },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
