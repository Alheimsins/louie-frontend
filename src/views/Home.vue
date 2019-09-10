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

        <!-- Send warning button -->
        <template v-slot:item="{ item }">
          <tr @click="showDialog(item)">
            <td>{{ item.name }}</td>
            <td>{{ item.groups }}</td>
          </tr>
        </template>

        <v-alert slot="no-data" :value="true" v-if="loading !== true" color="error" icon="mdi-alert">
          Du har ikke tilgang til noen elever. Ta kontakt med administrativt personale på din skole.
        </v-alert>

        <v-alert slot="no-results" :value="true" color="error" icon="mdi-alert">
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
        max-width="800"
      >
        <v-card color="#F47F97" dark>
          <v-toolbar dark flat color="#F47F97">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{selectedStudent.name ? selectedStudent.name.toUpperCase() : ''}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="white--text">
            <v-row>
              <v-col>
                <v-avatar
                  size="220"
                  tile
                  class="rounded-card"
                >
                  <v-img :src="student.imageUrl"></v-img>
                </v-avatar>
              </v-col>
              <v-col>
                <v-list
                  tile
                  style="background: transparent;"
                >

                  <!-- School -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-school</v-icon>
                    </v-list-item-icon>
                    {{selectedStudent.school}}
                  </v-list-item>

                  <!-- Class -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-account-multiple</v-icon>
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

            </v-card-text>
            </v-card>
            <v-card>
            <v-card-text>
            <v-flex>
              <v-row>
              <v-tabs color="#A3DECE" light>
                <v-tab>Varsel</v-tab>
                <v-tab>Logg</v-tab>
              </v-tabs>
                <!-- Type varsel -->
                <v-col>
                  <p class="dialog-title">Type varsel</p>
                  <v-radio-group v-model="warningType">
                    <v-radio color="#A3DECE" label="Fag" value="fag"></v-radio>
                    <v-radio color="#A3DECE" label="Orden" value="orden"></v-radio>
                    <v-radio color="#A3DECE" label="Atferd" value="atferd"></v-radio>
                  </v-radio-group>

                  <div v-if="warningType === 'fag'">
                    <p class="dialog-title">Varselet gjelder</p>
                    <div v-for="fag in student.classes" :key="fag">
                      <v-checkbox color="#A3DECE" hide-details v-model="selectedFag" :label="fag" :value="fag"></v-checkbox>
                    </div>
                  </div>
                </v-col>

                <!-- Liste over fag -->
                <v-col>

                  <p class="dialog-title">Varselet gjelder</p>
                  <v-radio-group v-model="termin">
                    <v-radio color="#A3DECE" label="Halvårsvurdering 1. termin" value="1"></v-radio>
                    <v-radio color="#A3DECE" label="Halvårsvurdering 2. termin" value="2"></v-radio>
                    <v-radio color="#A3DECE" label="Standpunktkarakter" value="3"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-flex>
          </v-card-text>

          <v-card-actions>
            <div class="flex-grow-1"></div>

            <v-btn
              @click="openPreview()"
              text
              class="mr-5"
            >
              <v-icon left>mdi-file-document</v-icon> Forhåndsvisning
            </v-btn>

            <v-dialog
              v-model="previewDialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <v-card>
                <v-toolbar fixed color="#F47F97">
                  <v-btn @click="previewDialog = false" dark icon text>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title class="white--text">
                    FORHÅNDSVISNING
                  </v-toolbar-title>
                </v-toolbar>
                <div class="wrapper" ref="pdfview">
                  <pdf
                    style="width: 100%;"
                    :src="pdfFile"
                    @page-loaded="currentPage = $event"
                  ></pdf>
                </div>
              </v-card>
            </v-dialog>

            <v-btn
              @click="sendWarning"
              text
              :disabled="warningType === 'fag' && selectedFag.length === 0"
            >
            <v-icon left>mdi-send</v-icon> Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import config from '../../config'
import pdf from 'vue-pdf'
import pdfTemplate from '../assets/template-data.json'
import { mapState } from 'vuex'

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
    },
    dialog: false,
    selectedStudent: false,
    warningType: 'fag',
    termin: '1',
    selectedFag: [],
    pdfFile: false,
    previewDialog: false
  }),
  methods: {
    showDialog (item) {
      this.selectedStudent = item
      this.$store.dispatch('GET_STUDENT', item.uid)
      this.dialog = true
    },
    async openPreview () {
      const payload = {
        ...pdfTemplate,
        data: {
          studentName: this.selectedStudent.name,
          schoolName: this.selectedStudent.school,
          date: new Date().toISOString().substring(0, 10)
        }
      }
      const { data } = await this.$http.post(`${config.apiUrl}/documents/generate/base64`, payload)
      this.pdfFile = data
      this.previewDialog = true
    },
    sendWarning () {
      this.$store.dispatch('SEND_WARNING')
      this.dialog = false
    }
  },
  created () {
    this.$store.dispatch('GET_STUDENTS')
  },
  computed: mapState([
    'students',
    'student',
    'loading'
  ]),
  components: { pdf }
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
.v-list-item {
  padding: 0;
}
.wrapper {
  overflow: hidden !important;
  -webkit-overflow-scrolling: touch;
  -moz-overflow-scrolling: touch;
  -ms-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
.dialog-title {
  font-size: 1.25rem;
  text-transform: uppercase;
}
.theme--light.v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}
</style>
