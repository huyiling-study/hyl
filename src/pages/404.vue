<template>
    <div>
        <el-result icon="warning" title="404 提示" sub-title="页面丢失">
            <template #extra>
                <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>