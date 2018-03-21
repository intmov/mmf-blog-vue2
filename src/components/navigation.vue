<template>
    <div class="header">
        <!-- 头部导航 -->
        <header class="header" :class="{ 'header-fixed' : true }">
        <el-row>
            <el-col type="flex" class="row-bg" justify="center">
                <el-menu default-active="1" class="el-menu-demo" mode="horizontal" background-color="#54d9e0" text-color="#fff">
                    <el-menu-item class="el-menu-width" index="3"><a href="/" class="nav-link"><i class="icon icon-nav-home"></i><span class="text">首页</span></a></el-menu-item>
                    <el-menu-item class="el-menu-width" index="4"><a href="/summary" class="nav-link"><i class="icon icon-nav-explore"></i><span class="text">统计</span></a></el-menu-item>
                    <el-menu-item class="el-menu-width" index="5"><a href="/about" class="nav-link"><i class="icon icon-nav-features"></i><span class="text">关于</span></a></el-menu-item>
                    <el-menu-item class="el-menu-width" v-if="isLogin" index="6"><a href="/user/account/self" class="nav-link"><i class="el-icon-setting"></i><span class="text">用户</span></a></el-menu-item>
                    <el-menu-item class="el-menu-width" v-else index="6"><a href="javascript:;" class="nav-link" @click="login"><i class="el-icon-setting"></i><span class="text">登陆</span></a></el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        </header>
    </div>

</template>

<script lang="babel">
import cookies from 'js-cookie'
export default {
    props: ['backend'],
    data() {
        return {
            isLogin: cookies.get('user')
        }
    },
    methods: {
        login() {
            this.$store.commit('global/showLoginModal', true)
        },
        search(e) {
            var qs = e.target.value
            if (qs === "") {
                return false
            }
            this.$router.replace('/search/' + qs)
        }
    }
}
</script>
<style scoped>
    .header{
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .text{
        margin-left: 5px;
    }
    .el-menu-width{
        width: 25%;
    }
</style>

