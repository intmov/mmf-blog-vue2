<template>

    <div class="settings-main card">
         <el-form ref="form" :model="form"  @submit.prevent="onSubmit" >
            <div class='article-title'>为{{form.date}}打卡：</div>
             <el-form-item label="投入时间" label-width="80px" class="setSign">
                 <el-col :span="11">
                    <el-time-picker type="fixed-time"  value-format="HH:mm"  format="HH小时-mm分钟"  placeholder="选择时间" v-model="form.readtime" style="width: 100%;"></el-time-picker>
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
                        <el-cascader
                           :options="bookOptions"
                            :show-all-levels="false"
                            v-model="item.bookStart"
                            @change="changeSelectedBookStart(fidx)"
                        ></el-cascader>
                        <el-cascader
                           :options="options[fidx].verseStartOptions"
                            v-model="item.verseStart"
                            @change="changeSelectedVerseStart(fidx)"
                            placeholder="开始章节"
                            change-on-select
                            separator=":"
                        ></el-cascader>
                        <!-- <el-input v-model="item.verseStart"  placeholder="开始章节" size="large"></el-input> -->
                    </el-col>
                    <el-col :span="7">
                           <el-cascader
                           :options="bookOptions"
                            :show-all-levels="false"
                            v-model="item.bookEnd"
                            @change="changeSelectedBookEnd(fidx)"
                        ></el-cascader>
                        <el-cascader
                           :options="options[fidx].verseEndOptions"
                            v-model="item.verseEnd"
                            placeholder="结束章节"
                            change-on-select
                            separator=":"
                        ></el-cascader>
                        <!-- <el-input v-model="item.verseEnd"  placeholder="结束章节" size="large"></el-input> -->
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

            <el-input :span="20" type="textarea" :rows="6" placeholder="请输入收获或感想：" v-model="form.content"></el-input>

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

<script lang="babel">
// /* global postEditor */
import api from '~api'
import { mapGetters } from 'vuex'
import aInput from '../components/_input.vue'
import { bookOptions, selectDate, testments } from '../utils'
import topicsItem from '../components/topics-item.vue'

const fetchInitialData = async (store, config = { limit: 99}) => {
    await store.dispatch('global/category/getCategoryList', config)
}
export default {
    name: 'frontend-insert',
    data() {
        return {
            dialogPreviewVisible: false,
            bookOptions: bookOptions(),
            options:[{
                verseStartOptions: [],
                verseEndOptions: [],
            }],
            form: {
                title: '',
                category: '',
                content: '',
                readtime: '00:30',
                items: [{
                    catalog: '通读',
                    bookStart: [],
                    bookEnd: [],
                    verseStart:[],
                    verseEnd:[],
                    chapters: "1"},
                ],
                items2:"",
                user: '',
                date: localStorage.selectDate,
            }
        }
    },
    components: {
        aInput, topicsItem
    },
    computed: {
        ...mapGetters({
            category: 'global/category/getCategoryList',
            // selectDate:'global/selectDate',
        })
    },
    methods: {
        insertPreview(){
            if (!this.form.readtime || !this.form.items || !this.form.items[0].verseStart || !this.form.items[0].verseEnd) {
                this.$store.dispatch('global/showMsg', '必须填写投入时间和读经内容')
                return false
            }
            this.form.items2 = []
            var ret = true
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
            this.dialogPreviewVisible = true
            return true
        },
        async insert() {
            if(!this.insertPreview()) return
            this.form.items=[]
            this.dialogPreviewVisible = false
            // this.form.items2= this.form.items.map(t => t.catalog+"+"+ t.start+"+"+t.end).join("|")
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
        async getUser() {
            const { data: { code, data} } = await api.get('frontend/user/account')
            if (code === 200) {
                this.form.user = data.username
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
                chapters: "1"
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
            // console.log(this.form.items[idx].verseEnd[0], this.form.items[idx].verseEnd[1])
        }
    },
    mounted() {
        this.getUser()
        if (this.category.length <= 0) {
            fetchInitialData(this.$store)
        }
    }
}
</script>

<style scoped>
/* .setSign el-form-item{
    font-size: 15px;
} */
.setSign .el-row{line-height: 40px;margin-bottom: 5px;}
.btn-insert-action{ width: 50%;}
li{
    text-indent: 0%;
    list-style: none;
}
</style>
