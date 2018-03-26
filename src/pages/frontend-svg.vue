<template >
    <div align="center">
        <div id="drawing"></div>
    </div>
</template>
<script lang="babel" type="text/babel">
    import SVG from "svg.js"
    import {getChapterIndex, getVerseIndex, testments2, updateBookOffset} from '../utils'
    import cookies from 'js-cookie'
    import api from '~api'

    export default {
        name: 'frontend-svg',
        data() {
            return {
                svg: null,
                readList: [{
                    bookStart: ['','使徒行传'],
                    bookEnd: ['','使徒行传'],
                    verseStart:[1,1],
                    verseEnd:[2,5],
                    startIdx: 0,
                    endIdx: 0
                }]
            }
        },
        methods:{
            async fetchInitialData (store, config = { page: 1}) {
                const {params: {id, key, by}, path} = store.state.route
                const username = decodeURIComponent(cookies.get('username'))
                if (!username) {
                    store.dispatch('global/showMsg', '请先登录!')
                    store.commit('global/showLoginModal', true)
                    return
                }

                this.isSelf = username === id || id === 'self'
                const base = { ...config, limit: 1000, user: username, id, key, by }
                const { data: { data, code} } = await api.get('frontend/article/list', base)
                if (code === 200) {
                    this.readList = []
                    for(const item of data.list){

                        JSON.parse(item.items).map ( p => {
                            const si = getChapterIndex(p.bookStart, p.verseStart[0])
                            const ei = getChapterIndex(p.bookEnd, p.verseEnd[0])
                            this.readList.push({...p, startIdx:si, endIdx: ei})
                        })
                    }
                }else{
                    this.readList = []
                }

                // console.log(this.readList)
                this.drawSvg()

            },
            drawOneBook(book, center, stickTheta){
                const verseList = book.verseList
                const maxFlowers = 40
                const delta = 2*Math.PI/ maxFlowers
                let thea = delta + stickTheta + Math.PI- verseList.length / maxFlowers * Math.PI

                // this.svg.line(center.x, center.y, center.x+stickCenter.x, center.x+stickCenter.y).stroke({ width: 1, color: 'red' })

                const colors = ['#35acd4','#a0b4d9','#2a5051','#653221']
                // console.log(findBook)
                // console.log(this.readList)
                for(let chapter=0; chapter<verseList.length; chapter++){
                    const verse = verseList[chapter]
                    const vlen = verse
                    let cc= colors[2]
                    if(book.index < 44) cc= colors[0]
                    else if(book.index === 44) cc= colors[1]
                    else if(book.index === 66) cc= colors[3]
                    // this.svg.text()
                    let w = 0.3
                    const chapterIndex = book.chapterOffset + chapter +1
                    // console.log(chapterIndex)
                    const findBook = this.readList.find(p => chapterIndex >= p.startIdx && chapterIndex <= p.endIdx)
                    if(findBook){
                        w = 1.5
                    }
                    this.svg.line(center.x, center.y, center.x+vlen*Math.sin(thea), center.y+vlen*Math.cos(thea)).stroke({ width: w, color:cc })
                    thea += delta
                }
            },
            drawOneBranch(books, center, stickArgs, maxFlowers){
                const flowers = books[1]-books[0]+2
                const delta = 2*Math.PI/ maxFlowers
                let thea = delta + stickArgs.theta + Math.PI- flowers / maxFlowers * Math.PI
                for(let book=books[0]; book <= books[1]; book++){
                    const vlen = stickArgs.lengths[book-books[0]]
                    const bookCenter = { x: center.x+vlen*Math.sin(thea), y: center.y+vlen*Math.cos(thea) }
                    this.svg.line(center.x, center.y, bookCenter.x, bookCenter.y).stroke({ width: 1, color:'#aaa' })
                    this.drawOneBook(testments2[book],bookCenter, thea+Math.PI)
                    thea += delta
                }
            },
            drawSecondBranch(center){
                const maxFlowers = 5
                const flowers = 6
                const delta = 2*Math.PI/ maxFlowers
                let thea = delta + 0 + Math.PI- flowers / maxFlowers * Math.PI
                const lengths = [120,60,180,80]
                for(let book=0; book < 4; book++){
                    const vlen = lengths[book]
                    const bookCenter = { x: center.x+vlen*Math.sin(thea), y: center.y+vlen*Math.cos(thea) }
                    this.svg.line(center.x, center.y, bookCenter.x, bookCenter.y).stroke({ width: 2, color:'#aaa' })
                    if(book === 0){
                        this.drawOneBranch([39,42], bookCenter, {theta: thea+Math.PI, lengths:[80,20,85,40]}, 5)
                    }else if(book ===1){
                        this.drawOneBranch([43,43], bookCenter, {theta: thea+Math.PI, lengths:[0]}, 2)
                    }else if(book ===2){
                        const sticksLengths = [100,140,80,60,80,80,80,80,80,80,80,80,80,80,60,80,80,80,80,80,80]
                        this.drawOneBranch([44,64], bookCenter, {theta: thea+Math.PI, lengths:sticksLengths}, 24)
                    }else if(book ===3){
                        this.drawOneBranch([65,65], bookCenter, {theta: thea+Math.PI, lengths:[0]}, 2)
                    }

                    thea += delta
                }
            },
            drawSvg(){
                this.svg = SVG('drawing').size(600,600)
                const center = {x: 150, y: 300}
                this.drawSecondBranch(center)
                this.svg.line(center.x, center.y, center.x-50, center.y+80).stroke({ width: 2, color:'#aaa'})
                //180,50,240,100
                // this.drawOneBranch([39,42], {x:500, y:100}, {theta: Math.PI/4, lengths:[80,20,85,40]}, 5)
                //
                // this.drawOneBook(testments2[43],{x: 500, y:200}, Math.PI/2)
                // this.drawOneBook(testments2[65],{x: 200, y:200}, Math.PI/2)
                //
                // this.drawOneBook(testments2[39],{x: 200, y:200}, Math.PI/2)
                // this.drawOneBook(testments2[40],{x: 100, y:300}, Math.PI/2)
                // this.drawOneBook(testments2[41],{x: 400, y:400}, Math.PI/2)
                // this.drawOneBook(testments2[42],{x: 400, y:400}, Math.PI/2)

            }
        },
        mounted() {
            updateBookOffset()
            this.fetchInitialData(this.$store)
            // this.drawSvg()
        }
    }
</script>
<style scoped>
    .main{
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        background-color: white;
    }
</style>
