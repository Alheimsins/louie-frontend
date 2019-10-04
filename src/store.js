import Vue from 'vue'
import Vuex from 'vuex'
import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import config from '../config'
import getData from './lib/get-data'
import generateTemplate from './lib/generate-template-data'

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
    groups: [],
    documents: [],
    loading: false,
    studentDialog: false,
    previewDialog: false,
    pdfFile: false
  },
  getters: {
    getPdfFile: ({ pdfFile }) => {
      /* eslint-env browser */
      if (!pdfFile) return
      return new Uint8Array(atob(pdfFile).split('').map(c => c.charCodeAt(0)))
    }
  },
  mutations: {
    SET_PDF_FILE: (state, payload) => {
      state.pdfFile = payload
    },
    SET_PREVIEW_DIALOG: (state, payload) => {
      state.previewDialog = payload
      if (!payload) state.pdfFile = false
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
    SET_GROUPS: (state, payload) => {
      state.groups = payload
    },
    SET_DOCUMENTS: (state, payload) => {
      state.documents = payload
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
        const { data } = await getData(`/students/${payload}`)
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
        const { data } = await getData('/students')
        context.commit('SET_STUDENTS', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    GET_GROUPS: async (context, payload) => {
      try {
        context.commit('SET_LOADING', true)
        const { data } = await getData('/groups')
        context.commit('SET_GROUPS', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    GET_DOCUMENTS: async (context, payload) => {
      try {
        context.commit('SET_LOADING', true)
        // TODO: Fix loop
        // const { data } = await getData(`/students/bolb1/documents`)
        const data = [
          {
            date: '26.09.19',
            type: 'Varselbrev fag',
            fag: 'Spansk I+II',
            term: '1. termin',
            sentByName: 'Demo User'
          },
          {
            date: '25.09.19',
            type: 'Varselbrev fag',
            fag: 'Engelsk',
            term: '1. termin',
            sentByName: 'Demo User'
          },
          {
            date: '20.09.19',
            type: 'Varselbrev orden',
            term: '1. termin',
            sentByName: 'Demo User'
          },
          {
            date: '01.09.19',
            type: 'Notat',
            sentByName: 'Demo User'
          },
          {
            date: '01.09.19',
            type: 'Elevsamtale',
            sentByName: 'Demo User'
          }
        ]
        context.commit('SET_DOCUMENTS', data)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    },
    SEND_WARNING: async (context, payload) => {
      context.commit('SET_SNACKBAR', { msg: 'Varsel sent' })
    },
    SAVE_INTERVIEW: async (context, payload) => {
      context.commit('SET_SNACKBAR', { msg: 'Elevsamtale lagret' })
    },
    SAVE_NOTE: async (context, payload) => {
      context.commit('SET_SNACKBAR', { msg: 'Notat lagret' })
    },
    GENERATE_PREVIEW: async (context, payload) => {
      try {
        context.commit('SET_LOADING', true)
        const previewTemplate = generateTemplate({ ...payload, preview: true })
        const { data } = await getData('/documents/generate/base64', previewTemplate)
        context.commit('SET_PDF_FILE', data)
        context.commit('SET_PREVIEW_DIALOG', true)
        context.commit('SET_LOADING', false)
      } catch (error) {
        context.commit('SET_SNACKBAR', { msg: error.message, type: 'error' })
        context.commit('SET_LOADING', false)
      }
    }
  },
  modules: {
    oidcStore: vuexOidcCreateStoreModule(config.auth, { namespaced: true })
  }
})
