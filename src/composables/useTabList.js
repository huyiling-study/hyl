import { ref } from 'vue';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies';

export function useTabList() {
    const cookies = useCookies()
    const route = useRoute()
    const router = useRouter()


    const activeTab = ref(route.path)
    // tabList用ref包着，要用value取值
    const tabList = ref([
        {
            title: '后台面板',
            path: "/",
        },
    ])

    // 添加新标签页
    function addTabs(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        // 存储在cookie 
        cookies.set("tabList", tabList.value)
    }
    // 初始化标签列表
    function InitTabList() {
        let tabs = cookies.get('tabList')
        if (tabs) {
            tabList.value = tabs
        }
    }
    InitTabList()

    // 监听
    onBeforeRouteUpdate((to, from) => {
        // 添加标签处于激活状态
        activeTab.value = to.path
        addTabs({
            title: to.meta.title,
            path: to.path
        })
    })

    //切换标签页（激活状态改为当前标签页，并跳转到此路由）
    const changeTab = (t) => {
        // console.log(t);
        activeTab.value = t
        router.push(t)
    }

    // 删除标签页
    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        // console.log(a);
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }
                }
            })
        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)

        cookies.set("tabList", tabList.value)
    }

    // 删除其他标签和全部标签
    const handleClose = (c) => {
        console.log(c);
        if (c == 'clearAll') {
            // 切换回首页
            activeTab.value = "/"
            // 只保留首页
            tabList.value = [{
                title: '后台面板',
                path: "/",
            }]
        }
        else if (c == "clearOther") {
            // 过滤只剩下首页和当前激活的标签
            tabList.value = tabList.value.filter(t => t.path == '/' || t.path == activeTab.value)
        }
        // 跟新存储
        cookies.set("tabList", tabList.value)
    }

    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }
}