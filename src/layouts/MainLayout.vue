<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="nav-header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title> AirBnB Competitor </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-btn icon="logout" aria-label="Logout" class="logout-btn" @click="logout()"
          >Logout</q-btn
        >
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapActions } from "vuex";
const linksData = [
  // {
  //     title: 'Register',
  //     caption: 'Register',
  //     icon: 'person_add_alt',
  //     link: '/register',
  //     meta:{
  //       hasAuth:false,
  //     }
  // },
  // {
  //     title: 'Login',
  //     caption: 'Login',
  //     icon: 'login',
  //     link: '/login',
  //     meta:{
  //       hasAuth:false,
  //     }
  // },
  {
    title: "Dashboard",
    caption: "Dashboard",
    icon: "dashboard",
    link: "/dashboard",
    meta: {
      hasAuth: true,
    },
  },
  // {
  //     title: 'Profile',
  //     caption: 'Profile',
  //     icon: 'portrait',
  //     link: '/profile',
  //     meta:{
  //       hasAuth:true,
  //     }
  // },
  {
    title: "Properties",
    caption: "Properties",
    icon: "account_balance",
    link: "/properties",
    meta: {
      hasAuth: true,
    },
  },
  {
    title: "Books",
    caption: "Books",
    icon: "view_list",
    link: "/bookings",
    meta: {
      hasAuth: true,
    },
  },
  // {
  //     title: 'Logout',
  //     caption: 'Logout',
  //     icon: 'logout',
  //     link: '/logout',
  //     meta:{
  //       hasAuth:true,
  //     }
  // }
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    };
  },
  methods:{
    ...mapActions("users", ["logoutUser"]),
    logout(){
      this.logoutUser()
      this.$router.push('/login')
    }
  }
};
</script>
<style scoped>
.logout-btn {
  left: 12px;
  top: 12px;
  color: white;
  background-color: #479be4;
}
.nav-header{
      background-color: #479be4;
}
</style>
