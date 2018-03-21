<template >
    <div class="main" align="center">
        <section class="wh_container">
            <div class="wh_content_all">
                <!-- -->
                <plan-viewer :title="ot_title" :plan="ot_items"></plan-viewer>
                <plan-viewer :title="nt_title" :plan="nt_items"></plan-viewer>
            </div>
        </section>
    </div>
</template>
<script lang="babel" type="text/babel">
    import planViewer from "../components/plan-viewer.vue"
    export default {
        name: 'frontend-intro',
        components: {
            planViewer
        },
        computed: {
        },
        data() {
            return {
                ot_title: "旧约阅读计划——雅各小组",
                nt_title: "新约阅读计划——雅各小组",
                ot_items: [
                    '创1:1-6:8',
                    '创6:9-11:26',
                    '创11:27-16:16~',
                    '创~17:1-25:11',
                    '创25:12-35:29',
                    '创36-43~',
                    '创~44-50',
                    '出1:1-6:27',
                    '出6:28-13:16',
                    '出13:17-18:27',
                    '出19-24',
                    '出25:1-31:11',
                    '出31:12-35:3',
                    '出35:4-40:38',
                    '利1:1-6:7',
                    '利6:8-10:20',
                    '利11-15',
                    '利16-20',
                    '利21-27',
                    '民1-6',
                    '民7:1-10:10',
                    '民10:11-15:41',
                    '民16-21',
                    '民22-25',
                    '民26-31',
                    '民32-36',
                    '申',
                    '申',
                    '申',
                    '申',
                    '申',
                    '申',
                    '申',
                    '申',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                    '创',
                ],
                nt_items: [
                    '太1-4',
                    '太5-9',
                    '太10:1-16:20',
                    '太16:21-20:34',
                    '太21-25',
                    '太26-28',
                    '可1:1-6:6',
                    '可6:7-10:52',
                    '可11-16',
                    '路1:1-4:13',
                    '路4:14-9:50',
                    '路9:51-14:35',
                    '路15:1-19:27',
                    '路19:28-24:53',
                    '约1-7',
                    '约8-12',
                    '约13-17',
                    '约18-21',
                    '徒1-5',
                    '徒6:1-9:31',
                    '徒9:32-12:25',
                    '徒13:1-18:22',
                    '徒18:23-23:11',
                    '徒23:12-28:31',
                    '罗1-5',
                    '罗6-11',
                    '罗12-16',
                    '林前1-5',
                    '林前6-10',
                    '林前11-16',
                    '林后1-7',
                    '林后8-13',
                    '加1-6',
                    '弗1-6',
                    '腓1-4',
                    '西1-4',
                    '帖前1-5',
                    '帖后1-3',
                    '提前1-6',
                    '提后1-4',
                    '多1-3,门1',
                    '来1-7',
                    '来8-13',
                    '雅1-5',
                    '彼前1-5,彼后1-3',
                    '约一',
                    '约二三,犹',
                    '启1-5',
                    '启6-11',
                    '启12-16'
                ]
            }
        }
    }
</script>
<style scoped>
    .main{
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
    .wh_container {
        max-width: 660px;
        margin: 5px 5px 5px 5px;
    }


    .wh_content_all {
        font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', STHeiti, 'Microsoft Yahei', Tahoma,
        Simsun, sans-serif;
        /* background-color: #0fc37c; */
        width: 100%;
        overflow: hidden;
        /* padding-bottom: 8px; */

    }
</style>
