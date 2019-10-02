<template>
  <v-container>
    <v-layout wrap>
      <v-container fluid grid-list-lg>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h3 class="headline">Innstillinger</h3>
              </v-card-title>
              <v-card-text>
                <p>
                  You are signed in as:
                </p>
                <div class="code" v-html="oidcUser"></div>
                <p>
                  Id token expires {{ new Date(oidcIdTokenExp).toISOString() }}
                </p>

                <textarea readonly style="width:100%;height: 200px;font-family: monospace;" v-model="oidcIdToken"></textarea>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Settings',
  computed: {
    ...mapGetters('oidcStore', [
      'oidcIsAuthenticated',
      'oidcAuthenticationIsChecked',
      'oidcUser',
      'oidcIdToken',
      'oidcIdTokenExp'
    ])
  }
}
</script>

<style scoped>
p {
  font-size: 18px !important;
  color: black;
}
h5, h3 {
  color: black;
}
</style>
