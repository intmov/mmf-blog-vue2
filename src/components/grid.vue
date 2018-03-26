<template>
    <div
        class="weui-grids"
        :class="{
      'vux-grid-no-lr-borders': !showLrBorders
    }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'grid',
        methods: {
            countColumn () {
                this.childrenSize = this.$children.length
                this.$children.forEach((c, index) => {
                    c.index = index
                    return c
                })
            }
        },
        props: {
            rows: {
                type: Number
            },
            cols: {
                type: Number
            },
            showLrBorders: {
                type: Boolean,
                default: true
            },
            showVerticalDividers: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            column () {
                return this.cols || this.childrenSize
            }
        },
        data () {
            return {
                childrenSize: 3
            }
        }
    }
</script>
<style lang="less">
    @import '../assets/less/weui-grid.less';

    .weui-grids.vux-grid-no-lr-borders {
        &:after {
            display: none;
        }
    }
</style>
