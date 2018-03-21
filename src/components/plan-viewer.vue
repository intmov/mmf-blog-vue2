<template>
    <div class="plan-viewer"><div class="plan-title">{{title}}</div>
        <div class="wh_content">
            <div v-for="(item, index) in plan" class="wh_content_item">
                <div class="cell">
                    <div class="day">{{ index+1 }}</div>
                    <div v-bind:style="{paddingTop: (20+vi*20)+'px' }" v-for="(verse,vi) in item.split(',')" class="verse">{{verse}}</div>
                </div>
            </div>
        </div></div>
</template>

<script lang="babel" type="text/babel">
export default {
    props: ['plan', "title"]
}
</script>

<style scoped>
    .day {
        font-size: 10px;
        color: purple;
        padding-top: 8px;
        display: inline-block;
        padding-left: 25px;
        justify-content: right;
    }
    .verse{
        font-size: 10px;
        padding-left: 0px;
        justify-content: center;
    }

    .cell{
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
        /* display: inline-block; */
    }

    .plan-title{
        font-size: 25px;
        text-align: center;
        font-weight: bold;
        font-family: SimHei;
        display: block;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .wh_content {
        display: flex;
        flex-wrap: wrap;
        /* padding: 0 3% 0 3%; */
        /* width: 100%; */
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }

    .wh_content_item {
        font-size: 17px;
        height: 80px;
        line-height: 10%;
    }

    .wh_content_item {
        font-size: 15px;
        width: 20%;
        /* padding-bottom: 10.14%; */
        /* text-align: center; */
        position: relative;
        /* border: 1px solid red; */
    }
    .wh_content_item div {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        left: 0;
        /* display: flex; */
        /* justify-content: center; */
        /* align-items: center; */
    }
</style>
