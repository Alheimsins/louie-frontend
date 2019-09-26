<template>
  <form>
    <v-card-text>
      <p class="dialog-title">Elev notater</p>
      <p>Notater lagres i elevmappen i arkivet og kan ikke endres.</p>
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
        class="mr-5"
      >
        <v-icon left>mdi-file-document</v-icon> Forhåndsvisning
      </v-btn>
      <v-btn
        @click="saveNote"
        text
      >
        <v-icon left>mdi-content-save</v-icon> Lagre
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script>
import { mapState } from 'vuex'

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
        teacher: this.$store.state.user,
        form: { ...this.form, note: JSON.stringify(this.form.note).slice(1, -1) }
      }
      console.log(payload)
      this.$store.dispatch('GENERATE_PREVIEW', payload)
    }
  },
  computed: mapState(['student'])
}
</script>
