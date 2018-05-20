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
                    <router-link to="/insert" active-class="active" class="side-entry">
                        <i class="icon icon-arrow-right"></i>
                        <i class="el-icon-circle-plus-outline"></i>去打卡
                    </router-link>
                    <!-- <a href="/frontend/articles/insert" class="nav-link"><span class="text">请打卡</span></a> -->
                </el-button>
            </el-row>
        </div>
        <div v-else-if="canotSign" class="sep"><el-row type="flex" justify="center"><span>这天无法打卡</span></el-row></div>
        <div v-else class="sep" style="background: white;">
            <el-row style="margin-bottom: 5px;" type="flex" justify="center">
                <span style="margin-top: 5px; margin-right: 40px;">今日已打卡</span>
                <el-button @click="deletePost" style="margin-top: 2px;"><i class="el-icon-delete"></i>删除</el-button>
            </el-row>
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
                    <el-col :span="20">
                        <el-select   v-if="group.userGroups && group.userGroups.length > 1"  size="mini" style="width: 80px;" v-model="group.currentUserGroup" placeholder="请选择分组">
                            <el-option v-for="item in group.userGroups" :key="item" :value="item" />
                        </el-select>
                        <span style="margin-left: 5px;">打卡详情 (<span style="color:purple;">{{topics.data.length}}</span>) </span>
                    </el-col>
                    <el-col :span="4" style="text-align: right;">
                        <el-button @click="clickExport" size="mini" >复制</el-button>
                    </el-col>
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
import Vue from 'vue'
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
    // prefetch: fetchInitialData,
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
            // console.log(this.monthList)
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
            user: '',
            userData: {},
            usersInGroup: [],
            group:{
                userGroups:[],
                currentUserGroup:'',
            }
        }
    },
    methods: {
        loadMore(page = this.topics.page + 1) {
            fetchInitialData(this.$store, {page,user_groups:this.group.currentUserGroup})
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
            fetchInitialData(this.$store, {page: 1,user_groups:this.group.currentUserGroup})
            // console.log('click day!'+data+this.needSign)
            this.changeMonth(now)
        },
        changeMonth(data){
            // console.log('change month!'+data)
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
            fetchInitialData(this.$store,{page:1,user_groups:this.group.currentUserGroup})
        },
        async getUserInGroup(){
            const ret = await api.get('frontend/user/group', { user_groups: this.group.currentUserGroup})
            console.log(ret)
            if(ret && ret.data && ret.data.code === 200){
                this.usersInGroup = ret.data.data
            }
        },
        clickExport(){
            let message = `${now}读经情况：\n`
            // console.log(this.topics)
            this.topics.data.map (row => {
                message += `${row.username}：`
                for(const item of JSON.parse(row.items)){
                    let catalog = ''
                    if(item.catalog !=='通读') catalog = item.catalog
                    if(item.bookStart === item.bookEnd){
                        message += `${catalog}${item.bookStart}${this.getVerse(item.verseStart)}-${this.getVerse(item.verseEnd)}、`
                    }else{
                        message += `${catalog}${item.bookStart}${this.getVerse(item.verseStart)}-${item.bookEnd}${this.getVerse(item.verseEnd)}、`
                    }
                }
                if(message.endsWith("、")) message = message.substr(0,message.length-1)
                message += "，共"+row.chapters+"章\n"
            })

            if (this.usersInGroup && this.usersInGroup.length > 0) {
                let hasNone = false
                this.usersInGroup.map(u => {
                    if (this.topics.data.findIndex(row => row.username === u.username) === -1) {
                        if(!hasNone) message +="\n"
                        message += `@${u.username} `
                        hasNone = true
                    }
                })
                if (hasNone) {
                    message += "今日未打卡！请尽快读经！"
                }
            }

            this.$copyText(message).then(e => {
                this.$store.dispatch('global/showMsg',{
                    content: '复制成功',
                    type: 'success'
                })
            }, e => {
                console.error(e)
                this.$store.dispatch('global/showMsg','复制失败')
            })

        },
        getVerse(verse){
            if(verse && verse.length > 0){
                return verse[0]+''+(verse[1]?":"+verse[1]:'')
            }
            return ''
        },
        async getData() {
            const username = cookies.get('username')
            if (!username) {
                this.$store.dispatch('global/showMsg', '请先登录!')
                this.$store.commit('global/showLoginModal', true)
                return
            }
            const { data: { code, data} } = await api.get('frontend/user/account')
            if (code === 200) {
                this.userData = data
                this.user = decodeURIComponent(cookies.get('username'))
                try {
                    this.group.userGroups.splice(0,this.group.userGroups.length)
                    for(const k in data.user_groups.split(';')){
                        this.group.userGroups.push(data.user_groups.split(';')[k])
                    }
                    this.group.currentUserGroup = this.group.userGroups[0]
                }catch(e){
                    console.error(e)
                }
                fetchInitialData(this.$store, {page: 1,user_groups:this.group.currentUserGroup})
                this.changeMonth(now)
                this.getUserInGroup()
            }
        },

    },
    mounted() {
        this.getData()

    },
    // watch: {
    //     '$route'() {
    //         fetchInitialData(this.$store, {page: 1,user_groups:this.group.currentUserGroup})
    //     }
    // },
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
