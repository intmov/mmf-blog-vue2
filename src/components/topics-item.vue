<template>
    <div class="card feed">
        <div class="feed-article-content"> <span class="feed-time">{{ item.update_date.slice(0,-3) }}</span><span class="feed-source">来自用户 <span v-text="item.user" class="feed-minor-link"></span></span>
            <!-- <div class="feed-main-link-wrap"><router-link :to="'/article/' + item._id" v-text="item.title" class="feed-main-link"></router-link></div> -->
            <ul>
                <li v-for="item in this.items" :item="item" :key="item._id">
                    <div v-if="item && item.bookStart == item.bookEnd">
                       {{item.catalog}}{{item.bookStart}}{{getVerse(item.verseStart)}}-{{getVerse(item.verseEnd)}},
                      共{{item.chapters}}章
                    </div>
                    <div v-else-if="item">
                       {{item.catalog}}{{item.bookStart}}{{getVerse(item.verseStart)}}-{{item.bookEnd}}{{getVerse(item.verseEnd)}},
                      共{{item.chapters}}章
                    </div>
                </li>
            </ul>
            <div>今日共读了{{totalChapters}}章</div>
            <div class="feed-desc-wrap">
                <div v-text="item.content"></div>
            </div>
        </div>
        <actions v-if="actionVisible" :item="item"></actions>
    </div>
</template>
<script lang="babel" type="text/babel">
import actions from './item-actions.vue'
import {getChapterIndex} from "../utils"
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
    computed:{
        items() {
            const  items = JSON.parse(this.item.items)
            for(const item of items){
                if(item.verseEnd && item.verseStart){
                    if(item.bookStart === item.bookEnd){
                        item.chapters = item.verseEnd[0]-item.verseStart[0]+1
                    }
                    const si = getChapterIndex(item.bookStart, item.verseStart[0])
                    const ei = getChapterIndex(item.bookEnd, item.verseEnd[0])
                    item.chapters =  ei-si+1
                }
            }
            return items
        },
        totalChapters(){
            let total = 0
            for(const item of this.items){
                total += item.chapters
            }
            return total
        }
    },
    methods:{
        getChapters(item){

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

