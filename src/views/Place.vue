<script setup>
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import PlaceServices from "../services/PlaceServices.js";
import { ref } from "vue";
import { getImageUrl,getItenararyUrl } from "../common.js";
import PageLoader from "../components/PageLoader.vue";

const place = ref({});
const loader = ref(true);
const router = useRouter();

onMounted(async () => {
  await getPlace();
  loader.value = false;
});

async function getPlace() {
  await PlaceServices.getPlace(router.currentRoute.value.params.id)
    .then((response) => {
      place.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <v-container>
       <PageLoader v-if="loader" />
      <div class="container col-md-12" v-else>
            <h2>{{place.title}}</h2>
            <div class="row">
                <div class="col-md-6">
                    <img :src="getImageUrl(place.image_url)" class="large-image"/>
                </div>
                <div class="col-md-6">
                <p class="col-md-12">{{ place.description}}</p>
                  <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center">
        <div class="ratings">
            <i v-for="index in place.rating" :key="index" class="fa fa-star" style="color: orange;"></i>
            <i v-for="index in 10 - place.rating" :key="index" class="fa fa-star"></i>
        <div>
            <h5 class="review-count">{{ place.reviews }} Reviews</h5>
        </div>
                  </div>
                </div>
            </div>
      </div>
  </v-container>
</template>

<style scoped>
.container {
  margin-top:20px;background-color:white;padding:50px;
}
.large-image {
  width:100%;max-height:500px;
}
</style>
