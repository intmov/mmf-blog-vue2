import api from '~api'

const state = {
    lists: {
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    },
    item: {
        data: {},
        path: '',
        isLoad: false
    },
    trending: [],
    monthList: [],
    selfList:{
        data: [],
        hasNext: 0,
        page: 1,
        path: ''
    }
}

const actions = {
    async ['getArticleList']({commit, state, rootState: {global, route: { fullPath }}}, config) {
        const path = fullPath
        // if (state.lists.data.length > 0 && path === state.lists.path && config.page === 1) {
        //     global.progress = 100
        //     return
        // }
        // console.log(config)
        if(!config) return
        const { data: { data, code} } = await api.get('frontend/article/list', {...config, cache: true})
        // console.log(data)
        if (data && code === 200) {
            commit('receiveArticleList', {
                ...config,
                ...data,
                path
            })
        }
    },
    async ['getArticleItem']({ commit, state, rootState: {route: { path, params: { id }}} }) {
        if (path === state.item.path) {
            global.progress = 100
            return
        }
        const { data: { data, code} } = await api.get('frontend/article/item', { id, markdown: 1, cache: true })
        if (data && code === 200) {
            commit('receiveArticleItem', {
                data,
                path
            })
        }
    },
    async ['getTrending']({ commit, state }) {
        if (state.trending.length) return
        const { data: { data, code} } = await api.get('frontend/trending', { cache: true})
        if (data && code === 200) {
            commit('receiveTrending', data)
        }
    },
    async ['getMonthList']({ commit, state, rootState: { global, route: { fullPath } } }, config ) {
        const path = fullPath
        console.log('monthlist',config)
        const { data: { data, code } } = await api.get('frontend/article/list', { ...config, cache: false })
        // console.log(data)
        if (data && code === 200) {
            commit('receiveMonthList', {
                ...config,
                ...data,
                path
            })
        }
    },
    async ['getSelfList']({ commit, state, rootState: { global, route: { fullPath } } }, config) {
        const path = fullPath
        if(!config) return
        const { data: { data, code } } = await api.get('frontend/article/list', { ...config, cache: false })
        // console.log(data)
        if (data && code === 200) {
            commit('receiveSelfList', {
                ...config,
                ...data,
                path
            })
        }
    }

}

const mutations = {
    ['receiveArticleList'](state, {list, hasNext, hasPrev, page, path}) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.lists.data.concat(list)
        }
        state.lists = {
            data: list, hasNext, hasPrev, page, path
        }
    },
    ['receiveArticleItem'](state, {data, path}) {
        state.item = {
            data, path, isLoad: true
        }
    },
    ['receiveTrending'](state, data) {
        state.trending = data.list
    },
    ['receiveMonthList'](state, { list, hasNext, hasPrev, page, path }) {
        const retlist = []
        for (let i = 0; i < list.length; i++) {
            const element = list[i]
            if (element && element.creat_date && element.creat_date.split('-')){
                const ret = element.creat_date.split('-')[2]
                if(ret){
                    retlist.push(parseInt(ret, 10))
                }
            }
        }
        // console.log(retlist)
        state.monthList = retlist
    },
    ['receiveSelfList'](state, { list, hasNext, hasPrev, page, path }) {
        if (page === 1) {
            list = [].concat(list)
        } else {
            list = state.selfList.data.concat(list)
        }
        state.selfList = {
            data: list, hasNext, hasPrev, page, path
        }
    },
    ['modifyLikeStatus'](state, {id, status}) {
        if (state.item.data._id === id) {
            if (status) state.item.data.like++
            else  state.item.data.like--
            state.item.data.like_status = status
        }
        const obj = state.lists.data.find(item => item._id === id)
        if (obj) {
            if (status) obj.like++
            else  obj.like--
            obj.like_status = status
        }
    }
}

const getters = {
    ['getArticleList'](state) {
        return state.lists
    },
    ['getArticleItem'](state) {
        return state.item
    },
    ['getTrending'](state) {
        return state.trending
    },
    ['getMonthList'](state) {
        return state.monthList
    },
    ['getSelfList'](state) {
        return state.selfList
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
