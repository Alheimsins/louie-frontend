<template>
  <v-form ref="form">
    <v-card-text>
      <v-flex>
        <v-row>
          <v-col>
            <p class="dialog-title">Type varsel</p>
            <v-radio-group v-model="form.warningType">
              <v-radio color="primary" label="Fag" value="fag"></v-radio>
              <v-radio color="primary" label="Orden" value="orden"></v-radio>
              <v-radio color="primary" label="Atferd" value="atferd"></v-radio>
            </v-radio-group>

            <div v-if="form.warningType === 'fag'">
              <p class="dialog-title">Varselet gjelder</p>
              <div v-for="fag in student.classes" :key="fag">
                <v-checkbox color="primary" hide-details v-model="form.subjects" :label="fag" :value="fag"></v-checkbox>
              </div>
            </div>
          </v-col>

          <!-- Liste over fag -->
          <v-col>
            <p class="dialog-title">Varselet gjelder</p>
            <v-radio-group v-model="form.term">
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
        :disabled="form.warningType === 'fag' && form.subjects.length === 0"
      >
        <v-icon left>mdi-send</v-icon> Send
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import PreviewDialog from './PreviewDialog'
import { mapState } from 'vuex'

export default {
  name: 'WarningForm',
  data: () => ({
    form: {
      warningType: 'fag',
      term: '1',
      subjects: [],
      template: 'warning'
    }
  }),
  methods: {
    sendWarning () {
      this.studentDialogVisable = false
      this.$store.commit('SET_STUDENT_DIALOG', false)
      this.$store.dispatch('SEND_WARNING')
    },
    openPreview () {
      const payload = {
        student: this.student,
        teacher: this.$store.state.user,
        form: this.form
      }
      this.$store.dispatch('GENERATE_PREVIEW', payload)
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
    ...mapState(['student'])
  },
  watch: {
    studentDialogVisable () {
      this.form.warningType = 'fag'
      this.form.term = '1'
      this.form.subjects = []
    }
  },
  components: {
    PreviewDialog
  }
}
</script>
