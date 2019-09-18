<template>
  <v-dialog
    max-width="800"
    v-model="studentDialogVisable"
  >
    <v-card
      color="secondary"
      dark
      :loading="loading"
    >
      <v-toolbar dark flat color="secondary">
        <v-btn icon dark @click="studentDialogVisable = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{student.name ? student.name.toUpperCase() : ''}}</v-toolbar-title>
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
                {{student.school}}
              </v-list-item>

              <!-- Class -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account-multiple</v-icon>
                </v-list-item-icon>
                {{student.groups}}
              </v-list-item>

              <!-- Phone -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-phone</v-icon>
                </v-list-item-icon>
                {{student.phone}}
              </v-list-item>

              <!-- Mail -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-mail</v-icon>
                </v-list-item-icon>
                {{student.mail}}
              </v-list-item>

            </v-list>
          </v-col>
        </v-row>

        </v-card-text>
        </v-card>

        <v-card>
        <v-form ref="form">
          <v-card-text>
          <v-flex>
            <v-row>
              <v-tabs color="primary" light>
                <v-tab>Varsel</v-tab>
                <v-tab>Logg</v-tab>
              </v-tabs>

              <!-- Type varsel -->
              <v-col>
                <p class="dialog-title">Type varsel</p>
                <v-radio-group v-model="warningType">
                  <v-radio color="primary" label="Fag" value="fag"></v-radio>
                  <v-radio color="primary" label="Orden" value="orden"></v-radio>
                  <v-radio color="primary" label="Atferd" value="atferd"></v-radio>
                </v-radio-group>

                <div v-if="warningType === 'fag'">
                  <p class="dialog-title">Varselet gjelder</p>
                  <div v-for="fag in student.classes" :key="fag">
                    <v-checkbox color="primary" hide-details v-model="selectedFag" :label="fag" :value="fag"></v-checkbox>
                  </div>
                </div>
              </v-col>

              <!-- Liste over fag -->
              <v-col>

                <p class="dialog-title">Varselet gjelder</p>
                <v-radio-group v-model="termin">
                  <v-radio color="primary" label="Halvårsvurdering 1. termin" value="1"></v-radio>
                  <v-radio color="primary" label="Halvårsvurdering 2. termin" value="2"></v-radio>
                  <v-radio color="primary" label="Standpunktkarakter" value="3"></v-radio>
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

          <PreviewDialog>
          </PreviewDialog>

          <v-btn
            @click="sendWarning"
            text
            :disabled="warningType === 'fag' && selectedFag.length === 0"
          >
          <v-icon left>mdi-send</v-icon> Send
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import PdfView from './PdfView'
import PreviewDialog from './PreviewDialog'
import { mapState } from 'vuex'
import config from '../../config'
import pdfTemplate from '../assets/template-data.json'

export default {
  name: 'WarningDialog',
  data: () => ({
    warningType: 'fag',
    termin: '1',
    selectedFag: []
  }),
  methods: {
    sendWarning () {
      this.studentDialogVisable = false
      this.$store.dispatch('SEND_WARNING')
    },
    openPreview () {
      const payload = {
        ...pdfTemplate,
        data: {
          studentName: this.student.name,
          schoolName: this.student.school,
          date: new Date().toISOString().substring(0, 10)
        }
      }
      this.$store.dispatch('GENERATE_PREVIEW', payload)
    }
  },
  components: {
    PreviewDialog
  },
  watch: {
    studentDialogVisable () {
      this.warningType = 'fag'
      this.termin = '1'
      this.selectedFag = []
    }
  },
  computed: {
    studentDialogVisable: {
      get () {
        return this.$store.state.studentDialog
      },
      set (value) {
        this.$store.commit('SET_STUDENT_DIALOG', value)
      }
    },
    ...mapState([
      'student',
      'studentDialog',
      'loading'
    ])
  }
}
</script>

<style>
.theme--dark.v-label {
  color: white !important;
}
.rounded-card {
  border-radius: 10px;
}
.v-list-item {
  padding: 0;
}
.dialog-title {
  font-size: 1.25rem;
  text-transform: uppercase;
}
.theme--light.v-tabs > .v-tabs-bar {
  background-color: transparent !important;
}
</style>
