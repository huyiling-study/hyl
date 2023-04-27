<template>
<!-- :style == 收起div -->
    <div class="f-menu" :style="{ width:$store.state.asideWidth }">
        <el-menu :default-active="defaultActive"  :unique-opened="true" default-active="2" class="border-0" 
            @select="handleSelect" :collapse="iscollapse" :collapse-transition="false">
            <template v-for="(item, index) in asideMenus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length > 0" 
                    :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<script setup>
import { computed,ref } from "vue";
import { useRouter,useRoute } from "vue-router"
import { useStore } from "vuex";
const router = useRouter()
const store = useStore()
const route = useRoute()

// 默认选中当前路径
const defaultActive = ref(route.path);

const asideMenus = computed(()=>store.state.menus)

const iscollapse = computed(()=>!(store.state.asideWidth == "250px"))

// 跳转到商品管理界面
const handleSelect = (e) => {
    // console.log(e);
    router.push(e)
}

</script>


<style>
.f-menu {
    transition: all 0.2s;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;

    @apply shadow-50 fixed
}
.f-menu::-webkit-scrollbar{
    width: 0px;
    

}
.el-menu{
    height: 100%;
}


</style>