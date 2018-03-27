<template>

    <div class="settings-main card">
        <book-selector :visible="selectDialogVisible" :selectBook="selectBook" :selectChapter="selectChapter" :selectVerse="selectVerse"
                       @on-select-change="bookSelectorChange"
                       @on-visible-change="bookSelectorVisibleChange"></book-selector>
         <el-form ref="form" :model="form"  @submit.prevent="onSubmit" >
            <div class='article-title'>为<span style="color: purple;"> {{form.date}} </span>打卡：</div>
             <el-form-item label="投入时间" label-width="80px" class="setSign">
                 <el-col :span="18">
                    <el-time-picker type="fixed-time"  value-format="HH:mm"  format="HH小时-mm分钟"  placeholder="选择时间" v-model="form.readtime" style="width: 100%;"></el-time-picker>
                </el-col>
             </el-form-item>
             <el-form-item label="读经质量" label-width="80px">
                 <el-col :span="18">
                     <el-rate style="margin-top: 10px;"
                         v-model="form.quality" show-text :texts="quality_text"
                         :colors="['#99A9BF', '#F7BA2A', '#ff8500']">
                     </el-rate>
                 </el-col>
             </el-form-item>
            <el-form-item class="setSign">
                <el-row :span="24" v-for="(item,fidx) of form.items">
                    <el-col :span="6" class="title">
                          <el-select v-model="item.catalog" placeholder="分类">
                            <el-option
                            v-for="item in category"
                            :key="item.value"
                            :label="item.cate_name"
                            :value="item.cate_name">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="7">
                        <el-button @click="clickStartBook(fidx)" style="margin-left:2px;width: 95%">{{item.displayStart}}</el-button>
                    </el-col>
                    <el-col :span="7">
                        <el-button @click="clickEndBook(fidx)" style="width: 95%">{{item.displayEnd}}</el-button>
                    </el-col>
                    <el-col :span='3' type="flex" justify="center">
                        <el-button icon="el-icon-delete" @click.native.prevent="removeItem(item)" title="删除"></el-button>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col :span="6">
                        <el-button type="primary"  @click.native="addItem">添加更多</el-button>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-input :span="20" type="textarea" :rows="5" placeholder="请输入收获或感想：" v-model="form.content"></el-input>

         </el-form>

        <div class="settings-footer clearfix">
             <el-button-group>
                <el-button @click="cancel" class="btn-insert-action">取  消</el-button>
                <el-button @click="insert" class="btn-insert-action" type="primary">发表日记</el-button>
            </el-button-group>
            <!-- <el-dialog title="预览内容" :visible.sync="dialogPreviewVisible" width="85%" center>
                <topics-item :item="form.items2" :actionVisible="false"/>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPreviewVisible = false">取 消</el-button>
                    <el-button type="primary" @click="insert">确 定</el-button>
                </div>
            </el-dialog> -->
            <!-- <a @click="insert" href="javascript:;" class="btn btn-yellow">发表日记</a> -->
        </div>
    </div>
</template>

<script lang="babel" type="text/babel">
// /* global postEditor */
import api from '~api'
import { mapGetters } from 'vuex'
import aInput from '../components/_input.vue'
import {bookOptions, getChapterIndex, testments, testments2} from '../utils'
import topicsItem from '../components/topics-item.vue'
import cookies from 'js-cookie'
import BookSelector from "../components/book-selector"

