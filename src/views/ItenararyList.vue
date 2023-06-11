<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import ItenararyServices from "../services/ItenararyServices.js";
import { ref } from "vue";
import { getImageUrl,getItenararyUrl } from "../common.js";
import PageLoader from "../components/PageLoader.vue";
import { watch } from "vue";

const router = useRouter();
const itenararies = ref([]);
const apiValue = ref([]);
const loader = ref(true); 
const search = ref('')
const queryParameters = ref(router.currentRoute.value.query);

onMounted(async () => {
  await getItineraries();
  loader.value = false;
});

async function getItineraries() {
  await ItenararyServices.getItineraries(queryParameters.value)
    .then((response) => {
      itenararies.value = response.data;
      apiValue.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

async function filterItineraries(newSearch) {
    const newItenararies = apiValue.value
    const filteredItineraries = newItenararies.filter((itinerary) => {
        return (
        itinerary.title.toLowerCase().includes(newSearch.toLowerCase()) ||
        itinerary.description.toLowerCase().includes(newSearch.toLowerCase())
        );
    });
    itenararies.value = filteredItineraries;
}
watch(search, (newSearch) => {
 filterItineraries(newSearch)
});
</script>

<template>
  <v-container>
      <div class="container" style="margin-top:20px">
           <div style="display:flex;">
              <div style="display:flex;" class="col-md-9">
                <h3>Itenararies</h3>
                <a class="btn btn-success add" href="/travel-frontend/additenarary">Add Itinerary</a>
              </div>
                <PageLoader v-if="loader" />
               <div class="col-md-3">
                      <div class="form-group">
                        <input type="text" class="form-control" id="return" placeholder="search" v-model="search">
                      </div>
                    </div>
            </div> <br/>
          <div class="row gx-4 gx-lg-5">
                <div v-for="itenarary in itenararies" :key="itenarary.itinerary_id" class="col-md-4 mb-5">
                    <div class="card h-100">
                        <div class="card-body">
                           <img :src="getImageUrl(itenarary.image_url)" class="w-100 h-100"/>
                        </div>
                        <div class="card-footer" style="display: flex;">
                            <h6  class="col-md-6" style="margin-top:5px">{{ itenarary.title }}</h6>
                            <a class="btn btn-primary btn-sm" :href="getItenararyUrl(itenarary.itinerary_id)" style="margin-left: auto;">More Info</a>
                        </div>
                    </div>
                </div>
          </div>
      </div>
  </v-container>
</template>

<style scoped>
.add {
  background-color: #0d6efd;
  margin-left: 20px;
}
</style>