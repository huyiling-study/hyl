<template>
    <div class="f-header">
        <span class="logo">
            <el-icon class="mr-2"><eleme-filled /></el-icon>
            蟹黄堡后台管理体系
        </span>
        <el-tooltip effect="dark" content="折叠" placement="bottom" >
            <el-icon class="ico-btn" @click="$store.commit('handleAsideWidth')">
                <fold v-if="$store.state.asideWidth == '250px'"/>
                <Expand v-else/>
            </el-icon>
        </el-tooltip>
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="ico-btn" @click="headleRefresh">
                <refresh />
            </el-icon>
        </el-tooltip>
        <div class="ml-auto flex items-center">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="ico-btn" @click="toggle">
                    <full-screen v-if=!isFullscreen />
                    <aim v-else />
                </el-icon>
            </el-tooltip>
            <el-dropdown class="dropdown" @command="handleCommend">
                <span class="flex items-center text-light-50">
                    <el-avatar class="mr-3" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="repassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

    <FormDrawer ref="formDrawerRef" title="修改标题" destroyOnClose="true" @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import FormDrawer from "~/components/FormDrawer.vue"
import { useRepassword, useLogout } from "~/composables/useManager.js"



const {
    // 是否全屏
    isFullscreen,
    // 切换全屏
    toggle
} = useFullscreen()
const {
    formDrawerRef,
    form,
    rules,
    formRef,
    onSubmit,
    openRePasswordFrom
} = useRepassword()
const {
    handleLogout
} = useLogout()


// 刷新
const headleRefresh = () => location.reload()

const handleCommend = (c) => {
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "repassword":
            // console.log("重置密码");
            openRePasswordFrom()
            break;
    }
}






</script>

<style>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
    z-index: 100;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}

.ico-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.ico-btn:hover {
    @apply bg-indigo-600
}

.f-header .dropdown {
    height: 64px;
    cursor: 0;
    @apply flex justify-center items-center mx-5;
}
</style>