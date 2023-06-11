<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import ItenararyServices from "../services/ItenararyServices.js";
import PlaceServices from "../services/PlaceServices.js";
import { ref } from "vue";
import { getImageUrl,getItenararyUrl,getPlaceUrl } from "../common.js";
import PageLoader from "../components/PageLoader.vue";

const latestItenararies = ref([]);
const famousPlaces = ref([]);
const loader = ref(true);
const from = ref('');
const to = ref('');
const date_start = ref('');
const date_end = ref('');

onMounted(async () => {
  await getLatestItineraries();
  await getFamousPlaces();
  loader.value = false;
});

async function getLatestItineraries() {
  await ItenararyServices.getLatestItineraries()
    .then((response) => {
      latestItenararies.value = response.data.slice(0, 5);
    })
    .catch((error) => {
      console.log(error);
    });
}
const searchForItenarary = () => {
  return './itenararies?from='+from.value+'&to='+to.value+'&start='+date_start.value+'&end='+date_end.value
}

async function getFamousPlaces() {
  await PlaceServices.getFamousPlaces()
    .then((response) => {
      famousPlaces.value = response.data.slice(0, 10);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <v-container>
      <div class="container">
        <div class="row pt-4">
          <div class="col-md-4">
              <ul class="list-group" id="category-filter">
                <a
                  href="./"
                  class="list-group-item list-group-item-action active"
                  data-category="all"
                  >Latest Itenarary</a
                >
                <a
                  :href="getItenararyUrl(itenarary.itinerary_id)"
                  class="list-group-item list-group-item-action"
                  data-category="it"
                  v-for="itenarary in latestItenararies" :key="itenarary.itinerary_id"
                  >{{ itenarary.title }}</a
                >
                  <a
                  href="/travel-frontend/itenararies"
                  class="list-group-item list-group-item-action"
                  data-category="banking"
                  style="color:#0d6efd;"
                  >Show All</a
                >
              </ul><br/>
               <div class="container" style="padding:10px;">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="text" class="form-control" id="from" placeholder="From" v-model="from">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="text" class="form-control" id="to" placeholder="To" v-model="to">
                      </div>
                    </div>
                  </div><br/>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="date" class="form-control" id="departure" v-model="date_start">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="date" class="form-control" id="return" v-model="date_end">
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <a type="submit" class="btn btn-primary search" :href="searchForItenarary()">Search</a>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
          <div class="col-md-8">
              <div class="heading">
                <h2>Famous Places</h2>
                <a class="show-all" href="/travel-frontend/places"> Show All </a>
              </div><br/>
              <div class="col-md-12" v-for="place in famousPlaces" :key="place.id" >
                <div id="accordion">
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" :href="getPlaceUrl(place.id)"> {{ place.title}} </a>
                    </div>
                    <div class="row">
                      <img class="col-md-4" :src="getImageUrl(place.image_url)" />
                      <div class="card-body col-md-8"> {{ place.description.slice(0, 400) }}... </div>
                    </div>
                  </div>
                </div>
              </div><br/>  
        </div>
      </div>
      </div>

        
  </v-container>
</template>

<style scoped>
.search {
  color:white;margin-top:25px;width:100%;
}
.heading {
  display: flex;
}
.show-all {
  margin-left: auto;
  margin-top: 5px;
}
</style>