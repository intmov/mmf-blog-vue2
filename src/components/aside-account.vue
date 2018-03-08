<template>
    <div style="margin-bottom: 10px;">
        <el-radio-group v-model="action" @change="changeAction">
            <el-radio style="margin-left: 10px;" label="/user/account" border>账号</el-radio>
            <el-radio label="/user/password" border>密码</el-radio>
            <el-radio label="/user/logout" border>退出</el-radio>
        </el-radio-group>
    </div>
    <!--<div style="margin-bottom: 10px;margin-left: auto;margin-right: auto;align-content: center;">-->
        <!--<a href="/user/account"><el-radio>账号</el-radio></a>-->
        <!--<a href="/user/password"><el-radio plain><i class="icon icon-articles"></i>密码</el-radio></a>-->
        <!--<a @click="handleLogout" href="javascript:;"><el-button plain><i class="icon icon-articles"></i>退出</el-button></a>-->
    <!--</div>-->
</template>

<script lang="babel" type="text/babel">
import api from '~api'
export default {
    name: 'aside-account',
    serverCacheKey: () => {
        return `aside::account`
    },
    methods: {
        async handleLogout() {
            await api.post('frontend/user/logout', {})
            window.location.href = '/'
        },
        changeAction(){
            if(this.action === '/user/logout'){
                this.handleLogout()
            }else{
                this.$router.push(this.action)
            }
        }
    },
    data() {
        return {
            action: ''
        }
    },
    mounted(){
        this.action = this.$route.path
    }
}
</script>
