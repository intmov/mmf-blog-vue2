<template>
    <div class="card feed">
        <div class="feed-article-content"> <span class="feed-time">{{ item.update_date }}</span><span class="feed-source">来自用户 <router-link :to="'/user/account'" v-text="item.user" class="feed-minor-link"></router-link></span>
            <!-- <div class="feed-main-link-wrap"><router-link :to="'/article/' + item._id" v-text="item.title" class="feed-main-link"></router-link></div> -->
            <ul>
                <li v-for="item in JSON.parse(item.items)" :item="item" :key="item._id">
                    {{item.catalog}} - {{item.start}}-{{item.end}}, 共{{item.chapters}}章
                </li>
            </ul>
            <div>{{item.items2}}</div>
            <div class="feed-desc-wrap">
                <div v-text="item.content"></div>
            </div>
        </div>
        <actions :item="item"></actions>
    </div>
</template>
<script lang="babel">
import actions from './item-actions.vue'
export default {
    name: 'index-item',
    serverCacheKey: props => {
        return `frontend::topics::item::${props.item._id}`
    },
    props: ['item'],
    data () {
        return {
            showMore: false
        }
    },
    components: {
        actions
    }
}
</script>
<style>
ul li{
    list-style: circle;
    list-style-type: square;
    text-align: center;
/* background:#CCC; */
}
ul{
    margin-top: 10px;
    margin-bottom: 10px;
}
.feed-desc-wrap{
    color: #666;
    margin-left: 10px;
}
</style>

