import { router, addRoutes } from '~/router'
import { getToken } from '~/composables/auth'
import { toast, hideFullLoading, showFullLoading } from '~/composables/util'
import store from './store'


let hasGetInfo = false
// 全局前置守卫（只要路由发生变化，就会执行）
router.beforeEach(async (to, from, next) => {
    showFullLoading()
    const token = getToken()
    // 检查cookie有没有token,说明未登录,返回登录界面
    if (!token && to.path != '/login') {
        toast("请重新登录", "error")
        return next({ path: '/login' })
    }

    // 避免重复登录
    if (token && to.path == '/login') {
        toast("请勿重复登录", "error")
        return next({ path: from.path ? from.path : '/' })
    }

    // 如果用户登录了,自动获取用户信息,并储存在vuex当中
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        let { menus } = await store.dispatch("getInfo")
        hasGetInfo = true
        hasNewRoutes = addRoutes(menus)
    }

    // 设置页面标题
    const title = to.meta.title ? to.meta.title : '';
    document.title = title

    hasNewRoutes? next(to.fullPath):next()
})

router.afterEach((to, from) => hideFullLoading())