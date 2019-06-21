<template>
  <v-app>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-btn
        align="right"
        @click="drawer=!drawer"
        dark
        fab
        color="success"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="isUserLoggedIn"
         @click="logoutUser"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click="drawer=!drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">My super app</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <template v-for="(link,i) of links">
          <v-divider :key="i" vertical></v-divider>
          <v-btn
            :key="i"
            flat
            :to="link.url"
          >
            <v-icon left>{{link.icon}}</v-icon>
            {{link.title}}
          </v-btn>
        </template>
        <v-divider vertical v-if="isUserLoggedIn"></v-divider>
        <v-btn
          v-if="isUserLoggedIn"
          flat
          @click="logoutUser"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <template v-if="errorMessage">
      <v-snackbar

        :timeout="5000"
        :multi-line="true"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ errorMessage }}
        <v-btn
          dark
          color="black"
          flat
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    errorMessage() {
      return this.$store.getters.getError;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          {
            title: 'Home',
            icon: 'home',
            url: '/',
          },
          {
            title: 'Orders',
            icon: 'bookmark',
            url: '/orders',
          },
          {
            title: 'New ad',
            icon: 'note_add',
            url: '/new',
          },
          {
            title: 'My ads',
            icon: 'list',
            url: '/list',
          },
        ];
      }
      return [
        {
          title: 'Home',
          icon: 'home',
          url: '/',
        },
        {
          title: 'Login',
          icon: 'lock',
          url: '/login',
        },
        {
          title: 'Registration',
          icon: 'face',
          url: '/registration',
        },
      ];
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError');
    },
    logoutUser() {
      this.$store.dispatch('logoutUser');
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
