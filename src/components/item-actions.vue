<template>
    <div class="actions-wrap">
        <a @click="like" href="javascript:;" class="action-item" :class="item.like_status ? 'active' : ''"><i class="icon" :class="item.like_status ? 'icon-action-voteup-active' : 'icon-action-voteup'"></i><span class="text">{{ item.like }} 赞</span></a>
        <a href="javascript:;" class="action-item"><i class="icon icon-action-comment"></i><span class="text">{{ item.chapters }} 章</span></a>
        <a href="javascript:;" class="action-item action-item-fav"><i class="icon icon-action-fav"></i><span class="text"> {{item.readtime}}分钟 </span></a>
        <a @click="doCopy" href="javascript:;" class="action-item"><i class="icon icon-action-share"></i><span class="text">复制</span></a>
    </div>
</template>
<script lang="babel" type="text/babel">
import cookies from 'js-cookie'
import api from '~api'
export default {
    name: 'item-actions',
    serverCacheKey: props => {
        return `frontend::topics::item::actions::${props.item._id}`
    },
    props: ['item'],
    methods: {
        getVerse(verse){
            if(verse && verse.length > 0){
                return verse[0]+''+(verse[1]?":"+verse[1]:'')
            }
            return ''
        },
        async like() {
            const username = cookies.get('user')
            if (!username) {
                this.$store.dispatch('global/showMsg', '请先登录!')
                this.$store.commit('global/showLoginModal', true)
                return
            }
            let url = 'frontend/like'
            if (this.item.like_status) url = 'frontend/unlike'
            const { data: {code, message} } = await api.get(url, { id: this.item._id })
            if (code === 200) {
                this.$store.commit('frontend/article/modifyLikeStatus', {id: this.item._id, status: !this.item.like_status})
                this.$store.dispatch('global/showMsg', {
                    content: message,
                    type: 'success'
                })
            }
        },
        doCopy(){
            let message = ""
            for(const item of JSON.parse(this.item.items)){
                let catalog = ''
                if(item.catalog !=='通读') catalog = item.catalog
                if(item.bookStart === item.bookEnd){
                    message += `${catalog}${item.bookStart}${this.getVerse(item.verseStart)}-${this.getVerse(item.verseEnd)} `
                }else{
                    message += `${catalog}${item.bookStart}${this.getVerse(item.verseStart)}-${item.bookEnd}${this.getVerse(item.verseEnd)} `
                }
            }

            message += "共"+this.item.chapters+"章"

            this.$copyText(message).then(e => {
                this.$store.dispatch('global/showMsg',{
                    content: '复制成功',
                    type: 'success'
                })
            }, e => {
                this.$store.dispatch('global/showMsg','复制失败')
            })
        }
    }
}
</script>
