<template>
  <form>
    <v-card-text>
      <p class="dialog-title">Elev notater</p>
      <p>Notater lagres i elevmappen i arkivet og kan ikke endres.</p>
      <p>De lagrede notatene kan sees i elevmappa.</p>
      <v-textarea
        class="mt-5"
        counter
        autofocus
        label="Notater"
        auto-grow
        v-model="form.note"
        hint="Fyll inn notater"
      ></v-textarea>
    </v-card-text>
    <v-card-actions>
      <div class="flex-grow-1"></div>
      <v-btn
        @click="openPreview()"
        text
        :disabled="form.note.length === 0"
        class="mr-5"
      >
        <v-icon left>mdi-file-document</v-icon> Forhåndsvisning
      </v-btn>

      <PreviewDialog>
      </PreviewDialog>

      <v-btn
        @click="saveNote"
        text
        :disabled="form.note.length === 0"
      >
        <v-icon left>mdi-content-save</v-icon> Lagre
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import PreviewDialog from './PreviewDialog'

export default {
  name: 'StudentNote',
  data: () => ({
    form: {
      template: 'note',
      note: ''
    }
  }),
  methods: {
    saveNote () {
      this.$store.commit('SET_STUDENT_DIALOG', false)
      this.$store.dispatch('SAVE_INTERVIEW')
    },
    openPreview () {
      const payload = {
        student: this.student,
        teacher: this.$store.state.oidcStore.user.name,
        form: { ...this.form, note: JSON.stringify(this.form.note).slice(1, -1) }
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
  components: {
    PreviewDialog
  },
  watch: {
    studentDialogVisable () {
      this.form.note = ''
    }
  }
}
</script>
