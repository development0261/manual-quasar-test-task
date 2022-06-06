<template>
    <q-layout>
        <q-page-container>
            <q-page class="bg-light-blue window-height window-width row justify-center items-center">
                <div class="column">
                <div class="row">
                    <h5 class="text-h5 text-white q-my-md">AirBnB Competitor</h5>
                </div>
                <div class="row">
                    <q-card square bordered class="q-pa-lg shadow-1">
                    <q-card-section>
                        <q-form class="q-gutter-md">
                            <q-input square filled clearable v-model="$v.name.$model" :error="$v.name.$error" type="name" error-message="Please enter valid name" label="name" />
                            <q-input square filled clearable v-model="$v.email.$model" :error="$v.email.$error" type="email" error-message="Please enter valid email" label="email" />
                            <q-input square filled clearable v-model="$v.password.$model" :error="$v.password.$error" type="password" error-message="Please create password with min 6 and max 18 character" label="password" />
                        </q-form>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn unelevated color="light-blue-7" @click="onSubmit" type="submit" size="lg" class="full-width" label="Register" />
                    </q-card-actions>
                    <q-card-section class="text-center q-pa-none">
                        <p class="text-grey-6"  @click="$router.replace('login')">Already reigistered? Login</p>
                    </q-card-section>
                    </q-card>
                </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { 
  email, 
  maxLength, 
  minLength, 
  required 
} from 'vuelidate/lib/validators'
import { mapActions} from 'vuex'
import { Notify } from 'quasar';
import { uid } from 'quasar'
export default {
  name: 'Register',
  data () {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  validations: {
    name: {
        required,
        min: minLength(3),
    },
    email: {
        required,
        email,
    },
    password: {
        required,
        min: minLength(6),
        max: maxLength(18)
    },
    
  },
  methods:{
      ...mapActions('users',['registerUser']),
      onSubmit(){
            if (this.$v.$anyError || !this.name || !this.email || !this.password) {
                Notify.create({
                    message: 'Please enter valid data !',
                    color:'red'
                });
            }
            else
            {
                 const userDetails = {
                    id:uid(),
                    name:this.$v.name.$model,
                    email:this.$v.email.$model,
                    password:this.$CryptoJS.AES.encrypt(this.$v.password.$model, "secret123").toString()
                } 
                this.registerUser(userDetails);
                //  this.$store.dispatch('users/registerUser',userDetails);
                Notify.create({
                    message: 'Successfully registered. Please login your self !',
                    color:'green'
                });
                this.$router.push('/login');
            }
        
        }
    }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>