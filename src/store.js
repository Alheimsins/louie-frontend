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
    student: {},
    loading: false,
    studentDialog: false,
    previewDialog: false,
    pdfFile: false,
    user: {
      username: 'maccyber',
      name: 'Jonas Enge'
    }
  },
  mutations: {
    SET_PDF_FILE: (state, payload) => {
      state.pdfFile = payload
    },
    SET_PREVIEW_DIALOG: (state, payload) => {
      state.previewDialog = payload
    },
    SET_STUDENT_DIALOG: (state, payload) => {
      state.studentDialog = payload
    },
    SET_STUDENT: (state, payload) => {
      state.student = payload
    },
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
    GET_STUDENT: async (context, payload) => {
      try {
        context.commit('SET_LOADING', true)
        const { data } = await Vue.axios.get(`${config.apiUrl}/students/${payload}`)
        context.commit('SET_STUDENT', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    GET_STUDENTS: async (context, payload) => {
      try {
        context.commit('SET_LOADING', true)
        const { data } = await Vue.axios.get(`${config.apiUrl}/students`)
        context.commit('SET_STUDENTS', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    SEND_WARNING: async (context, payload) => {
      context.commit('SET_SNACKBAR', { msg: 'Varsel sent' })
    },
    GENERATE_PREVIEW: async (context, payload) => {
      try {
        const { data } = await Vue.axios.post(`${config.apiUrl}/documents/generate/base64`, payload)
        context.commit('SET_PDF_FILE', data)
        context.commit('SET_PREVIEW_DIALOG', true)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    }
  }
})
