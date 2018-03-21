<template >
    <div class="main" align="center">
        <div>
            <el-radio-group v-model="rangeOption" @change="changeRange">
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


        </div>
        <div class="summary">
            <el-table stripe
                :data="summaryData" border style="background:transparent;">
                <el-table-column label="#"  type="index"   width="40"> </el-table-column>
                <!--<el-table-column prop="rank"        label="#"    width="40"> </el-table-column>-->
                <el-table-column label="用戶" width="85" sortable sort-by="update_date">
                    <template slot-scope="scope">
                        <div style="display: block">{{ scope.row.user }}</div>
                        <div v-if="rangeOption == 'day'" style="color: #aaa; font-size:9pt;">{{ scope.row.update_date.substr(11,9)}}</div>
                        <div v-else style="color: #aaa; font-size:9pt;">{{ scope.row.update_date.substr(0,10)}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="days" label="打卡" sortable>
                    <template slot-scope="scope">
                        <div style="display: block;font-size:9pt;"> <span style="font-size:11pt;color:purple;">{{ scope.row.days }}</span> 天</div>
                    </template>
                </el-table-column>
                <el-table-column label="读经" sortable sort-by="chapters">
                    <template slot-scope="scope">
                        <div style="display: block;font-size:9pt;">共 <span style="font-size:11pt;color:purple;">{{ scope.row.chapters }}</span> 章</div>
                        <div v-if="scope.row.meditation > 0" style="font-size:9pt;">默想 <span style="font-size:10pt;color:purple;">{{ scope.row.meditation }}</span> 次</div>
                    </template>
                </el-table-column>
                <el-table-column label="用时" sortable>
                    <template slot-scope="scope">
                        <div style="display: block;font-size:9pt;"> <span style="font-size:11pt;color:purple;">{{ scope.row.readtime }}</span> 分钟</div>
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
                summaryData: [{
                    rank: '1',
                    user: '王小虎',
                    chapters: 20,
                    meditation: 20,
                    days: 150,
                    readtime: '20:13',
                    update_date: '00:11:11'
                }]
            }
        },
        methods: {
            async getSummaryData (config) {
                const { data: { data, code} } = await api.get('frontend/article/summary', {...config, cache: false})
                if(data != null){
                    this.summaryData = data
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
            this.getSummaryData({type:'day'})
        }
    }
</script>
<style scoped>
    .main{
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
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
</style>
