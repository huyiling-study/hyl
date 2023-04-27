<template>
    <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">

        <el-tabs v-model="activeTab" type="card" class="demo-tabs" style="min-width: 100px;" @tab-remove="removeTab"
            @tab-change="changeTab">
            <!-- :closable="item.path != '/'" 不是后台面板的开启可关闭功能 -->
            <el-tab-pane :closable="item.path != '/'" v-for="item in tabList" :key="item.path" :label="item.title"
                :name="item.path"></el-tab-pane>
        </el-tabs>

        <span class="tag-btn">
            <el-dropdown @command="handleClose">
                <span class="el-dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clearOther">关闭其他 </el-dropdown-item>
                        <el-dropdown-item command="clearAll">全部关闭 </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <div style="height:44px"></div>
</template>

<script setup>
import { useTabList } from '~/composables/useTabList'
const {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
} = useTabList()
</script>

<style scoped>
.f-tag-list {
    @apply fixed flex items-center bg-gray-100 px-2;
    height: 44px;
    top: 64px;
    right: 0px;
    z-index: 100;
}

.tag-btn {
    @apply ml-auto bg-white rounded flex items-center justify-center px-2;
    height: 32px;
}

:deep(.el-tabs--card>.el-tabs__header .el-tabs__nav) {
    border: 0;
}

.el-tabs--card>.el-tabs__header .el-tabs__item {
    border: 0px;
}

:deep(.el-tabs__header) {
    @apply mb-0 mt-2;
    border: 0;
}

:deep(.el-tabs__item) {
    border: 0, !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;

}

:deep(.el-tabs__nav-next) {
    line-height: 36px;
}
</style>