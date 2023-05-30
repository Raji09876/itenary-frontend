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
            <div class="input-group mb-3">
              <input type="text" class="form-control" id="search-field" placeholder="Search Itenarary">
              <div class="input-group-append">
                <a href="#" class="btn btn-primary" role="button" id="search-button" style="color:white;">Search</a>
              </div>
            </div>
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
                  href="./itenararies"
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
                        <input type="text" class="form-control" id="from" placeholder="From">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="text" class="form-control" id="to" placeholder="To">
                      </div>
                    </div>
                  </div><br/>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="date" class="form-control" id="departure">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <input type="date" class="form-control" id="return">
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <button type="submit" class="btn btn-primary search">Search</button>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
          <div class="col-md-8">
              <div class="heading">
                <h2>Famous Places</h2>
                <a class="show-all" href="./places"> Show All </a>
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