<template>
  <form ref="form">
    <v-card-text>
      <p class="dialog-title">Elevsamtale</p>
      <v-expansion-panels style="font-size: 16px;">
        <v-expansion-panel>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-expansion-panel-header v-on="on" style="font-size: 18px !important;">Momenter til elevsamtale</v-expansion-panel-header>
            </template>
            <span>Klikk her for å lese <i>momenter til elevsamtale</i></span>
          </v-tooltip>
          <v-expansion-panel-content>
            <p>Områder vi tenker det kan være naturlig å samtale om</p>
            <ul>
              <li>Hvilken skole/skoler har du vært elev ved?</li>
              <li>Hvorfor har du valgt dette utdanningsprogrammet?</li>
              <li><i>For minoritetsspråklige elever:</i></li>
              <ul>
                <li>Hvis du har opprinnelse fra et annet land enn Norge, hvilket?</li>
                <li>Hvor lenge har du bodd i Norge?</li>
                <li>Kjenner du morsmålet ditt både skriftlig og muntlig?</li>
                <li>Bor du sammen med familien din?</li>
                <li>Har du hatt opplæring i engelsk?</li>
              </ul>
              <li>Hvilke fag syns du at du gjør det godt i?</li>
              <li>Hvilke fag ønsker du å gjøre det bedre i, og hva er spesielt vanskelig i dette eller disse fagene?</li>
              <li>Hva kan skolen og lærerne gjøre for at du skal lykkes?</li>
              <li>Hva tror du at du selv kan gjøre for å oppnå bedre resultat?</li>
              <li>Har du hatt ekstra hjelp i fag tidligere?</li>
              <li>Helsebehov?</li>
              <li>Samtale med helsesøster/rådgiver/PPT</li>
              <li>På hvilken måte holder du kontroll over ditt eget fravær?</li>
              <li>På hvilken måte informerer du lærerne dine når du er borte fra skolen?</li>
              <li>Hvordan er din orden og atferd?</li>
              <li>Er det noe jeg som kontaktlærer bør vite som er av betydning for skolegangen din?</li>
            </ul>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-textarea
        autofocus
        class="mt-5"
        v-if="form.interview === 'done'"
        counter
        label="Notater"
        auto-grow
        value=""
        hint="Fyll inn notater av elevsamtalen"
      ></v-textarea>
      <v-radio-group v-model="form.interview">
        <v-radio color="primary" label="Elevsamtalen er gjennomført" value="done"></v-radio>
        <v-radio color="primary" label="Eleven ønsker ikke samtale" value="dont-want"></v-radio>
      </v-radio-group>
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
          @click="saveInterview"
          text
        >
          <v-icon left>mdi-content-save</v-icon> Lagre
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </form>
</template>

<script>
import PreviewDialog from './PreviewDialog'
import { mapState } from 'vuex'

export default {
  name: 'StudentInterview',
  data: () => ({
    form: {
      interview: 'done',
      template: 'interview'
    }
  }),
  methods: {
    saveInterview () {
      this.$store.commit('SET_STUDENT_DIALOG', false)
      this.$store.dispatch('SAVE_INTERVIEW')
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
  computed: mapState(['student']),
  components: {
    PreviewDialog
  }
}
</script>

<style>
.text {
  font-size: 16px;
}
</style>
