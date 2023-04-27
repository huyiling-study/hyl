<template>
    <el-row style="min-height: 100vh;" class="login-container">
        <!-- 左 -->
        <el-col :lg="16" class="left">
            <div>
                <div>欢迎光临</div>
                <div class="">vue3+vite实战商城后台开发系统</div>
            </div>
        </el-col>
        <!-- 右  flex-col-->
        <el-col :lg="8" class="right">
            <h1 class="title">欢迎回来</h1>
            <div>
                <span class="line"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="formwith">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button round class="formwith" type="primary" @click="onSubmit" :loading="loading">登录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onBeforeUnmount } from 'vue'
import { toast } from '~/composables/util'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()

const form = reactive({
    username: '',
    password: ''
})

const rules = ({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
    ]
})

// 响应式
const formRef = ref(null)
const loading = ref(false)

const onSubmit = () => {

    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true

        store.dispatch("login", form).then(res => {
            toast('登录成功')
            router.push('/')
        })
            .finally(() => {
                loading.value = false
            })
    })
}


// 回车实现登录方法
function onKeyUp(e) {
    // console.log(e);
       if(e.key == "Enter") onSubmit()
}

onBeforeMount(() => {
    document.addEventListener("keyup", onKeyUp)
})

onBeforeUnmount(() => {
    document.removeEventListener("keyup", onKeyUp)
})

</script>


<style scoped>
.login-container {
    @apply bg-indigo-500;
}

.login-container .left,
.right {
    @apply flex items-center justify-center;
}

.left>div>div:first-child {
    @apply font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
    @apply text-gray-50;
}

.right {
    @apply flex-col bg-light-50;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.line {
    @apply h-[1px] w-16 bg-gray-200;
}

.formwith {
    @apply w-[250px];
}
</style>