const fetchInitialData = async (store, config = { limit: 99}) => {
    await store.dispatch('global/category/getCategoryList', config)
}
export default {
    name: 'frontend-insert',
    data() {
        return {
            currentIndex: 0,
            selectBook: '',
            selectChapter: 1,
            selectVerse: 1,
            start: true,
            // selectDialogTitle: '选择书卷',
            // selectDialogOptions: [],
            // selectDialogFlag:'book',
            // selectDialogColumns: 6,
            selectDialogVisible: false,
            quality_text: ['极差', '不好', '一般', '满意', '极好'],
            dialogPreviewVisible: false,
            bookOptions: bookOptions(),
            options:[{
                verseStartOptions: [],
                verseEndOptions: [],
            }],
            form: {
                title: '',
                quality: null,
                category: '',
                content: '',
                readtime: '00:30',
                items: [{
                    catalog: '通读',
                    bookStart: [],
                    bookEnd: [],
                    verseStart:[],
                    verseEnd:[],
                    chapters: "1",
                    displayStart:'开始章节',
                    displayEnd:'结束章节',
                }],
                items2:"",
                readtime2:0,
                userid: '',
                username:'',
                date: localStorage.selectDate,
                chapters: 0,
                meditation: 0
            }
        }
    },
    components: {
        BookSelector,
        aInput, topicsItem
    },
    computed: {
        ...mapGetters({
            category: 'global/category/getCategoryList',
        })
    },
    methods: {
        getChapters(item){
            console.log(item)
            const bookStart = item.bookStart[1]
            const bookEnd = item.bookEnd[1]
            if(item.verseEnd && item.verseStart){
                if(bookStart === bookEnd){
                    return item.verseEnd[0]-item.verseStart[0]+1
                }
                const si = getChapterIndex(bookStart, item.verseStart[0])
                const ei = getChapterIndex(bookEnd, item.verseEnd[0])
                return ei-si+1
            }
        },
        totalChaptersOf(catalog, items){
            let total = 0
            for(const item of items){
                if(item.catalog === catalog){
                    total += item.chapters
                }
            }
            return total
        },
        insertPreview(){
            if (!this.form.readtime || !this.form.quality || !this.form.items || !this.form.items[0].verseStart || !this.form.items[0].verseEnd) {
                this.$store.dispatch('global/showMsg', '必须填写投入时间+读经质量+读经内容')
                return false
            }
            this.form.items2 = []
            var ret = true
            let meditation = 0
            this.form.items.forEach(it => {
                if(!it.bookStart[1] || !it.bookEnd[1]){
                    this.$store.dispatch('global/showMsg', '必须选择所读的书卷名')
                    ret = false
                    return false
                }
                if(!it.verseStart[0] || !it.verseEnd[0]){
                    this.$store.dispatch('global/showMsg', '必须选择所读的章')
                    ret = false
                    return false
                }
                it.chapters = this.getChapters(it)
                if(it.catalog ==='默想' || it.catalog === '灵修'){meditation++}
                this.form.items2.push({
                    catalog:it.catalog,
                    bookStart: it.bookStart[1],
                    bookEnd: it.bookEnd[1],
                    verseStart: it.verseStart,
                    verseEnd: it.verseEnd,
                    chapters: it.chapters
                })
            })

            if(!ret) return ret
            this.form.items2= JSON.stringify(this.form.items2)
            this.form.chapters = this.totalChaptersOf('通读', this.form.items)
            this.form.meditation = meditation
            this.form.userid = decodeURIComponent(cookies.get("userid"))
            this.form.username = decodeURIComponent(cookies.get("username"))
            this.form.readtime2 = parseInt(this.form.readtime.substr(0,2),10)*60+parseInt(this.form.readtime.substr(3,2),10)
            this.dialogPreviewVisible = true
            return true
        },
        async insert() {
            if(!this.insertPreview()) return
            localStorage.lastActivity = JSON.stringify(this.form.items)
            this.form.items=[]

            this.dialogPreviewVisible = false
            const { data: { message, code, data} } = await api.post('backend/article/insert', this.form)
            if (code === 200) {
                this.$store.dispatch('global/showMsg', {
                    type: 'success',
                    content: message
                })
                this.$store.commit('backend/article/insertArticleItem', data)
                await this.$store.dispatch('frontend/article/getArticleList')
                this.$router.push('/')
            }
        },
        cancel(){
            this.$router.go(-1)
        },
        onSubmit() {
            console.log('submit!')
        },
        addItem() {
            var n = this.form.items ? this.form.items.length + 1 : 1
            this.form.items.push({
                catalog: '通读',
                bookStart: [],
                bookEnd: [],
                verseStart:[],
                verseEnd:[],
                chapters: "1",
                displayStart: '开始章节',
                displayEnd: '结束章节',
            })
            this.options.push({
                verseStartOptions: [],
                verseEndOptions: [],
            })
        },
        removeItem(item) {
            var index = this.form.items.indexOf(item)
            this.form.items.splice(index, 1)
        },
        formVerseOptions(book) {
            const chapters = testments()[book][4]
            const sOptions = []
            for (let i = 0; i < chapters.length; i++) {
                const vlen = chapters[i]
                const child = []
                for (let ii = 0; ii < vlen; ii++) {
                    child.push({'value':ii+1, 'label':ii+1})
                }
                sOptions.push({'value':i+1, 'label':i+1, 'children':child})
            }
            return sOptions
        },
        changeSelectedBookStart(idx) {
            this.form.items[idx].bookEnd = this.form.items[idx].bookStart
            this.options[idx].verseStartOptions = this.formVerseOptions(this.form.items[idx].bookStart[1])
            this.changeSelectedBookEnd(idx)
        },
        changeSelectedBookEnd(idx) {
            this.options[idx].verseEndOptions = this.formVerseOptions(this.form.items[idx].bookEnd[1])
        },
        changeSelectedVerseStart(idx) {
            this.form.items[idx].verseEnd = this.form.items[idx].verseStart
        },
        clickStartBook(fidx){
            this.currentIndex = fidx
            this.start = true
            const item = this.form.items[fidx]
            this.selectBook = item.bookStart[1] || '创'
            this.selectChapter = item.verseStart[0] || 1
            this.selectVerse = item.verseStart[1] || 1
            this.selectDialogVisible =true

        },
        clickEndBook(fidx){
            this.currentIndex = fidx
            this.start = false
            const item = this.form.items[fidx]
            this.selectBook = item.bookEnd[1] || '创'
            this.selectChapter = item.verseEnd[0] || 1
            this.selectVerse = item.verseEnd[1] || 1
            this.selectDialogVisible =true
        },
        bookSelectorVisibleChange(val){
            this.selectDialogVisible = val
        },
        bookSelectorChange(val){
            this.selectDialogVisible = false
            if(this.start){
                const item = this.form.items[this.currentIndex]
                item.bookStart = val.book
                item.verseStart = val.verse
                item.displayStart = this.getDisplay(item, true)
            }else{
                const item = this.form.items[this.currentIndex]
                item.bookEnd = val.book
                item.verseEnd = val.verse
                item.displayEnd = this.getDisplay(item, false)
            }
        },
        getDisplay(item, start=true){
            if(start)
                return item.bookStart[1] + item.verseStart[0] +(item.verseStart[1]?":"+ item.verseStart[1]:'')

            return item.bookEnd[1] + item.verseEnd[0] +(item.verseEnd[1]?":"+ item.verseEnd[1]:'')
        },
    },
    mounted() {
        if(localStorage.lastActivity != null){
            const items = JSON.parse(localStorage.lastActivity)
            this.options.pop()
            this.form.items.pop()
            for (const idx in items){
                const item = items[idx]
                this.form.items.push({
                    catalog: item.catalog,
                    bookStart: item.bookEnd,
                    bookEnd: item.bookEnd,
                    verseStart: item.verseEnd,
                    verseEnd: item.verseEnd,
                    chapters: 1,
                    displayStart: this.getDisplay(item, true),
                    displayEnd: this.getDisplay(item, false)
                })
            }
        }
        if (this.category.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>

<style scoped>

.setSign .el-row{line-height: 30px;margin-bottom: 5px;}
.btn-insert-action{ width: 50%;}
li{
    text-indent: 0;
    list-style: none;
}
.settings-main{
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 10px;
}
    .article-title{
        margin-bottom: 10px;
        margin-left: 5px;
    }
</style>
