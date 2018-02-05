import toastr from 'toastr'
import {inBrowser} from '~utils'

toastr.options.positionClass = 'toast-top-center'
const state = {
    loading: false,
    progress: 0,
    showLoginModal: false,
    showRegisterModal: false,
    selectDate:''
}

const actions = {
    ['gProgress']({commit}, payload) {
        commit('progress', payload)
    },
    ['showMsg'](store, config) {
        let content, type
        if (typeof config === 'string') {
            content = config
            type = 'error'
        } else {
            content = config.content
            type = config.type
        }
        if (inBrowser) toastr[type](content)
    },
    ['hideMsg']() {
        toastr.clear()
    },
    ['selectDate']({ commit }, payload) {
        commit('selectDate', payload)
    }
}

const mutations = {
    ['progress'](state, payload) {
        state.progress = payload
    },
    ['selectDate'](state, payload) {
        state.selectDate = payload
    },
    ['showLoginModal'](state, payload) {
        state.showLoginModal = payload
    },
    ['showRegisterModal'](state, payload) {
        state.showRegisterModal = payload
    }
}

const getters = {
    ['getGlobal'](state) {
        return state
    }
}

export default {
    actions,
    state,
    mutations,
    getters
}
