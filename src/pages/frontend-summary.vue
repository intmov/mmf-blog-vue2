<template>
    <div class="main">
        <div>
            <el-radio-group v-model="rangeOption" @change="changeRange">
                <el-radio style="margin-left: 10px;" label="day" border>当天</el-radio>
                <el-radio label="week" border>本周</el-radio>
                <el-radio label="month" border>本月</el-radio>
            </el-radio-group>
        </div>
        <div class="summary">
            <el-table
                :data="summaryData"  height="250"  border  style="width: 100%">
                <el-table-column   label="#"  type="index"   width="40"> </el-table-column>
                <el-table-column prop="rank"        label="#"    width="40"> </el-table-column>
                <el-table-column prop="user"        label="用戶" width="80"> </el-table-column>
                <el-table-column prop="days"        label="打卡" width="60"> </el-table-column>
                <el-table-column prop="chapters"    label="章数" width="60"> </el-table-column>
                <el-table-column prop="meditation"  label="默想" width="60"> </el-table-column>
                <el-table-column prop="readtime"    label="用时"> </el-table-column>
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
                summaryData: [{
                    rank: '1',
                    user: '王小虎',
                    chapters: 20,
                    meditation: 20,
                    days: 150,
                    readtime: '20:13'
                },{
                    rank: '20',
                    user: '王小虎',
                    chapters: 20,
                    readtime: '15小时'
                },
                ]
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
                this.getSummaryData({type:this.rangeOption})
            },

        },
        mounted() {

        }
    }
</script>
<style scoped>
    .summary{
        margin-top: 10px;
        width: 100%;
    }
</style>
