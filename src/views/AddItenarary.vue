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

async function addItinerary() {
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
    await ItenararyServices.addItinerary({ ...itenarary.value, category_id: 1,rating: 5})
        .then((response) => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = "Itenarary created successfully!";
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
</script>

<template>
  <v-container>
    <div id="body">
      <v-card class="rounded-lg elevation-5">
        <v-card-title class="headline mb-2">Add Itenarary </v-card-title>
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
          <v-btn variant="flat" color="primary" @click="addItinerary()">Add</v-btn>
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