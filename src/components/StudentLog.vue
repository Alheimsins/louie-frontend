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
      :items="log"
      :search="search"
      no-data-text="Ingen eleverlogger funnet"
      hide-default-footer
      loading-text="Laster elevlogger..."
    ></v-data-table>
  </v-card-text>
</template>

<script>
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

const log = [
  {
    date: '1. september 2019',
    type: 'Varselbrev fag',
    fag: 'Spansk I+II',
    term: '1. termin',
    sentByName: 'Demo User'
  },
  {
    date: '1. september 2019',
    type: 'Varselbrev fag',
    fag: 'Engelsk',
    term: '1. termin',
    sentByName: 'Demo User'
  },
  {
    date: '2. februar 2019',
    type: 'Varselbrev orden',
    term: '1. termin',
    sentByName: 'Demo User'
  }
]

export default {
  name: 'StudentLog',
  data: () => ({
    headers,
    log,
    search: ''
  })
}
</script>
