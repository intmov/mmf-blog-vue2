<template>
    <el-dialog
        :title="title"
        :visible.sync="visibility"
        fullscreen top="5"
        center>
        <grid :cols="selectColumns">
            <template v-for="i in selectOptions">
                <grid-item :label="i" :link="i" @onItemClick="onSelectDialogClick">
                </grid-item>
            </template>
        </grid>
    </el-dialog>
</template>

<script>
    import grid from '../components/grid.vue'
    import gridItem from '../components/grid-item.vue'

    export default {
        name: 'book-selector',
        methods: {
            onSelectDialogClick() {
                this.visibility = false
                this.visible = false
            },
            init(){
                this.visibility = true
            }
        },
        mounted(){
            this.init()
        },
        components: {
            grid,gridItem
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                selectColumns: 6,
                selectOptions: '',
                visibility: false,
                title:""
            }
        }
    }
</script>
<style lang="less">
</style>
