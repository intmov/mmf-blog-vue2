<template>
    <div class="plan-viewer">
        <div class="plan-title">{{title}}</div>
        <div class="pl_content">
            <div v-for="(item, index) in plan" class="pl_content_item">
                <div class="item_cell">
                    <div class="item_day">{{ index+1 }}</div>
                    <div class="item_verse_list">
                        <div v-for="verse in item.split(',')" class="item_verse">{{verse}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="babel" type="text/babel">
export default {
    props: ['plan', "title"]
}
</script>

<style scoped>
    .plan-title{
        font-size: 25px;
        text-align: center;
        font-weight: bold;
        font-family: SimHei;
        display: block;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .item_day {
        font-size: 10px;
        color: purple;
        padding-top: 8px;
        display: inline-block;
        padding-left: 5px;
        float: left;
    }
    .item_verse_list{
        padding-top: 20px;
    }
    .item_verse{
        font-size: 10px;
        padding-left: 0px;
        justify-content: center;
        padding-top: 15px;
    }

    .item_cell{
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        display: block;
        padding-bottom: 20px;
    }

    .pl_content {
        padding-left: 0;
        padding-right: 0;
        width: 99%;
        clear: both;
        display: block;
        overflow: hidden;
        float: left;
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .pl_content_item {
        font-size: 17px;
        /*height: 70px;*/
        line-height: 10%;
        width: 19.9%;
        float: left;
        overflow: hidden;
    }
</style>
