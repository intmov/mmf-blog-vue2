<template>
    <div class="card feed">
        <div class="feed-article-content"> <span class="feed-time">{{ item.update_date.slice(0,-3) }}</span><span class="feed-source">来自用户 <span v-text="item.user" class="feed-minor-link"></span></span>
            <!-- <div class="feed-main-link-wrap"><router-link :to="'/article/' + item._id" v-text="item.title" class="feed-main-link"></router-link></div> -->
            <ul>
                <li v-for="item in JSON.parse(item.items)" :item="item" :key="item._id">
                    <div v-if="item && item.bookStart == item.bookEnd">
                       {{item.catalog}}{{item.bookStart}}{{getVerse(item.verseStart)}}-{{getVerse(item.verseEnd)}},
                      共{{getChapters(item)}}章
                    </div>
                    <div v-else-if="item">
                       {{item.catalog}}{{item.bookStart}}{{getVerse(item.verseStart)}}-{{item.bookEnd}}{{getVerse(item.verseEnd)}},
                      共{{getChapters(item)}}章
                    </div>
                </li>
            </ul>
            <div class="feed-desc-wrap">
                <div v-text="item.content"></div>
            </div>
        </div>
        <actions v-if="actionVisible" :item="item"></actions>
    </div>
</template>
<script lang="babel">
import actions from './item-actions.vue'
export default {
    name: 'index-item',
    serverCacheKey: props => {
        return `frontend::topics::item::${props.item._id}`
    },
    props: ['item','actionVisible'],
    data () {
        return {
            showMore: false
        }
    },
    methods:{
        getChapters(item){
            if(item.bookStart === item.bookEnd && item.verseEnd && item.verseStart){
                return item.verseEnd[0]-item.verseStart[0]+1
            }
            return '很多'
        },
        getVerse(verse){
            if(verse && verse.length > 0){
                return verse[0]+''+(verse[1]?":"+verse[1]:'')
            }
            return ''
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
    list-style-type: circle;
    margin-left: 40px;
    /* text-align: center; */
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

