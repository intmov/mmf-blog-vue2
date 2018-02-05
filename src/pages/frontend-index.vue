<template>
    <div class="main">
        <Calendar ref="cal"
        @choseDay="clickDay"
        @isToday="clickTodayMonth"
        @changeMonth="changeDate"
        :markArray='[20,21]' 
        :isHideOtherday='false'
        ></Calendar>
        <el-row type="flex" justify="center">
            <div v-if="needSign"><el-button>
                <router-link to="/insert" active-class="active" class="side-entry"><i class="icon icon-arrow-right"></i><i class="icon icon-articles"></i>请打卡</router-link>                <!-- <a href="/frontend/articles/insert" class="nav-link"><span class="text">请打卡</span></a> -->
                </el-button>
            </div>
            <div v-else>今日已打卡</div>
        </el-row>
        <div>
            <div class="home-feeds cards-wrap">
                <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none>
                <template v-else-if="topics.data.length > 0">
                    <topics-item v-for="item in topics.data" :item="item" :key="item._id"></topics-item>
                    <div class="load-more-wrap"><a v-if="topics.hasNext" @click="loadMore()" href="javascript:;" class="load-more">更多<i class="icon icon-circle-loading"></i></a></div>
                </template>
                <topics-item-none v-else>当前没有打卡记录...</topics-item-none>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
import ls from 'store2'
import { mapGetters } from 'vuex'
import topicsItem from '../components/topics-item.vue'
import topicsItemNone from '../components/topics-item-none.vue'
import category from '../components/aside-category.vue'
import trending from '../components/aside-trending.vue'
import { ssp } from '../utils'
import metaMixin from '~mixins'
import api from '~api'

// import CalendarComponent from '../components/calendar.vue'


var now = ''
const fetchInitialData = async (store, config = { page: 1}) => {
    const {params: {id, key, by}, path} = store.state.route
    var users=''
    const { data: { code, data} } = await api.get('frontend/user/account')
    if (code === 200) {
        users = data.username
    }
    const base = { ...config, limit: 10, date: now, user: users, id, key, by }
    // store.dispatch('global/category/getCategoryList')
    // store.dispatch('frontend/article/getTrending')
    await store.dispatch('frontend/article/getArticleList', base)
    if (config.page === 1) ssp(path)
}
export default {
    name: 'frontend-index',
    prefetch: fetchInitialData,
    mixins: [metaMixin],
    components: {
        topicsItem, topicsItemNone, category, trending
    },
    computed: {
        ...mapGetters({
            topics: 'frontend/article/getArticleList',
            category: 'global/category/getCategoryList',
            trending: 'frontend/article/getTrending'
        })
    },
    data() {
        return {
            needSign: true,
            user: ''
        }
    },
    methods: {
        loadMore(page = this.topics.page + 1) {
            fetchInitialData(this.$store, {page})
        },
        clickTodayMonth(data){
            this.clickDay(data)
        },
        clickDay(data){
            localStorage.selectDate = data
            // this.$store.commit('global/selectDate', data)
            now = data
            fetchInitialData(this.$store, {page: 1})
            console.log('click day!'+data+this.needSign)
            if(this.topics.data.length>0){
                this.needSign = false
            }else{
                this.needSign = true
            }
        },
        changeDate(data){
            console.log('change month!'+data)
        },
        async getUser() {
            const { data: { code, data} } = await api.get('frontend/user/account')
            if (code === 200) {
                this.user = data.username
            }
        }
    },
    mounted() {
        fetchInitialData(this.$store, {page: 1})
        this.getUser()
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
    },
    metaInfo() {
        var title = 'M.M.F 小屋'
        const {id, key, by} = this.$route.params
        if (id) {
            const obj = this.category.find(item => item._id === id)
            if (obj) {
                title = obj.cate_name + ' - ' + title
            }
        } else if (key) {
            title = '搜索: ' + key + ' - ' + title
        } else if (by) {
            title = '热门 - ' + title
        }
        return {
            title,
            meta: [{ vmid: 'description', name: 'description', content: title }]
        }
    }
}
</script>

<style>
.wh_content_all{
    background-color: white ;
}

.wh_top_changge li {
  color: #111;
}

.wh_jiantou1 {
  border-top: 2px solid #111;
  border-left: 2px solid #111;
}

.wh_jiantou2 {
  border-top: 2px solid #111;
  border-right: 2px solid #111;
}


.wh_is_today {
  width: 34px;
  height: 34px;
  line-height: 34px;
  margin: auto;
  background-color: #eee;
  color: #111;
  border: 1px solid #00ADB5;
  border-radius: 100px;
  text-align: center;
}

.wh_is_mark {
  width: 34px;
  height: 34px;
  line-height: 34px;
  margin: auto;
  border-radius: 100px;
  border: 1px solid #00ADB5;
  color: #00ADB5;
  z-index: 2;
}

.wh_content_item {
  font-size: 15px;
  width: 13.4%;
  padding-bottom: 10.14%;
  text-align: center;
  color: #222;
  position: relative;
}
</style>
