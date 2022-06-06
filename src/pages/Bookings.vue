<template>
      <q-page
        class="window-height window-width"
      >
      <div class="q-pa-md">
<q-btn label="Make Booking"  color="primary" @click="prompt = true" />
      </div>
        <q-dialog v-model="prompt" persistent class="o">
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Make Booking</div>
            </q-card-section>

             <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                     <q-select filled :options="getUSerProperty" label="Filled" v-model="$v.property.$model"
                      option-label="name"
                      option-value="id"
                    :error="$v.property.$error" />
                </q-form>
              </q-card-section>
            </q-card>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn
                flat
                label="Make Booking"
                v-close-popup
                @click="onSubmit"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
         <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Booking ID</th>
          <th class="text-right">Property name</th>
          <th class="text-right">Booked By</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in getUSerBookings" :key="booking.id">
          <td class="text-left">{{booking.id}}</td>
          <td class="text-right">{{booking.propertyId.name}}</td>
          <td class="text-right">{{booking.createdBy}}</td>
        </tr>
      </tbody>
    </q-markup-table>
     
      </q-page>
   

</template>

<script>
import {required} from "vuelidate/lib/validators";
import {mapActions,mapState} from 'vuex'
import { uid } from 'quasar'
import { Notify } from "quasar";
export default {
  name: "Properties",
  data() {
    return {
      property:null,
      prompt:false
    };
  },
  validations: {
    property: {
      required,
    }
  },
  computed:{
      ...mapState('property',['properties']),
       ...mapState('users',['authUser']),
       ...mapState('booking',['bookings']),
       getUSerBookings(){
        return this.bookings.filter(p => p.createdBy == this.authUser.email)
    },
    getUSerProperty(){
        return this.properties.filter(p => p.createdBy == this.authUser.email)
    }
  },
  methods:{
      ...mapActions('booking',['makebooking']),
      onSubmit() {
      if (this.$v.$anyError || !this.property ) {
        Notify.create({
          message: "Please enter all the details !",
          color: "red",
        });
      } else {
          const bookingDetails={
              id:uid(),
              propertyId:this.property,
              createdBy : this.authUser.email
          }
          this.makebooking(bookingDetails);
            Notify.create({
                    message: 'Booking done succesfully',
                    color:'green'
                });
      }
  }
  }
};
</script>

<style scoped>
.q-card {
  width: 500px;
}
</style>>
