<template>
  <v-dialog
    v-model="previewDialogVisable"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar fixed color="secondary">
        <v-btn @click="previewDialogVisable = false" dark icon text>
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="white--text">
          FORHÅNDSVISNING
        </v-toolbar-title>
      </v-toolbar>
      <PdfView></PdfView>
    </v-card>
  </v-dialog>
</template>

<script>
import PdfView from './PdfView'
import { mapState } from 'vuex'

export default {
  methods: {
  },
  components: {
    PdfView
  },
  computed: {
    previewDialogVisable: {
      get () {
        return this.$store.state.previewDialog
      },
      set (value) {
        this.$store.commit('SET_PREVIEW_DIALOG', value)
      }
    },
    ...mapState([
      'previewDialog'
    ])
  }
}
</script>
