<script setup>
import ocLogo from "/oc_logo.png";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices";
import CategoryServices from "../services/CategoryServices.js";
import { getCategory } from "../common.js";

const router = useRouter();

const user = ref(null);
const title = ref("Travel Itenarary");
const logoURL = ref("");
const categories = ref([]);
onMounted(async () => {
  logoURL.value = ocLogo;
  user.value = JSON.parse(localStorage.getItem("user"));
  await getCategories();
});

function logout() {
  UserServices.logoutUser()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  localStorage.removeItem("user");
  user.value = null;
  router.push({ name: "login" });
}

async function getCategories() {
  await CategoryServices.getCategories()
    .then((response) => {
      categories.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

</script>

<template>
  <div>
    <v-app-bar color='primary' app dark>
      <router-link :to="{ name: 'home' }">
        <v-img
          class="mx-2"
          :src="logoURL"
          height="50"
          width="50"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title class="title">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Categories
      </button> -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
        Categories
      </button>
      <!-- <v-btn class="mx-2" :to="{ name: 'recipes' }" text-transform="none"> Categories </v-btn> -->
      <v-btn v-if="user === null" class="mx-2" :to="{ name: 'login' }">
        Login
      </v-btn>
      <v-menu v-if="user !== null" min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar class="mx-auto text-center" color="accent" size="large">
              <span class="white--text font-weight-bold">{{
                `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
              }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="accent">
                <span class="white--text text-h5">{{
                  `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                }}</span>
              </v-avatar>
              <h3>{{ `${user.firstName} ${user.lastName}` }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logout()"> Logout </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
  <div class="modal" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable model-xl">
    <div class="modal-content">
      <!-- Modal content here -->
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Select Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body row"  v-for="category in categories" :key="category.category_id">
        <div class="col-md-5" style="display:flex;padding:40px;border:1px solid black;margin:10px;align-items:center;justify-content:center;cursor:pointer;">
          <a :href="getCategory(category.category_id)"><h6 style="margin:auto;"> {{ category.category_name }} </h6></a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>