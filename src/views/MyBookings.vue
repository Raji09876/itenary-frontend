<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import BookingServices from "../services/BookingServices.js";
import { ref } from "vue";
import PageLoader from "../components/PageLoader.vue";
import { getImageUrl,getItenararyUrl } from "../common.js";


const bookings = ref([]);
const loader = ref(true);
const user = ref(null);
onMounted(async () => {
  user.value = JSON.parse(localStorage.getItem("user"));
  await getBookings();
  loader.value = false;
});

async function getBookings() {
  await BookingServices.getBookings(user.value.id)
    .then((response) => {
      bookings.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}


</script>

<template>
<v-container>
  <div class="container" style="margin-top: 20px">
    <div style="margin-left:30px;">
      <h3>All Bookings</h3>
    </div>
    <br/>
    <PageLoader v-if="loader" />
    <div class="col-md-12 container bookings" v-else>
      <div v-for="single in bookings" :key="single.booking_id">
        <div class="single-booking container elevation-3">
          <p> Booking id <strong> {{ single.booking_id }} </strong></p>
          <p> Booking Date <strong> {{ single.createdAt.slice(0,10) }} </strong></p>
          <p><a class="btn btn-success" :href="getItenararyUrl(single.itinerary_id)">Show Itenarary</a></p>
        </div>
      </div>
    </div>
  </div>
  <br/>
</v-container>

</template>

<style scoped>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn {
    background-color: #0d6efd;
}
.single-booking {
  margin-top: 20px;
  width:100%;
  border-bottom: 2px solid black;
  padding:20px;
}
</style>