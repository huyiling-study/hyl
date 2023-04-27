<template>
    <div class="aside-list" :class="{ 'active': props.active }">
        <span class="truncate">
            <slot />
        </span>
        <!--  @click="$emit('edit')" 通知父组件 -->
        <!-- 编辑 -->
        <el-button class="ml-auto px-1" text type="primary" size="small" @click.stop="$emit('edit')">
            <el-icon :size="12">
                <Edit />
            </el-icon>
        </el-button>

        <span @click.stop="()=>{}">
            <el-popconfirm title="是否要删除该公告？" confirm-button-text="确认" cancel-button-text="取消" @confirm="$emit('delete')">
                <template #reference>
                    <el-button class="px-1" text type="primary" size="small">
                        <el-icon :size="12"><Close /></el-icon>
                    </el-button>
                </template>
            </el-popconfirm>
        </span>

        <!--  @click="$emit('delete')" 通知父组件 -->

    </div>
</template>
<script setup>
const props = defineProps({
    active: {
        type: Boolean,
        default: false
    }
})

// 将按钮的事件暴露出去
defineEmits(['edit', 'delete'])
</script>
<style scoped>
.truncate {
    padding: 5px;
}

.aside-list {
    @apply flex items-center p-3 text-xs text-gray-500;
    border-bottom: 1px solid #f4f4f4;
}

.aside-list:hover,
.active {
    @apply bg-blue-50;
}
</style>