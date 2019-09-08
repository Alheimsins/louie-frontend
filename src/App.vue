<template>
  <v-app>
   <v-app-bar
      color="#a2ddcf"
      app
      dark
    >

      <!-- Home -->
      <router-link to="/">
        <v-toolbar-title>LOUIE</v-toolbar-title>
        <div class="subheading">Send varsler</div>
      </router-link>
      <div class="flex-grow-1"></div>

      <!-- Home -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/">
            <v-btn icon v-on="on">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span>Hjem</span>
      </v-tooltip>

      <!-- Help -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <router-link to="/help">
            <v-btn icon v-on="on">
              <v-icon>mdi-help-circle</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span>Hjelp</span>
      </v-tooltip>

      <!-- Account -->
      <v-menu min-width="200">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list class="pa-3">
            <v-list-item-group>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{user.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{user.username}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-settings</v-icon>
                  <v-list-item-title>&nbsp; Innstillinger</v-list-item-title>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="red">mdi-power</v-icon>
                  <v-list-item-title>&nbsp; Logg ut</v-list-item-title>
                </v-list-item-icon>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <!-- Content -->
    <v-content>
      <router-view />
    </v-content>

    <!-- Footer -->
    <Footer>
    </Footer>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.active" :color="snackbar.type === 'error' ? 'error' : '#F47F97'" :bottom="true">
      {{snackbar.message}}
    </v-snackbar>

  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Footer
  },
  computed: mapState([
    'snackbar',
    'user'
  ])
}
</script>

<style>
.v-data-table tbody tr.expanded.expanded__content {
  -webkit-box-shadow: none;
  box-shadow: none;
}
tr td:first-child {
  border-left: 8px transparent solid;
}
tr:hover td:first-child {
  cursor: pointer;
  border-left: 8px #F47F97 solid;
}
html {
  overflow-y: hidden;
}
a {
  text-decoration: none;
  color: unset !important;
}
</style>
