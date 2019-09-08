<template>
  <v-app>
   <v-app-bar
      color="#a2ddcf"
      app
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>LOUIE</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-btn icon>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="() => {}"
          >
            <v-list-item-title>Logg ut</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- Content -->
    <v-content>
      <router-view />
    </v-content>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.active" :color="snackbar.type === 'error' ? 'error' : 'primary'" :bottom="true">
      {{snackbar.message}}
    </v-snackbar>

  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
  },
  computed: mapState([
    'snackbar'
  ])
}
</script>

<style>
.v-data-table tbody tr.expanded.expanded__content {
  -webkit-box-shadow: none;
  box-shadow: none;
}

tr:hover td:first-child {
  cursor: pointer;
  border-left: 8px #F47F97 solid;
}
html {
  overflow-y: hidden;
}
</style>
