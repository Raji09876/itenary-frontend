<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import PlaceServices from "../services/PlaceServices.js";
import { ref } from "vue";
import { getImageUrl,getItenararyUrl } from "../common.js";
import PageLoader from "../components/PageLoader.vue";

const places = ref([]);
const loader = ref(true);

onMounted(async () => {
  await getPlaces();
  loader.value = false;
});

async function getPlaces() {
  await PlaceServices.getPlaces()
    .then((response) => {
      places.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <v-container>
      <div class="container">
           <div style="display: flex;">
              <h3  class="col-md-9">Places</h3>
               <div class="col-md-3">
                      <div class="form-group">
                        <input type="text" class="form-control" id="return" placeholder="search">
                      </div>
                    </div>
            </div> <br/>
          <div class="row gx-4 gx-lg-5">
                <div class="col-md-4 mb-5" v-for="place in places" :key="place.id">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">{{ place.title }}</h2>
                            <p class="card-text">{{ place.description.slice(0,200) }}...</p>
                        </div>
                        <div class="card-footer"><a class="btn btn-primary btn-sm" href="./place/1">More Info</a></div>
                    </div>
                </div>
            </div>
      </div>
  </v-container>
</template>

<style scoped>
.container {
    margin-top:20px;
}
</style>
