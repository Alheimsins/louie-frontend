<template>
  <v-container
    color="background"
    v-if="oidcIsAuthenticated"
  >
    <v-layout>
      <v-flex>

        <!-- Search -->
        <v-flex class="text-xs-right mb-8">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Søk etter elev eller klasse"
            single-line
            hide-details
            autofocus
            color="secondary"
            clearable
          ></v-text-field>
        </v-flex>

        <!-- Student table -->
        <v-data-table
          color="secondary"
          hide-default-footer
          :headers="headers"
          :items="students"
          :search="search"
          :loading="loading"
          :items-per-page="pagination.rowsPerPage"
          :sort-by="pagination.sortBy"
          :page.sync="pagination.page"
          :expanded.sync="expanded"
          item-key="uid"
          loading-text="Laster elever..."
          no-data-text="Ingen elever funnet"
        >

          <template v-slot:item="{ item }">
            <tr @click="showDialog(item.username)">
              <td>{{ item.name }}</td>
              <td>{{ item.groups }}</td>
            </tr>
          </template>

          <v-alert slot="no-data" dark :value="true" v-if="loading !== true" color="error" icon="mdi-alert">
            Du har ikke tilgang til noen elever. Ta kontakt med administrativt personale på din skole.
          </v-alert>

          <v-alert slot="no-results" dark :value="true" color="error" icon="mdi-alert">
            Ditt søk etter "{{ search }}" fikk ingen resultater.<br/>
            Finner du ikke eleven du leter etter, ta kontakt med den som er ansvarlig for Extens eller administrativt personale på din skole.
          </v-alert>
        </v-data-table>

        <!-- pagination -->
        <div v-if="students.length > 0" class="text-xs-center pt-2">
          <v-pagination
            v-model="pagination.page"
            circle
            color="secondary"
            :total-visible="7"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
            :length="Math.round(students.length / pagination.rowsPerPage)"
          ></v-pagination>
        </div>

        <StudentDialog></StudentDialog>

      </v-flex>
    </v-layout>
  </v-container>
  <SignedOut v-else>
  </SignedOut>
</template>

<script>
import StudentDialog from '../components/StudentDialog'
import SignedOut from '../components/SignedOut'
import { mapState, mapGetters } from 'vuex'

const headers = [
  {
    text: 'Navn',
    sortable: true,
    value: 'name'
  },
  {
    text: 'Klasse',
    sortable: true,
    value: 'groups'
  }
]

export default {
  name: 'Home',
  data: () => ({
    search: '',
    headers,
    expanded: [],
    pagination: {
      rowsPerPage: 8,
      sortBy: 'name',
      page: 1
    }
  }),
  methods: {
    showDialog (username) {
      this.$store.dispatch('GET_STUDENT', username)
      this.$store.commit('SET_STUDENT_DIALOG', true)
    }
  },
  created () {
    this.$store.dispatch('GET_STUDENTS')
  },
  computed: {
    ...mapState([
      'students',
      'loading'
    ]),
    ...mapGetters('oidcStore', ['oidcIsAuthenticated'])
  },
  components: {
    StudentDialog,
    SignedOut
  }
}
</script>
