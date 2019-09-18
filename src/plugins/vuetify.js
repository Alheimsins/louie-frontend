import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import config from '../../config'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: { ...config.colors },
      dark: { ...config.colors }
    }
  }
})
