<template >
    <div class="main" align="center">
        <section class="wh_container">
            <div class="wh_content_all">
                <!-- -->
                <plan-viewer :title="nt_title" :plan="nt_items"></plan-viewer>
                <plan-viewer :title="ot_title" :plan="ot_items"></plan-viewer>
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
                    '创,1:1-6:8',
                    '创,6:9-11:26',
                    '创,11:27-16~',
                    '创,~17:1-25:11',
                    '创,25:12-35:29',
                    '创,36-43~',
                    '创,~44-50',
                    '出,1:1-6:27',
                    '出,6:28-13:16',
                    '出,13:17-18:27',
                    '出,19-24',
                    '出,25:1-31:11',
                    '出,31:12-35:3',
                    '出,35:4-40:38',
                    '利,1:1-6:7',
                    '利,6:8-10:20',
                    '利,11-15',
                    '利,16-20',
                    '利,21-27',
                    '民,1-6',
                    '民,7:1-10:10',
                    '民,10:11-15:41',
                    '民,16-21',
                    '民,22-25',
                    '民,26-31',
                    '民,32-36',
                ],
                nt_items: [
                    '太,1-4',
                    '太,5-9',
                    '太,10:1-16:20',
                    '太,16:21-20:34',
                    '太,21-25',
                    '太,26-28',
                    '可,1:1-6:13',
                    '可,6:14-10:52',
                    '可,11-16',
                    '路,1:1-4:13',
                    '路,4:14-9:50',
                    '路,9:51-14:35',
                    '路,15:1-19:27',
                    '路,19:28-24:53',
                    '约,1-7',
                    '约,8-12',
                    '约,13-17',
                    '约,18-21',
                    '徒,1-6:7',
                    '徒,6:8-9:31',
                    '徒,9:32-12:25',
                    '徒,13:1-18:22',
                    '徒,18:23-23:11',
                    '徒,23:12-28:31',
                    '罗,1-5',
                    '罗,6-11',
                    '罗,12-16',
                    '林前,1-5',
                    '林前,6-10',
                    '林前,11-16',
                    '林后,1-7',
                    '林后,8-13',
                    '加,1-6',
                    '弗,1-6',
                    '腓,1-4',
                    '西,1-4',
                    '帖前,1-5',
                    '帖后,1-3',
                    '提前,1-6',
                    '提后,1-4',
                    '多1-3,门1',
                    '来,1-7',
                    '来,8-13',
                    '雅,1-5',
                    '彼前1-5,彼后1-3',
                    '约一,1-5',
                    '约二三,犹',
                    '启,1-5',
                    '启,6-11',
                    '启,12-16'
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
        background-color: white;
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
