<template>
  <div id="q-app">
    <MainLayout  v-if="authUser"/>
    <router-view v-if="!authUser"/>
  </div>
</template>

<script>
import MainLayout from "./layouts/MainLayout.vue"
import {mapState} from "vuex"
export default {
  name: 'App',
  components:{
    MainLayout
  },
  computed:{
    ...mapState('users',['authUser'])
  }
}
</script>
