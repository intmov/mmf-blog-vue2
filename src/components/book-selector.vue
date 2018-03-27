<template>
    <div>
    <el-dialog
        title="请选择书卷"
        :visible.sync="bookSelectorVisible"
        fullscreen top="5"
        center>
        <grid :cols="6">
            <template v-for="i in bookOptions">
                <grid-item :label="i" :link="i" :select="i === selectBookInner" @onItemClick="onSelectBookClick">
                </grid-item>
            </template>
        </grid>
    </el-dialog>
    <el-dialog
        title="请选择章"
        :visible.sync="chapterSelectorVisible"
        fullscreen top="5"
        center>
        <grid :cols="5">
            <template v-for="i in chapterOptions">
                <grid-item :label="i" :link="i" :select="i === selectChapterInner" @onItemClick="onSelectChapterClick">
                </grid-item>
            </template>
        </grid>
    </el-dialog>
    <el-dialog
        title="请选择节"
        :visible.sync="verseSelectorVisible"
        fullscreen top="5"
        center>
        <grid :cols="5">
            <template v-for="i in verseOptions">
                <grid-item :label="i" :link="i" :select="i === selectVerseInner" @onItemClick="onSelectVerseClick">
                </grid-item>
            </template>
        </grid>
    </el-dialog>
    </div>
</template>

<script>
    import grid from './grid.vue'
    import gridItem from './grid-item.vue'
    import {findBookBySimpleName, testments2} from '../utils'

    export default {
        name: 'book-selector',
        methods: {
            findChapters() {
                return this.currentBook.verseList.length
            },
            findVerses(chapter) {
                return  this.currentBook.verseList[chapter-1]
            },
            onSelectBookClick(book) {
                if(this.selectBookInner !== book){
                    this.selectChapterInner = 1
                    this.selectVerseInner = 1
                }
                this.bookSelectorVisible = false
                this.chapterSelectorVisible = true
                this.currentBook =  findBookBySimpleName(book)
                this.select.book[1] = book
                this.chapterOptions = this.findChapters()
            },
            onSelectChapterClick(chapter) {
                if(this.selectChapterInner !== chapter){
                    this.selectVerseInner = 1
                }
                this.chapterSelectorVisible = false
                this.verseSelectorVisible = true
                this.select.verse[0] = chapter
                this.verseOptions = this.findVerses(chapter)
            },
            onSelectVerseClick(verse) {
                this.verseSelectorVisible = false
                this.select.verse[1] = verse
                this.$emit("on-select-change",this.select)
            },
            init(){
                this.bookOptions = testments2.map(p => {return p.simpleName})
                this.select.book = ['','']
            }
        },
        mounted(){
            this.init()
        },
        watch:{
            visible(val){
                this.bookSelectorVisible = val
            },
            bookSelectorVisible(val){
                //组件内对myResult变更后向外部发送事件通知
                this.$emit("on-visible-change",val)
            },
            selectBook(val){
                this.selectBookInner = val
            },
            selectChapter(val){
                this.selectChapterInner = val
            },
            selectVerse(val){
                this.selectVerseInner = val
            },
        },
        components: {
            grid,gridItem
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            selectBook:{
                type:String,
                default: '创'
            },
            selectChapter:{
                type:Number,
                default: 1
            },
            selectVerse:{
                type:Number,
                default: 1
            }
        },
        data () {
            return {
                bookSelectorVisible: this.visible,
                chapterSelectorVisible: false,
                verseSelectorVisible: false,
                bookOptions: [],
                currentBook:'',
                selectBookInner : '',
                selectChapterInner : 1,
                selectVerseInner : 1,
                select:{
                    book: [],
                    verse: [1,1],
                },
                chapterOptions: [],
                verseOptions:[],
                showVerseSelector: true,
                title:""
            }
        }
    }
</script>
<style lang="less">
</style>
