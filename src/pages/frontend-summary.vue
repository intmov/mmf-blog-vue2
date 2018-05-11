<template >
    <div class="main" align="center">
        <div>

            <el-radio-group v-model="rangeOption" @change="changeRange" style="padding-top: 10px">
                <el-radio class="radio" label="day"   border>当天</el-radio>
                <el-radio class="radio" label="week"  border>本周</el-radio>
                <el-radio class="radio" label="month" border>本月</el-radio>
                <el-radio class="radio" label="user"  border>任意</el-radio>
            </el-radio-group>
            <el-form v-if="rangeOption === 'user'" >
                <el-form-item>
                    <el-row style="margin-top:10px;" type="flex" justify="center">
                        <el-col :span="9">
                            <el-date-picker v-model="startDate" style="width: 100%;" id="a1" type="date" placeholder="开始日期" />
                        </el-col>
                        <el-col :span="9">
                            <el-date-picker v-model="endDate" style="width: 100%;"  id="a2" type="date" placeholder="结束日期" />
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="clickSearch">查询</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>

            <el-select v-if="group.userGroups && group.userGroups.length > 1" style="width: 100%;margin-top: 5px" v-model="group.currentUserGroup" @change="changeRange" placeholder="请选择分组">
                <el-option
                    v-for="item in group.userGroups"
                    :key="item"
                    :value="item">
                </el-option>
            </el-select>


        </div>
        <div class="summary">
            <el-table stripe :row-class-name="tableRowClassName"
                :data="summaryData" border style="background:transparent;">
                <el-table-column label="#"  type="index"   width="40"> </el-table-column>
                <!--<el-table-column prop="rank"        label="#"    width="40"> </el-table-column>-->
                <el-table-column label="用戶" width="85" sortable sort-by="update_date">
                    <template slot-scope="scope">
                        <a :href="'/user/account/'+ scope.row.user"><div style="display: block">{{ scope.row.user }}</div></a>
                        <div v-if="rangeOption == 'day'" class="table_text gray_text">{{ scope.row.update_date.substr(11,9)}}</div>
                        <div v-else class="table_text gray_text">{{ scope.row.update_date.substr(0,10)}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="days" label="打卡" sortable sort-by="days">
                    <template slot-scope="scope">
                        <div class="table_text"> <span class="number_text">{{ scope.row.days }}</span> 天</div>
                        <div v-if="scope.row.late_days > 0" class="table_text gray_text">补打 <span class="number_text">{{ scope.row.late_days }}</span> 天</div>
                    </template>
                </el-table-column>
                <el-table-column label="读经" sortable sort-by="chapters">
                    <template slot-scope="scope">
                        <div class="table_text">共 <span class="number_text">{{ scope.row.chapters }}</span> 章</div>
                        <div v-if="scope.row.meditation > 0" class="table_text gray_text">默想 <span class="number_text">{{ scope.row.meditation }}</span> 次</div>
                    </template>
                </el-table-column>
                <el-table-column label="用时" sortable sort-by="readtime">
                    <template slot-scope="scope">
                        <div class="table_text"> <span class="number_text">{{ scope.row.readtime }}</span> 分钟</div>
                        <div class="table_text gray_text">质量 <span class="number_text">{{ scope.row.quality }}</span></div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script lang="babel" type="text/babel">
    import api from '~api'

    export default {
        name: 'frontend-summary',
        components: {

        },
        computed: {
        },
        data() {
            return {
                rangeOption: 'day',
                startDate: '',
                endDate:'',
                group:{
                    userGroups:[],
                    currentUserGroup:'',
                },
                userData: {},
                summaryData: [{
                    rank: '1',
                    user: 'Test',
                    userid: '1',
                    chapters: 20,
                    meditation: 20,
                    days: 150,
                    late_days: 2,
                    readtime: '20:13',
                    quality: 3.5,
                    update_date: '00:11:11'
                }]
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (row.days === 0) {
                    return 'warning-row'
                }
                return ''
            },
            async getData(){
                const { data: { code, data} } = await api.get('frontend/user/account')
                if (code === 200) {
                    this.userData = data
                    try {
                        this.group.userGroups.splice(0,this.group.userGroups.length)
                        for(const k in data.user_groups.split(';')){
                            this.group.userGroups.push(data.user_groups.split(';')[k])
                        }
                        this.group.currentUserGroup = this.group.userGroups[0]

                        this.getSummaryData({type:'day'})
                    }catch(e){
                        console.error(e)
                    }
                }
            },
            async getSummaryData (config) {
                console.log(this.group.currentUserGroup)
                const { data: { data, code} } = await api.get('frontend/article/summary', {...config, user_groups:this.group.currentUserGroup, cache: false})
                if(data != null){
                    this.summaryData = data.map( d => {
                        d.quality = d.quality ? d.quality.toFixed(1): 0
                        return d
                    })
                }
            },
            changeRange(){
                if('user' !== this.rangeOption)
                    this.getSummaryData({type:this.rangeOption})
            },
            clickSearch(){
                this.getSummaryData({type:this.rangeOption, startDate: this.startDate, endDate: this.endDate})
            }

        },
        mounted() {
            this.getData()


        }
    }
</script>
<style scoped>
    .main{
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        background: white;
    }
    .summary{
        margin-top: 10px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        align-content: center;
    }

    .date_text{
        color: #666;
        font-size: small;
        display: block;
    }
    .radio{
        width: 70px;
    }
    .number_text{
        font-size:11pt;
        color:purple;
    }

    .table_text{
        display: block;
        font-size:9pt;
    }

    .gray_text{
        color: #aaa;
    }

    .el-table .warning-row {
        background: oldlace;
    }
</style>
