<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import ItenararyServices from "../services/ItenararyServices.js";
import { ref } from "vue";
import { getImageUrl,getItenararyUrl } from "../common.js";
import PageLoader from "../components/PageLoader.vue";
import { watch } from "vue";
import BookingServices from "../services/BookingServices.js";


const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const router = useRouter();
const itenarary = ref([]);
const loader = ref(true); 
const user = ref(null);
onMounted(async () => {
    user.value = JSON.parse(localStorage.getItem("user"));
    await getItinerary();
    loader.value = false;
});

async function getItinerary() {
  await ItenararyServices.getItinerary(router.currentRoute.value.params.id)
    .then((response) => {
      itenarary.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
const getPlaceUrl = (id)=>{
    return "/travel-frontend/places/"+id
}
const getCollapseDay = (id)=>{
    return "collapseDay"+id
}

const getCollapseDayLink = (id)=>{
    return "#"+getCollapseDay(id)
}
async function bookNow() {
    loader.value = true;
    await BookingServices.addBooking({
        user_id: user.value.id,
        itinerary_id : router.currentRoute.value.params.id,
    })
    .then((response) => {
        loader.value = false;
        snackbar.value.value = true;
        snackbar.value.color = "green";
        snackbar.value.text = "Booking placed successfully!";
    })
    .catch((error) => {
      console.log(error);
        loader.value = false;
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = error.response.data.message;
    });
}

function closeSnackBar() {
  snackbar.value.value = false;
}

async function deleteItinerary() {
    loader.value = true;
    await ItenararyServices.deleteItinerary(router.currentRoute.value.params.id)
    .then(async(response) => {
        snackbar.value.value = true;
        snackbar.value.color = "green";
        snackbar.value.text = "Itenarary is delete successfully!";
        loader.value = false;
        await sleep(1000);
        router.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
      snackbar.value.value = true;
      snackbar.value.color = "error";
      snackbar.value.text = error.response.data.message;
      loader.value = false;
    });
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

</script>

<template>
  <v-container>
        <PageLoader v-if="loader" />
      <div class="container col-md-12" v-else>
            <div style="display:flex;justify-content: space-between;">
              <h2>{{ itenarary.title }}</h2>
              <a type="button" class="btn btn-success book" v-if="user !== null && user?.admin_role == 0" @click="bookNow()" >Book Now</a>
              <div class="settings"  v-if="user!= null && user.admin_role != 0">
                <a class="btn btn-primary" :href="['/travel-frontend/editItenarary/'+itenarary.itinerary_id]">Edit</a>
                <button class="btn btn-primary" @click="deleteItinerary()" style="margin-left:10px;">
                    Delete
                </button>
              </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <img :src="getImageUrl(itenarary.image_url)" class="large-image"/>
                </div>
                <div class="col-md-6">
                <p class="col-md-12">{{ itenarary.description }}</p>
                <div style="display:flex;">
                <h5>Start date - </h5>&nbsp;&nbsp;&nbsp;<p> {{ itenarary.start_date.slice(0,10) }}</p>
                </div>
                 <div style="display:flex;">
                    <h5>Number of Days - </h5>&nbsp;&nbsp;&nbsp;<p> {{ itenarary.duration_days }}</p>
                </div><br/>
                 <div style="display:flex;">
                    <h5>Price - </h5>&nbsp;&nbsp;&nbsp;<p> ${{ itenarary.price }} / person</p>
                </div><br/>
                <div v-for="(day,index) in itenarary.ItineraryPlans" :key="day.description">
                    <div class="day-title">
                        <a data-bs-toggle="collapse" style="text-decoration:none;" :href="getCollapseDayLink(index)" role="button" aria-expanded="false" :aria-controls="getCollapseDay(index)">Day {{ day.day}}</a>
                    </div>
                    <div>
                        <div class="collapse multi-collapse" :id="getCollapseDay(index)">
                        <div class="card card-body">
                            {{ day.description }}
                            <a class="btn btn-primary btn-sm" :href="getPlaceUrl(day.place_id)" style="margin-left: auto;">More Info</a>
                        </div>
                        </div>
                    </div><br/>
                </div>
                </div>
            </div>
      </div>
      <v-snackbar v-model="snackbar.value" rounded="pill">
        {{ snackbar.text }}

        <template v-slot:actions>
          <v-btn
            :color="snackbar.color"
            variant="text"
            @click="closeSnackBar()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
  </v-container>
</template>

<style scoped>
.container {
    margin-top:20px;background-color:white;padding:50px;
}
.large-image {
    width:100%;max-height:500px;
}
.day-title {
    display:flex;padding:20px;border:1px black solid;border-radius:5px;
}
.showall {
    color:white;margin-left:auto;width:100%;
}

.book {
    color: white;
    margin-right: 10px;
    height: 40px;
    background-color: #0d6efd ;
}
</style>