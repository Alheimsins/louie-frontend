<template>
  <v-app-bar
    color="primary"
    app
    dark
  >

    <!-- App Icon -->
    <v-btn icon x-large style="background: white" color="secondary" class="hidden-xs-only mr-3">
      <v-icon>mdi-school</v-icon>
    </v-btn>

    <!-- App text and description -->
    <router-link to="/">
      <v-toolbar-title>LOUIE</v-toolbar-title>
      <div class="subheading">Send varsler</div>
    </router-link>

    <div class="flex-grow-1"></div>

    <!-- Home button -->
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

    <!-- Statistics button -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <router-link to="/stats">
          <v-btn icon v-on="on">
            <v-icon>mdi-chart-bar</v-icon>
          </v-btn>
        </router-link>
      </template>
      <span>Statistikk</span>
    </v-tooltip>

    <!-- Help button -->
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

    <!-- Account button -->
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Toolbar',
  computed: mapState(['user'])
}
</script>
