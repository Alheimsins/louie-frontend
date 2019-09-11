<template>
  <v-app>

    <!-- Toolbar -->
    <Toolbar></Toolbar>

    <!-- Content -->
    <v-content>
      <router-view />
    </v-content>

    <!-- Footer -->
    <Footer>
    </Footer>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.active" :color="snackbar.type === 'error' ? 'error' : 'primary'" :bottom="true">
      {{snackbar.message}}
    </v-snackbar>

  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Toolbar from './components/Toolbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Footer,
    Toolbar
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
