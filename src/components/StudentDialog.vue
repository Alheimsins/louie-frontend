<template>
  <v-dialog
    max-width="800"
    v-model="studentDialogVisable"
    :fullscreen="$vuetify.breakpoint.xsOnly"
  >
    <v-card
      color="secondary"
      dark
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
            >
              <v-img
                :src="student.imageUrl || require('@/assets/no-picture.png')"
                lazy-src="require('@/assets/no-picture.png')"
              >
              </v-img>
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

    <v-card :loading="loading">
      <v-card-text>
        <v-flex>
          <v-row>

            <!-- Tabs -->
            <v-tabs
              color="accent"
              light
              v-model="tab"
              active-class="tab-active"
            >

              <!-- Varsel tab -->
              <v-tab href="#tab-1">Varsel</v-tab>

              <!-- Logg tab -->
              <v-tab href="#tab-2" v-if="features.interview">Samtale</v-tab>

              <!-- Notat tab -->
              <v-tab href="#tab-3" v-if="features.notes">Notat</v-tab>

              <!-- Logg tab -->
              <v-tab href="#tab-4">Logg</v-tab>

              <!-- Varsel tab -->
              <v-tab-item value="tab-1">
                <WarningForm></WarningForm>
              </v-tab-item>

              <!-- Samtale tab -->
              <v-tab-item value="tab-2">
                <StudentInterview></StudentInterview>
              </v-tab-item>

              <!-- Notat tab -->
              <v-tab-item value="tab-3">
                <StudentNote></StudentNote>
              </v-tab-item>

              <!-- Logg tab -->
              <v-tab-item value="tab-4">
                <StudentLog></StudentLog>
              </v-tab-item>

            </v-tabs>
          </v-row>
        </v-flex>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import WarningForm from './WarningForm'
import StudentLog from './StudentLog'
import StudentInterview from './StudentInterview'
import StudentNote from './StudentNote'
import config from '../../config'

export default {
  name: 'StudentDialog',
  data: () => ({
    tab: 'tab-1',
    features: {
      notes: config.features.notes,
      interview: config.features.interview
    }
  }),
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
  },
  components: {
    WarningForm,
    StudentLog,
    StudentInterview,
    StudentNote
  },
  watch: {
    studentDialogVisable () {
      this.tab = 'tab-1'
    }
  }
}
</script>

<style>
.v-list-item {
  padding: 0;
}
.dialog-title {
  font-size: 1.25rem;
  text-transform: uppercase;
  font-family: 'Nunito'
}
.tab-active {
  background: #edf8f6;
}
</style>
