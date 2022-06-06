<template>
  <q-page
    class="
      window-height window-width
    "
  >
  <div  class="q-pa-md row items-start q-gutter-md">
    <div class="q-pa-sm">
      <q-card
      class="my-card text-white cursor-pointer q-pa-md q-hoverable"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      @click="$router.replace('properties')"
    >
      <q-card-section>
        <div class="text-h5">{{getUSerProperty}}</div>
        <div class="text-h6">Properties</div>
      </q-card-section>
    </q-card>
    </div>
  <div class="q-pa-sm">
    <q-card
      class="my-card text-white cursor-pointer q-pa-md q-hoverable"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      @click="$router.replace('bookings')"
    >
      <q-card-section>
        <div class="text-h5">{{getUSerBookings}}</div>
        <div class="text-h6">Bookings</div>
      </q-card-section>
    </q-card>
  </div>
    
    
  </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Dashboard",
  computed: {
    ...mapState("booking", ["bookings"]),
    ...mapState('property',['properties']),
    ...mapState("users", ["authUser"]),
     getUSerBookings(){
        return this.bookings.filter(p => p.createdBy == this.authUser.email)?this.bookings.filter(p => p.createdBy == this.authUser.email).length:0
    },
    getUSerProperty(){
        return this.properties.filter(p => p.createdBy == this.authUser.email)?this.properties.filter(p => p.createdBy == this.authUser.email).length:0
    }
  },
  
};
</script>
