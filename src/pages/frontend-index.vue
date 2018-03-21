<template>
    <div class="main">
        <calendar ref="cal"
        @choseDay="clickDay"
        @isToday="clickTodayMonth"
        @changeMonth="changeMonth"
        :markArray="monthList"
        :isHideOtherday='false'
        ></calendar>
        <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none>
        <div v-else-if="needSign" class="sep">
            <el-row type="flex" justify="center">
                <el-button>
                    <router-link to="/insert" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="el-icon-circle-plus-outline"></i>去打卡</router-link>                <!-- <a href="/frontend/articles/insert" class="nav-link"><span class="text">请打卡</span></a> -->
                </el-button>
            </el-row>
        </div>
        <div v-else-if="canotSign" class="sep"><el-row type="flex" justify="center"><span>这天无法打卡</span></el-row></div>
            <div v-else class="sep" style="background: white;">
                <el-row style="margin-bottom: 5px;" type="flex" justify="center"><span style="margin-top: 5px; margin-right: 40px;">今日已打卡</span> <el-button @click="deletePost" style="margin-top: 2px;"><i class="el-icon-delete"></i>删除</el-button></el-row>
                <div class="sepline" />
                <div>
                    <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none>
                    <template v-else-if="topics.data.length > 0">
                        <topics-item :actionVisible="true" v-for="item in topics.data" v-if="item.username === user" :item="item" :key="item._id"></topics-item>
                    </template>
                </div>
            </div>
        <div>
            <div class="home-feeds cards-wrap">
                <el-row style="margin-bottom: 5px;" type="flex" justify="center">
                    <div class="sepline">
                        <span>= = 所有成员打卡详情 = =</span>
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
    </div>
</template>
<script lang="babel" type="text/babel">
import ls from 'store2'
import api from '~api'
import { mapGetters } from 'vuex'
import topicsItem from '../components/topics-item.vue'
import topicsItemNone from '../components/topics-item-none.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import { ssp } from '../utils'
import metaMixin from '~mixins'
// import api from '~api'
import cookies from 'js-cookie'

import calendar from '../components/calendar.vue'
import moment from 'moment/moment.js'

var now = ''
const dateformat='YYYY-MM-DD'
const fetchInitialData = async (store, config = { page: 1}) => {
    const {params: {id, key, by}, path} = store.state.route
    const username = cookies.get('username')
    if (!username) {
        store.dispatch('global/showMsg', '请先登录!')
        store.commit('global/showLoginModal', true)
        return
    }
    const base = { ...config, limit: 10, date: now, id, key, by }
    await store.dispatch('frontend/article/getArticleList', base)
    if (config.page === 1) ssp(path)
}
export default {
    name: 'frontend-index',
    prefetch: fetchInitialData,
    mixins: [metaMixin],
    components: {
        topicsItem, topicsItemNone, category, trending, calendar
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/article/getArticleList',
            category: 'global/category/getCategoryList',
            trending: 'frontend/article/getTrending',
            monthList: 'frontend/article/getMonthList'
        }),
        needSign () {
            let ret = this.monthList.length <=0
            console.log(this.monthList)
            // console.log(this.monthList.indexOf(parseInt(now.slice(8,10),10)))
            ret = ret || this.monthList.indexOf(parseInt(now.slice(8,10),10))===-1
            ret = ret && now <= moment().format(dateformat)
            ret = ret && now >= moment().subtract(1, 'days').format(dateformat)
            return ret
        },
        canotSign(){
            return (this.monthList.length <= 0 || this.monthList.indexOf(parseInt(now.slice(8,10),10))===-1) && (now > moment().format(dateformat) || now < moment().subtract(1, 'days').format(dateformat))
        }
    },
    data() {
        return {
            // needSign:  return true,
            user: ''
        }
    },
    methods: {
        loadMore(page = this.topics.page + 1) {
            fetchInitialData(this.$store, {page})
        },
        clickTodayMonth(data){
            localStorage.selectDate = data
            now = data
            //this.clickDay(data)
        },
        clickDay(data){
            localStorage.selectDate = data
            // this.$store.commit('global/selectDate', data)
            now = data
            fetchInitialData(this.$store, {page: 1})
            // console.log('click day!'+data+this.needSign)
            this.changeMonth(now)
        },
        changeMonth(data){
            console.log('change month!'+data)
            const base = {limit: 1000, date: moment(data,dateformat).format("YYYY-MM"), user:this.user}
            this.$store.dispatch('frontend/article/getMonthList', base)

        },
        async deletePost(){
            const username2 = cookies.get('userid')
            const { data: { code, message} } = await api.get('backend/article/delete', { date:now, userid:username2 })
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
            }
            fetchInitialData(this.$store,{page:1})
        }
    },
    mounted() {
        this.user = decodeURIComponent(cookies.get('username'))
        fetchInitialData(this.$store, {page: 1})
        this.changeMonth(now)
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store, {page: 1})
        }
    },
    beforeRouteLeave(to, from, next) {
        const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
        const path = from.path
        if (scrollTop) ls.set(path, scrollTop)
        else ls.remove(path)
        next()
    }
}
</script>
<style scoped>
    .main{
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    .sep{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .totalActivity{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .sepline{
        border-top: solid #eee 1px;
    }
</style>
