<template >
    <div align="center" class="main">
        <div id="drawing"></div>
    </div>
</template>
<script lang="babel" type="text/babel">
    import SVG from "svg.js"
    import {getChapterIndex, testments2, updateBookOffset} from '../utils'
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
                }],
                colors:['#35acd4', '#35acd4', '#35acd4', '#35acd4', '#35acd4', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#a0b4d9', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#653221', '#35acd4', '#35acd4', '#35acd4', '#35acd4', '#a0b4d9', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#2a5051', '#653221',]
            }
        },
        methods:{
            async fetchInitialData (store, config = { page: 1}) {
                const {params: {id, key, by}, path} = store.state.route
                const username = decodeURIComponent(cookies.get('username'))
                if (!username) {
                    return
                }

                const base = { ...config, limit: 1000, user: id === 'self' ? username:id, id, key, by }
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
            getCoord(center, vlen, thea){
                return [center.x+vlen*Math.sin(thea), center.y+vlen*Math.cos(thea)]
            },
            getCoordXY(center, vlen, thea){
                return {x:center.x+vlen*Math.sin(thea), y:center.y+vlen*Math.cos(thea)}
            },
            drawOneBook(book, center, stickTheta){
                const verseList = book.verseList
                let maxFlowers = 40
                if(verseList.length > 38) maxFlowers = verseList.length+1
                const delta = 2*Math.PI/ maxFlowers
                let thea = delta + stickTheta + Math.PI- verseList.length / maxFlowers * Math.PI

                for(let chapter=0; chapter<verseList.length; chapter++){
                    const verse = verseList[chapter]
                    const vlen = verse
                    const cc= this.colors[book.index-1]

                    let w = 0.3
                    const chapterIndex = book.chapterOffset + chapter +1
                    // console.log(chapterIndex)
                    const findBook = this.readList.find(p => chapterIndex >= p.startIdx && chapterIndex <= p.endIdx)
                    if(findBook){
                        w = 1.5
                    }
                    this.svg.line(center.x, center.y, ...this.getCoord(center, vlen, thea)).stroke({ width: w, color:cc })
                    thea += delta
                }
            },
            drawOneBranch(books, center, stickArgs, maxFlowers){
                const flowers = books[1]-books[0]+2
                const delta = 2*Math.PI/ maxFlowers
                let thea = delta + stickArgs.theta + Math.PI- flowers / maxFlowers * Math.PI
                for(let book=books[0]; book <= books[1]; book++){
                    const vlen = stickArgs.lengths[book-books[0]]
                    const bookCenter = this.getCoordXY(center, vlen, thea)
                    this.svg.line(center.x, center.y, bookCenter.x,bookCenter.y).stroke({ width: 1, color:'#aaa' })
                    this.drawOneBook(testments2[book],bookCenter, thea+Math.PI)
                    let textStartLen = 40
                    if(vlen <= 45)  textStartLen = vlen/2
                    const textStart = this.getCoordXY(center, textStartLen, thea)
                    const textEnd = this.getCoordXY(center, textStartLen+10, thea)
                    var text  = this.svg.text(testments2[book].simpleName).leading(0.5).fill('#aaa')
                        .path(`M ${textStart.x} ${textStart.y}  L ${textEnd.x} ${textEnd.y}`)
                        .font({size: 6,anchor: 'start'})
                    var rect = this.svg.rect(text.bbox().width, text.bbox().height).attr({x:text.bbox().x, y:text.bbox().y}).fill('#ebf0f0')
                    rect.after(text)

                    thea += delta
                }
            },
            drawSecondBranchNew(center){
                const maxFlowers = 5
                const flowers = 6
                const delta = 2*Math.PI/ maxFlowers
                let thea = delta + 0 + Math.PI- flowers / maxFlowers * Math.PI
                const lengths = [120,40,180,60]
                for(let book=0; book < 4; book++){
                    const vlen = lengths[book]
                    const bookCenter = this.getCoordXY(center, vlen, thea)
                    this.svg.line(center.x, center.y, bookCenter.x, bookCenter.y).stroke({ width: 2, color:'#aaa' })
                    if(book === 0){
                        this.drawOneBranch([39,42], bookCenter, {theta: thea+Math.PI, lengths:[80,20,85,40]}, 5)
                    }else if(book ===1){
                        this.drawOneBranch([43,43], bookCenter, {theta: thea+Math.PI, lengths:[20]}, 2)
                    }else if(book ===2){
                        const sticksLengths = [100,140,80,60,80,80,80,80,80,80,80,80,80,80,60,80,80,80,80,80,80]
                        this.drawOneBranch([44,64], bookCenter, {theta: thea+Math.PI, lengths:sticksLengths}, 24)
                    }else if(book ===3){
                        this.drawOneBranch([65,65], bookCenter, {theta: thea+Math.PI, lengths:[20]}, 2)
                    }

                    thea += delta
                }
            },
            drawSecondBranchOld(center){
                const maxFlowers = 5
                const flowers = 6
                const delta = 2*Math.PI/ maxFlowers
                let thea = delta + Math.PI/2- flowers / maxFlowers * Math.PI
                const lengths = [180,200,75,200]
                for(let book=0; book < 4; book++){
                    const vlen = lengths[book]
                    const bookCenter = this.getCoordXY(center, vlen, thea)
                    this.svg.line(center.x, center.y, bookCenter.x, bookCenter.y).stroke({ width: 2, color:'#aaa' })
                    if(book === 0){
                        this.drawOneBranch([0,4], bookCenter, {theta: thea+Math.PI, lengths:[97,80,60,110,60]}, 7)
                    }else if(book ===1){
                        const sticksLengths = [115,70,50,115,80,120,80,135,80,80,55,40]
                        this.drawOneBranch([5,16], bookCenter, {theta: thea+Math.PI, lengths:sticksLengths}, 13)
                    }else if(book ===2){
                        const sticksLengths = [68,100,60,30,30]
                        this.drawOneBranch([17,21], bookCenter, {theta: thea+Math.PI, lengths:sticksLengths}, 7)
                    }else if(book ===3){
                        const sticksLengths = [80,140,60,130,68,50,60,60,60,60,60,60,60,60,60,60,60,60,80]
                        this.drawOneBranch([22,38], bookCenter, {theta: thea+Math.PI, lengths:sticksLengths}, 19)
                    }

                    thea += delta
                }
            },
            drawSvg(){
                this.svg = SVG('drawing').size(550,1100)
                const center = {x: 150, y: 300}
                const center_old = {x:280, y:750}
                const center_cc = {x: 40, y:500}
                this.drawSecondBranchNew(center)
                this.drawSecondBranchOld(center_old)
                this.svg.line(center.x, center.y, center_cc.x, center_cc.y).stroke({ width: 3, color:'#aaa'})
                this.svg.line(center_old.x, center_old.y, center_cc.x, center_cc.y).stroke({ width: 3, color:'#aaa'})

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
        /*max-width: 600px;*/
        margin-left: auto;
        margin-right: auto;
        background-color: #ebf0f0;
    }
</style>
