<template>
    
    <div class="settings-main card">
         <el-form ref="form" :model="form"  @submit.prevent="onSubmit" >
            <div class='article-title'>发表日记</div>
             <el-form-item label="投入时间" label-width="80px" class="setSign">
                 <el-col :span="11">
                    <el-time-picker type="fixed-time"  value-format="HH:mm"  format="HH小时-mm分钟"  placeholder="选择时间" v-model="form.readtime" style="width: 100%;"></el-time-picker>
                </el-col>
             </el-form-item>
            <el-form-item class="setSign">
                <el-row :span="24" v-for="item of form.items">
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
                        ></el-cascader>

                        <el-input v-model="item.start"  placeholder="开始章节" size="large"></el-input>
                    </el-col>
                    <el-col :span="7">
                           <el-cascader 
                           :options="bookOptions" 
                            :show-all-levels="false"
                        ></el-cascader>
                        <el-input v-model="item.end"  placeholder="结束章节" size="large"></el-input>
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
            <!-- <a @click="insert" href="javascript:;" class="btn btn-yellow">发表日记</a> -->
        </div>
    </div>
</template>

<script lang="babel">
// /* global postEditor */
import api from '~api'
import { mapGetters } from 'vuex'
import aInput from '../components/_input.vue'
import { bookOptions, selectDate } from '../utils'


const fetchInitialData = async (store, config = { limit: 99}) => {
    await store.dispatch('global/category/getCategoryList', config)
}
export default {
    name: 'frontend-insert',
    data() {
        return {
            bookOptions: bookOptions(),
            form: {
                title: '',
                category: '',
                content: '',
                readtime: '00:30',
                items: [
                    {catalog: '通读', start: "", end: "", chapters: "1"},
                ],
                items2:"",
                user: '',
                date:'',
            }
        }
    },
    components: {
        aInput
    },
    computed: {
        ...mapGetters({
            category: 'global/category/getCategoryList',
            // selectDate:'global/selectDate',
        })
    },
    methods: {
        async insert() {
            if (!this.form.readtime || !this.form.items || !this.form.items[0].start || !this.form.items[0].end) {
                this.$store.dispatch('global/showMsg', '必须填写投入时间和读经内容')
                return
            }
            this.form.items2= JSON.stringify(this.form.items)
            // localStorage.selectDate
            this.form.date = localStorage.selectDate
            console.log(this.form)
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
            this.form.items.push({catalog: '通读', start: "", end: ""})
        },
        removeItem(item) {
            var index = this.form.items.indexOf(item)
            this.form.items.splice(index, 1)
        },
        handleCascaderItemChange(){

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
</style>
