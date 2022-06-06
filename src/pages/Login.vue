<template>
  <q-layout>
    <q-page-container>
      <q-page
        class="
          bg-light-blue
          window-height window-width
          row
          justify-center
          items-center
        "
      >
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">AirBnB Competitor</h5>
          </div>
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    clearable
                    v-model="$v.email.$model"
                    :error="$v.email.$error"
                    type="email"
                    error-message="Please enter valid email"
                    label="email"
                  />
                  <q-input
                    square
                    filled
                    clearable
                    v-model="$v.password.$model"
                    :error="$v.password.$error"
                    type="password"
                    error-message="Please create password with min 6 and max 18 character"
                    label="password"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="light-blue-7"
                  @click="onSubmit"
                  type="submit"
                  size="lg"
                  class="full-width"
                  label="Login"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
                <p
                  class="text-grey-6 cursor-pointer"
                  @click="$router.replace('register')"
                >
                  Not reigistered? Created an Account
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import { mapState, mapActions } from "vuex";
import { Notify } from "quasar";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  computed: {
    ...mapState("users", ["users"]),
  },
  methods: {
    ...mapActions("users", ["loginUser"]),
    onSubmit() {
      if (this.$v.$anyError) {
        Notify.create({
          message: "Please enter valid credentials !",
          color: "red",
        });
      } else {
        const userDetails = {
          email: this.$v.email.$model,
          password: this.$CryptoJS.AES.encrypt(
            this.$v.password.$model,
            "secret123"
          ).toString(),
        };
        let isUser = this.users.filter((element) => {
          return (
            element.email == userDetails.email &&
            this.$CryptoJS.AES.decrypt(element.password, "secret123").toString(
              this.CryptoJS.enc.Utf8
            ) ==
              this.$CryptoJS.AES.decrypt(
                userDetails.password,
                "secret123"
              ).toString(this.$CryptoJS.enc.Utf8)
          );
        });
        if (isUser && isUser.length) {
          this.loginUser(userDetails);
           Notify.create({
                    message: 'Login Successfull',
                    color:'green'
                });
            this.$router.push('/dashboard');
          return true;
        } else {
          Notify.create({
                    message: 'Credentials are not matching! Please register your self',
                    color:'red'
                });
        }
      }
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>