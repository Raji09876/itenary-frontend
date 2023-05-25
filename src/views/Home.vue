<script setup>

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
                  href="/"
                  class="list-group-item list-group-item-action active"
                  data-category="all"
                  >Latest Itenarary</a
                >
                <a
                  href="/itenarary/1"
                  class="list-group-item list-group-item-action"
                  data-category="it"
                  >DALLAS</a
                >
                <a
                  href="/itenarary/2"
                  class="list-group-item list-group-item-action"
                  data-category="finance"
                  >NEW YORK</a
                >
                <a
                  href="/itenarary/3"
                  class="list-group-item list-group-item-action"
                  data-category="banking"
                  >WASHINGTON D.C</a
                >
                  <a
                  href="/itenararies"
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
                <a class="show-all" href="/places"> Show All </a>
              </div><br/>
              <div class="col-md-12">
                <div id="accordion">
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" href="/place/1"> Dallas Zoo </a>
                    </div>
                    <div class="row">
                      <img class="col-md-4" src="/zoo.jpg" />
                      <div class="card-body col-md-8"> The Dallas Zoo, three miles south of downtown, is one of the top attractions in the city, with more than one million guests each year to its collection of just about every type of animal you can think of. More than 2000 animals from 400-plus species are housed in naturalistic habitats across s 106 acres.  </div>
                    </div>
                  </div>
                </div>
              </div><br/>
              <div class="col-md-12">
                <div id="accordion">
                  <div class="card">
                    <div class="card-header">
                      <a class="card-link" href="/place/2"> Reunion Tower </a>
                    </div>
                    <div class="row">
                      <img class="col-md-4" src="/reunion.jpg" />
                      <div class="card-body col-md-8">In the heart of downtown Dallas, Reunion Tower is one of the city's most iconic and historical landmarks, and it's also a great place to start your adventure. Head to the GeO-Deck, an observation level that sits 470 feet above the city, providing 360-degree, unobstructed panoramic views day or night </div>
                    </div>
                  </div>
                </div>
              </div>   
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