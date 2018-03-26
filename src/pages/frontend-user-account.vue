<template>
    <div class="main">
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="article-content">
                        <h3 class="about-title" v-if="isSelf">您好，{{form.username}}
                            <div style="float: right">
                                <el-button @click="changePassword"><i class="el-icon-edit-outline"></i> 密码</el-button>
                                <el-button @click="handleLogout"><i class="el-icon-upload2"></i> 登出</el-button>
                            </div>
                        </h3>
                        <h3 class="about-title" v-else>欢迎来到 {{$route.params.id}} 的空间 </h3>
                        <div style="color: #aaa;" v-if="topics.data.length > 0">累计打卡 <span style="color: purple">{{topics.total}}</span> 次
                            <a style="margin-left: 10px" :href="'/svg/'+$route.params.id">   统计图表</a>
                        </div>

                    </div>
                </div>
            </div>
            <div class="home-feeds cards-wrap">
                <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none>
                <template v-else-if="topics.data.length > 0">
                    <topics-item :actionVisible="true" :selfView="true" v-for="item in topics.data" :item="item" :key="item._id"></topics-item>
                    <div class="load-more-wrap"><a v-if="topics.hasNext" @click="loadMore()" href="javascript:;" class="load-more">更多<i class="icon icon-circle-loading"></i></a></div>
                </template>
                <topics-item-none v-else>当前没有打卡记录...</topics-item-none>
            </div>

        </div>
</template>

<script lang="babel" type="text/babel">
import account from '../components/aside-account.vue'
import aInput from '../components/_input.vue'
import api from '~api'
import { mapGetters } from 'vuex'
import topicsItem from '../components/topics-item.vue'
import topicsItemNone from '../components/topics-item-none.vue'
import { ssp } from '../utils'
import cookies from 'js-cookie'


export default {
    data() {
        return {
            form: {
                username: '',
                userid: '',
                email: ''
            },
            isSelf: true,
        }
    },
    components: {
        account,
        aInput,
        topicsItem,
        topicsItemNone
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/article/getSelfList',
        })
    },
    methods: {
        async fetchInitialData (store, config = { page: 1}) {
            const {params: {id, key, by}, path} = store.state.route
            const username = decodeURIComponent(cookies.get('username'))
            if (!username) {
                store.dispatch('global/showMsg', '请先登录!')
                store.commit('global/showLoginModal', true)
                return
            }

            this.isSelf = username === id || id === 'self'
            const base = { ...config, limit: 10, user: this.isSelf ? username : id, id, key, by }
            await store.dispatch('frontend/article/getSelfList', base)
            if (config.page === 1) ssp(path)
        },

        loadMore(page = this.topics.page + 1) {
            this.fetchInitialData(this.$store, {page})
        },
        async handleLogout() {
            await api.post('frontend/user/logout', {})
            window.location.href = '/'
        },
        async getUser() {
            const { data: { code, data} } = await api.get('frontend/user/account')
            if (code === 200) {
                this.form.username = data.username
                this.form.userid = data.userid
                this.form.email = data.email
            }
        },
        changePassword(){
            this.$router.push("/user/password")
        }
    },
    mounted() {
        this.getUser()
        this.fetchInitialData(this.$store, {page: 1})
    }
}
</script>
<style scoped>
    .main{
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
</style>
