<template>
    <a href="javascript:;"
       class="weui-grid"
       :class="{
      'vux-grid-item-no-border': (isLast && !$parent.showLrBorders) || (!isLast && !$parent.showVerticalDividers),
    }"
       @click="onClick"
       :style="style">
        <div class="weui-grid__icon" v-if="hasIconSlot || icon">
            <slot name="icon">
                <img :src="icon" alt="">
            </slot>
        </div>
        <p v-if="hasLabelSlot || label" class="weui-grid__label">
            <slot name="label">
                <span v-if="select" style="color: red" v-text="label"></span>
                <span v-else style="color: black" v-text="label"></span>
            </slot>
        </p>
        <slot></slot>
    </a>
</template>

<script>

    export default {
        name: 'grid-item',
        props: ['icon', 'label', 'link','select'],
        created () {
            this.$parent.countColumn()
        },
        mounted () {
            this.mountCheck()
        },
        destroyed () {
            this.$parent.countColumn()
        },
        computed: {
            isLast () {
                return !((this.index + 1) % this.$parent.column)
            },
            style () {
                const column = this.$parent.column
                if (!column || column === 3) {
                    return
                }
                const styles = {}
                styles.width = `${100 / column}%`
                return styles
            }
        },
        methods: {
            mountCheck(){
                if(this.$slots.icon) this.hasIconSlot = true
                if(this.$slots.label) this.hasLabelSlot = true
            },
            onClick () {
                this.$emit('onItemClick', this.link)
                // this.$router.push(this.link)
            }
        },
        data () {
            return {
                index: 0,
                hasIconSlot: false,
                hasLabelSlot: false
            }
        }
    }
</script>

<style lang="less">
    .weui-grid.vux-grid-item-no-border {
        &:before {
            display: none;
        }
    }
</style>
