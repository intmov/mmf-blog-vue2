<template>
    <nav class="global-nav">
        <div class="wrap clearfix">
            <div class="left-part"><a href="/" exact class="logo-link"><span class="hidden">M.M.F 小屋</span></a>
                <div class="main-nav">
                    <a href="/" class="nav-link"><i class="icon icon-nav-home"></i><span class="text">首页</span></a>
                    <a href="/trending/visit" class="nav-link"><i class="icon icon-nav-explore"></i><span class="text">统计</span></a>
                    <a href="/about" class="nav-link"><i class="icon icon-nav-features"></i><span class="text">关于</span></a>
                    <a v-if="isLogin" href="/user/account" class="nav-link"><i class="icon icon-nav-features"></i><span class="text">用户</span></a>
                    <a v-else href="javascript:;" class="nav-link" @click="login"><i class="icon icon-nav-features"></i><span class="text">登陆</span></a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="babel">
import cookies from 'js-cookie'
export default {
    props: ['backend'],
    data() {
        return {
            isLogin: cookies.get('user')
        }
    },
    methods: {
        login() {
            this.$store.commit('global/showLoginModal', true)
        },
        search(e) {
            var qs = e.target.value
            if (qs === "") {
                return false
            }
            this.$router.replace('/search/' + qs)
        }
    }
}
</script>
