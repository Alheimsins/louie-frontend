<template>
  <v-card-text>
    <v-text-field
      v-model="search"
      prepend-icon="mdi-magnify"
      label="Søk i elevlogg"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="documents"
      :search="search"
      no-data-text="Ingen eleverlogger funnet"
      hide-default-footer
      loading-text="Laster elevlogger..."
    ></v-data-table>
  </v-card-text>
</template>

<script>
import { mapState } from 'vuex'

const headers = [
  {
    text: 'Dato',
    sortable: 'true',
    value: 'date'
  },
  {
    text: 'Type',
    sortable: true,
    value: 'type'
  },
  {
    text: 'Fag',
    sortable: true,
    value: 'fag'
  },
  {
    text: 'Periode',
    sortable: true,
    value: 'term'
  },
  {
    text: 'Sendt av',
    sortable: true,
    value: 'sentByName'
  }
]

export default {
  name: 'StudentLog',
  data: () => ({
    headers,
    search: ''
  }),
  created () {
    this.$store.dispatch('GET_DOCUMENTS')
  },
  computed: mapState(['documents'])
}
</script>
