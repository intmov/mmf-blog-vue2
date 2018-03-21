<template>
    <div class="main wrap clearfix">
        <div class="main-left">
            <account></account>
        </div>
        <div class="main-right">
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="article-content">
                        <h3 class="about-title">您好，{{form.username}}</h3>
                    </div>
                </div>
                <div class="home-feeds cards-wrap">
                    <el-row style="margin-bottom: 5px;" type="flex" justify="center">
                        <div class="sepline">
                            <span>= = 最近打卡情况 = =</span>
                        </div>
                    </el-row>
                    <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none>
                    <template v-else-if="topics.data.length > 0">
                        <topics-item :actionVisible="true" v-for="item in topics.data" :item="item" :key="item._id"></topics-item>
                        <div class="load-more-wrap"><a v-if="topics.hasNext" @click="loadMore()" href="javascript:;" class="load-more">更多<i class="icon icon-circle-loading"></i></a></div>
                    </template>
                    <topics-item-none v-else>当前没有打卡记录...</topics-item-none>
                </div>
            </div>
            <!--<div class="home-feeds cards-wrap">
                <div class="settings-main card">
                    <div class="settings-main-content">
                        <a-input title="昵称">
                            <input type="text" v-model="form.username" placeholder="昵称" class="base-input" name="username" readonly>
                            <span class="input-info error">昵称</span>
                        </a-input>
                        <a-input title="邮箱">
                            <input type="text" v-model="form.email" placeholder="邮箱" class="base-input" name="email" readonly>
                            <span class="input-info error">邮箱</span>
                        </a-input>
                    </div>
                </div>
            </div>-->
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


const fetchInitialData = async (store, config = { page: 1}) => {
    const {params: {id, key, by}, path} = store.state.route
    const userid = cookies.get('userid')
    if (!userid) {
        store.dispatch('global/showMsg', '请先登录!')
        store.commit('global/showLoginModal', true)
        return
    }
    const base = { ...config, limit: 10, user:userid, id, key, by }
    await store.dispatch('frontend/article/getSelfList', base)
    if (config.page === 1) ssp(path)
}
export default {
    data() {
        return {
            form: {
                username: '',
                email: ''
            }
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
        loadMore(page = this.topics.page + 1) {
            fetchInitialData(this.$store, {page})
        },
        async getUser() {
            const { data: { code, data} } = await api.get('frontend/user/account')
            if (code === 200) {
                this.form.username = data.username
                this.form.email = data.email
            }
        }
    },
    mounted() {
        this.getUser()
        fetchInitialData(this.$store, {page: 1})
    }
}
</script>
