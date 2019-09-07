<template>
  <v-container color="#f7f7f7">
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
            color="#F47F97"
            clearable
          ></v-text-field>
        </v-flex>

        <!-- Student table -->
        <v-data-table
          color="#F47F97"
          hide-default-footer
          :headers="computedHeaders"
          :items="students"
          :search="search"
          :loading="loading"
          :items-per-page="pagination.rowsPerPage"
          :page.sync="pagination.page"
          :expanded.sync="expanded"
          item-key="uid"
          single-expand
          show-expand
          loading-text="Laster elever..."
          no-data-text="Ingen elever funnet"
        >

        <!-- Send warning button -->
        <template v-slot:item.uid="{ item }">
          <v-btn
            color="#F47F97"
            dark
            fab
            x-small
            @click="showDialog(item)"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </template>

        <!-- Expanded log -->
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">

            <template>
              <v-simple-table expand class="noHover">
                <thead>
                  <tr>
                    <th class="text-left">Dato</th>
                    <th class="text-left">Periode</th>
                    <th class="text-left">Type</th>
                    <th class="text-left">Fag</th>
                    <th class="text-left">Sendt av</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1. september 2019</td>
                    <td>1. termin</td>
                    <td>Varselbrev fag</td>
                    <td>Spansk I+II</td>
                    <td>Demo User</td>
                  </tr>
                </tbody>
              </v-simple-table>
            </template>
          </td>
        </template>

        <v-alert slot="no-data" :value="true" v-if="loading !== true" color="error" icon="mdi-warning">
          Du har ikke tilgang til noen elever. Ta kontakt med administrativt personale på din skole.
        </v-alert>

        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Ditt søk etter "{{ search }}" fikk ingen resultater.<br/>
          Finner du ikke eleven du leter etter, ta kontakt med den som er ansvarlig for Extens eller administrativt personale på din skole.
        </v-alert>
      </v-data-table>

      <!-- pagination -->
      <div v-if="students.length > 0" class="text-xs-center pt-2">
        <v-pagination
          v-model="pagination.page"
          circle
          color="#F47F97"
          :total-visible="7"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
          :length="Math.round(students.length / pagination.rowsPerPage)"
        ></v-pagination>
      </div>

      <v-dialog
        v-model="dialog"
        max-width="600"
      >
        <v-card color="#F47F97" dark>
          <v-toolbar dark flat color="#F47F97">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-title class="headline">{{selectedStudent.name ? selectedStudent.name.toUpperCase() : ''}}</v-card-title>
          <v-card-text class="white--text">
            <v-row>
              <v-col>
                <v-avatar
                  size="184"
                  tile
                  class="rounded-card"
                >
                  <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                </v-avatar>
              </v-col>
              <v-col>
                <v-list
                  tile
                  light
                  class="rounded-card"
                >

                  <!-- Class -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    {{selectedStudent.groups}}
                  </v-list-item>

                  <!-- Phone -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-phone</v-icon>
                    </v-list-item-icon>
                    {{selectedStudent.phone}}
                  </v-list-item>

                  <!-- Mail -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-mail</v-icon>
                    </v-list-item-icon>
                    {{selectedStudent.mail}}
                  </v-list-item>

                </v-list>
              </v-col>
            </v-row>

            <v-flex>
              <v-row>

                <!-- Type varsel -->
                <v-col>
                  <h2>Type varsel</h2>
                  <v-radio-group v-model="warningType">
                    <v-radio label="Fag" value="fag"></v-radio>
                    <v-radio label="Orden" value="orden"></v-radio>
                    <v-radio label="Atferd" value="atferd"></v-radio>
                  </v-radio-group>

                  <h2>Varselet gjelder</h2>
                  <v-radio-group v-model="termin">
                    <v-radio label="Halvårsvurdering 1. termin" value="1"></v-radio>
                    <v-radio label="Halvårsvurdering 2. termin" value="2"></v-radio>
                    <v-radio label="Standpunktkarakter" value="3"></v-radio>
                  </v-radio-group>
                </v-col>

                <!-- Liste over fag -->
                <v-col>
                  <div v-if="warningType === 'fag'">
                    <h2>Velg fag varselet gjelder</h2>
                    <div v-for="classes in selectedStudent.classes">
                      <v-checkbox hide-details v-model="selectedFag" :label="classes" :value="classes"></v-checkbox>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-flex>
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn
              text
              @click="dialog = false"
            >
            Forhåndsvisning
            </v-btn>

            <v-btn
              text
              @click="dialog = false"
            >
            Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

const headers = [
  {
    text: 'Navn',
    sortable: true,
    value: 'name'
  },
  {
    text: 'E-post',
    sortable: false,
    value: 'mail',
    hide: 'mdAndDown'
  },
  {
    text: 'tlf.',
    sortable: false,
    value: 'phone',
    hide: 'mdAndDown'
  },
  {
    text: 'Klasse',
    sortable: true,
    value: 'groups',
    hide: 'mdAndDown'
  },
  {
    text: 'Send varsel',
    sortable: false,
    value: 'uid'
  }
]

export default {
  name: 'Home',
  data: () => ({
    search: '',
    expanded: [],
    pagination: {
      rowsPerPage: 8,
      sortBy: 'name',
      page: 1
    },
    dialog: false,
    selectedStudent: false,
    warningType: 'fag',
    termin: '1',
    selectedFag: []
  }),
  methods: {
    showDialog (item) {
      this.selectedStudent = item
      this.dialog = true
    }
  },
  created () {
    this.$store.dispatch('GET_STUDENTS')
  },
  computed: {
    computedHeaders () {
      return headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide])
    },
    ...mapState([
      'students',
      'loading'
    ])
  }
}
</script>

<style>
.noHover tr:hover {
  background: unset !important;
}
.theme--dark.v-label {
  color: white !important;
}
.rounded-card {
  border-radius: 10px;
}
</style>
