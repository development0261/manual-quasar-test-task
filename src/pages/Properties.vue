<template>
      <q-page
        class="window-height window-width"
      >
      <div class="q-pa-md">
<q-btn label="Add Property"  color="primary" @click="prompt = true" />
      </div>
        <q-dialog v-model="prompt" persistent class="o">
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Add Property</div>
            </q-card-section>

            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    filled
                    clearable
                    v-model="$v.name.$model"
                    :error="$v.name.$error"
                    type="text"
                    error-message="Please add a name"
                    label="name"
                  />
                  <q-input
                    filled
                    clearable
                    v-model="$v.address.$model"
                    :error="$v.address.$error"
                    type="textarea"
                    error-message="Please add a Address"
                    label="Address"
                  />
                  <q-input
                    square
                    filled
                    clearable
                    v-model="$v.description.$model"
                    :error="$v.description.$error"
                    type="textarea"
                    error-message="Please add a description more than 20 character"
                    label="Description"
                  />
                  <q-input
                    filled
                    clearable
                    v-model="$v.photo.$model"
                    :error="$v.photo.$error"
                    type="file"
                    error-message="Please select photo "
                    accept="image/*"
                  />
                </q-form>
              </q-card-section>
            </q-card>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn
                flat
                label="Add Property"
                v-close-popup
                @click="onSubmit"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
         <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Property ID</th>
          <th class="text-right">Property Name</th>
          <th class="text-right">Property Address</th>
          <th class="text-right">Property Description</th>
          <th class="text-right">Property Photo</th>
          <th class="text-right">Created By</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in getUSerProperty" :key="property.id">
          <td class="text-left">{{property.id}}</td>
          <td class="text-right">{{property.name}}</td>
          <td class="text-right">{{property.address}}</td>
          <td class="text-right">{{property.description}}</td>
          <td class="text-right">{{property.photo}}</td>
          <td class="text-right">{{property.createdBy}}</td>
        </tr>
      </tbody>
    </q-markup-table>
     
      </q-page>
   

</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import { uid } from "quasar";
import { Notify } from "quasar";
export default {
  name: "Properties",
  data() {
    return {
      name: null,
      address: null,
      description: null,
      photo: null,
      prompt: false,
    };
  },
  validations: {
    address: {
      required,
    },
    name: {
      required,
    },
    description: {
      required,
      min: minLength(20),
    },
    photo: {
      required,
    },
  },
  computed: {
    ...mapState("users", ["authUser"]),
    ...mapState("property",['properties']),
    getUSerProperty(){
        return this.properties.filter(p => p.createdBy == this.authUser.email)
    }
  },
  methods: {
    ...mapActions("property", ["registerProperty"]),
    onSubmit() {
      if (
        this.$v.$anyError ||
        !this.address ||
        !this.photo ||
        !this.description
      ) {
        Notify.create({
          message: "Please enter all the details !",
          color: "red",
        });
      } else {
        const propertDetails = {
          id: uid(),
          name: this.name,
          address: this.address,
          description: this.description,
          photo: this.photo[0].name,
          createdBy: this.authUser.email,
        };
        this.registerProperty(propertDetails);
        Notify.create({
          message: "Property created succesfully",
          color: "green",
        });
      }
    },
  },
};
</script>

<style scoped>
.q-card {
  width: 500px;
}
</style>>
