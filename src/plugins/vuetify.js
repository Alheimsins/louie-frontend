import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import config from '../../config'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: config.primary,
        background: config.background,
        secondary: config.secondary,
        accent: config.accent,
        error: config.error,
        info: config.info,
        success: config.success,
        warning: config.warning
      },
      dark: {
        primary: config.primary,
        background: config.background,
        secondary: config.secondary,
        accent: config.accent,
        error: config.error,
        info: config.info,
        success: config.success,
        warning: config.warning
      }
    }
  }
})
