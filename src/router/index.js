import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import CateGory from "~/pages/category/list.vue"
import GoodList from '~/pages/goods/list.vue'
import UserList from "../pages/user/list.vue"
import OrderList from "../pages/order/list.vue"
import CommentList from "../pages/comment/list.vue"
import ImageList from "../pages/image/list.vue"
import NoticeList from "../pages/notice/list.vue"
import SettingBase from "../pages/setting/base.vue"
import CouponList from "../pages/coupon/list.vue"


// 默认路由，所有用户共享
const routes = [{
    path: '/',
    name: 'admin',
    component: Admin,
},
{
    path: '/login',
    component: Login,
    meta: {
        title: "登录页"
    }
},
// 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
}]

// 动态路由，用于匹配菜单动态添加路由
const asyncRouter = [
    {
        path: '/',
        name: '/',
        component: Index,
        meta: {
            title: "后台首页"
        }
    },
    {
        path: '/goods/list',
        name: '/goods/list',
        component: GoodList,
        meta: {
            title: "商品管理"
        }
    },
    {
        path: '/category/list',
        name: '/category/list',
        component: CateGory,
        meta: {
            title: "分类管理"
        }
    },
    {
        path: '/user/list',
        name: '/user/list',
        component: UserList,
        meta: {
            title: "用户管理"
        }
    },
    {
        path: '/order/list',
        name: '/order/list',
        component: OrderList,
        meta: {
            title: "订单管理"
        }
    },
    {
        path: '/comment/list',
        name: '/comment/list',
        component: CommentList,
        meta: {
            title: "评价管理"
        }
    },
    {
        path: '/image/list',
        name: '/image/list',
        component: ImageList,
        meta: {
            title: "图库管理"
        }
    },
    {
        path: '/notice/list',
        name: '/notice/list',
        component: NoticeList,
        meta: {
            title: "公告管理"
        }
    },
    {
        path: '/setting/base',
        name: '/setting/base',
        component: SettingBase,
        meta: {
            title: " 配置列表"
        }
    },
    {
        path: '/coupon/list',
        name: '/coupon/list',
        component: CouponList,
        meta: {
            title: " 优惠卷列表"
        }
    },

]



// 默认导出时引用不用加{}，此处是分别暴露要加{}
// 创建路由
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})


// 动态添加路由的方法
// 菜单是一层一层的，我们不知道有几层，就要用到递归
export function addRoutes(menus) {
    // 匹配菜单路由路径 arr这个数组里面拿到的是菜单数据 e.frontpath拿到菜单路径
    let hasNewRoutes = false;// （处理刷新界面丢失问题）
    const findAndAddRoutesByMenus = (arr) => {
        arr.forEach(e => {
            let item = asyncRouter.find(o => o.path == e.frontpath)
            if (item && !router.hasRoute(item.path)) {
                router.addRoute("admin",item)//因为有子路由，此处添加嵌套路由
                hasNewRoutes = true
            }
            // 判度是否存在子路由(子菜单)
            if (e.child && e.child.length > 0) {
                findAndAddRoutesByMenus(e.child)
            }
        })
    }
    findAndAddRoutesByMenus(menus)

    // console.log(router.getRoutes());
    return hasNewRoutes
}

