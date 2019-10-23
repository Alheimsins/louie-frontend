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
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="mdi-account"
                      :value="oidcUser.name"
                      label="Navn"
                      filled
                      disabled
                    >
                    </v-text-field>

                    <v-text-field
                      prepend-icon="mdi-email"
                      :value="oidcUser.email"
                      label="E-post"
                      filled
                      disabled
                    >
                    </v-text-field>

                    <v-select
                      prepend-icon="mdi-account-multiple"
                      :items="contactGroupNames"
                      :value="contactGroupNames"
                      label="Kontaktklasser"
                      no-data-text="Ingen"
                      chips
                      filled
                      multiple
                    >
                    </v-select>

                    <v-select
                      prepend-icon="mdi-account-multiple"
                      :items="groupNames"
                      :value="groupNames"
                      label="Klasser"
                      no-data-text="Ingen"
                      chips
                      filled
                      multiple
                    >
                    </v-select>

                    <v-text-field
                      prepend-icon="mdi-earth"
                      :value="browser"
                      label="Nettleser"
                      filled
                      disabled
                    >
                    </v-text-field>

                  </v-col>
                </v-row>
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
  data: () => ({
    browser: navigator.userAgent
  }),
  created () {
    this.$store.dispatch('GET_GROUPS')
  },
  computed: {
    ...mapGetters('oidcStore', ['oidcUser']),
    ...mapGetters(['groupNames', 'contactGroupNames'])
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
