<template>
<div id="app">
    <Navigation :backend="backend"></Navigation>
    <transition name="fade" mode="out-in">
        <router-view :key="key" class="router"></router-view>
    </transition>
    <template v-if="!backend">
        <sign-up :show="global.showRegisterModal"></sign-up>
        <sign-in :show="global.showLoginModal"></sign-in>
    </template>
</div>
</template>
<script lang="babel">

import Vue from 'vue'
import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// import $ from 'jquery'

import Calendar from 'vue-calendar-component'


import { mapGetters } from 'vuex'
import NProgress from 'nprogress'
import Navigation from './components/navigation.vue'
import signUp from './components/signup.vue'
import signIn from './components/signin.vue'

Vue.use(Element)
Vue.use(Calendar)

export default {
    computed: {
        ...mapGetters({
            global: 'global/getGlobal'
        }),
        key() {
            return this.$route.path.replace(/\//g, '_')
        },
        backend() {
            return this.$route.path.indexOf('backend') >= 0
        }
    },
    components: {
        Navigation,
        signUp,
        signIn
    },
    watch: {
        'global.progress'(val) {
            if (val === 0) {
                NProgress.set(0)
                NProgress.start()
            } else if (val === 100) {
                NProgress.done()
            } else {
                NProgress.set(val/100)
                NProgress.start()
            }
        }
    }
}
</script>
