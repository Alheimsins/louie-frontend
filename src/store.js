import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      active: false,
      message: false,
      type: false
    },
    students: [],
    loading: false
  },
  mutations: {
    SET_STUDENTS: (state, payload) => {
      state.students = payload
    },
    SET_LOADING: (state, payload) => {
      state.loading = payload
    },
    SET_SNACKBAR: (state, { msg, type = 'info' }) => {
      state.snackbar = {
        message: msg,
        type,
        active: true
      }
    }
  },
  actions: {
    GET_STUDENTS: async (context, payload) => {
      try {
        context.commit('SET_LOADING', true)
        const { data } = await Vue.axios.get(`${config.apiUrl}`)
        context.commit('SET_STUDENTS', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    }
  }
})
