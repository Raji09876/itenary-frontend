<script setup>
import { onMounted } from "vue";
import { ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import UserServices from "../services/UserServices.js";
import ItenararyServices from "../services/ItenararyServices.js";
import PageLoader from "../components/PageLoader.vue";

const router = useRouter();
const snackbar = ref({
  value: false,
  color: "",
  text: "",
});
const itenarary = ref({
  title: "",
  description: "",
  image_url: "",
  from_place: "",
  to_place:"",
  start_date: "",
  end_date: "",
  duration_days: "",
  price: ""
});
const isLoading = ref(false);

function closeSnackBar() {
  snackbar.value.value = false;
}

onMounted(async () => {
   await getItenarary();
   itenarary.value = {...itenarary.value,end_date:itenarary.value.end_date.slice(0,10),start_date:itenarary.value.start_date.slice(0,10)}
   isLoading.value = false
});


async function updateItinerary() {
  if(itenarary.value.title === "") {
        displayError("title is required!")

  }
  else if(itenarary.value.description === "") {
        displayError("title is required!")

  }
  else if(itenarary.value.from_place === "") {
        displayError("from place is required!")

  }
  else if(itenarary.value.to_place === "") {
        displayError("destination is required!")

  }
  else if(itenarary.value.start_date === "") {
        displayError("start date is required!")

  }
  else if(itenarary.value.end_date === "") {
        displayError("end date is required!")

  }
  else if(itenarary.value.duration_days === "") {
        displayError("duration of days is required!")

  }
  else if(itenarary.value.price === "") {
        displayError("cost is required!")

  }
  else if(itenarary.value.image_url === "") {
        displayError("image url is required!")
  }
  else {
    isLoading.value = true
    await ItenararyServices.updateItinerary({ ...itenarary.value, category_id: 1,rating: 5,id:router.currentRoute.value.params.id})
        .then((response) => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = "Itenarary updated successfully!";
            isLoading.value = false
        })
        .catch((error) => {
            console.log(error);
            displayError(error.response.data.message || "Error while adding Itenarary")
            isLoading.value = false
        });
  }
}
const displayError = (message) => {
    snackbar.value.value = true;
    snackbar.value.color = "error";
    snackbar.value.text = message;
}

async function getItenarary() {
    isLoading.value = true
    await ItenararyServices.getItinerary(router.currentRoute.value.params.id)
        .then((response) => {
            itenarary.value = response.data
            isLoading.value = false
        })
        .catch((error) => {
            isLoading.value = false
        });
}
const goHome = ()=>{
  router.push({name: "home"})
}
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
          <v-card-title class="headline mb-2">Edit Itenarary </v-card-title>
        <PageLoader v-if="isLoading" />
        <v-card-text v-else>
             <v-text-field
            v-model="itenarary.title"
            label="Title"
            required
          ></v-text-field>  
            <v-textarea
            v-model="itenarary.description"
            label="Description"
            required
          ></v-textarea> 
        <v-text-field
            v-model="itenarary.from_place"
            label="From place"
            required
          ></v-text-field> 
        <v-text-field
            v-model="itenarary.to_place"
            label="Destination"
            required
          ></v-text-field> 
                       <v-text-field
            v-model="itenarary.start_date"
            label="Start Date"
            type="date"
            required
          ></v-text-field> 
        <v-text-field
            v-model="itenarary.end_date"
            label="End Date"
            type="date"
            required
          ></v-text-field> 
        <v-text-field
            v-model="itenarary.duration_days"
            label="Duration in days"
            required
          ></v-text-field> 
        <v-text-field
            v-model="itenarary.price"
            label="Cost"
            required
          ></v-text-field> 
        <v-text-field
            v-model="itenarary.image_url"
            label="Image Url/ Path"
            required
          ></v-text-field> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div style="display:flex;justify-content:space-between;">
            <v-btn variant="flat" color="primary" @click="goHome()">Go Home</v-btn>
            <v-btn variant="flat" color="primary" @click="updateItinerary()">Update</v-btn>
          </div>
        </v-card-actions>
      </v-card>
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
    </div>
  </v-container>
</template>