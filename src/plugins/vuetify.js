import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#a2ddcf',
        background: '#f7f7f7',
        secondary: '#F47F97',
        accent: '#6ac4ae',
        error: '#e30438',
        info: '#00b1c7',
        success: '#4CAF50',
        warning: '#FFC107'
      },
      dark: {
        primary: '#a2ddcf',
        background: '#f7f7f7',
        secondary: '#F47F97',
        accent: '#6ac4ae',
        error: '#e30438',
        info: '#00b1c7',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  }
})
