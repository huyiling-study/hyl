import { logout, updatepassword } from "~/api/manager"
import { showModel, toast } from '~/composables/util'
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { ref, reactive } from 'vue'



export function useRepassword() {

    const store = useStore()

    const router = useRouter()

    // 修改密码
    const formDrawerRef = ref(null)
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })

    const rules = ({
        oldpassword: [
            { required: true, message: '旧密码必填', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '新密码必填', trigger: 'blur' },
        ],
        repassword: [
            { required: true, message: '确认密码必填', trigger: 'blur' },
        ]
    })

    const formRef = ref(null)
    const onSubmit = () => {

        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            formDrawerRef.value.showLoading()
            updatepassword(form)
                .then(res => {
                    // 提示用户
                    toast("修改密码成功，请重新登录")
                    store.dispatch("logout")
                    router.push("/login")
                }).finally(() => {
                    formDrawerRef.value.hideLoading()
                })
        })
    }

    const openRePasswordFrom = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordFrom
    }
}

export function useLogout() {
    const store = useStore()
    const router = useRouter()
    function handleLogout() {
        showModel("是否确认退出？").then(res => {
            logout().finally(() => {
                    store.dispatch("logout")
                    // 跳转登陆界面
                    router.push('/login')
                    // 提示登陆成功
                    toast("退出登录成功")
            })
        })
    }
    return {
        handleLogout
    }
}