<template>
    <el-container class="bg-light-100 rounded" :style="{ height: (h + 'px') }">
        <el-header class="img-header">
            <el-button @click="handleOpenCreate" type="primary" size="small">
                新增图片分类
            </el-button>
            <el-button @click="handleUploadImage" type="primary" size="small">
                上传图片
            </el-button>
        </el-header>
        <el-container>
            <ImageAside ref="ImageAsideRef" @change="handleAsideChange"/>
            <ImageMain ref="ImangeMainRef"/>
        </el-container>
    </el-container>
</template>
<script setup>
import { ref } from 'vue';
import ImageAside from '~/components/ImageAside.vue'
import ImageMain from '~/components/ImageMain.vue'

// 实现动态container内容
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40

const ImageAsideRef = ref(null)
const handleOpenCreate = ()=> ImageAsideRef.value.handleCreate()

const ImangeMainRef = ref(null)
const handleAsideChange = (image_class_id)=> {
    ImangeMainRef.value.LoadData(image_class_id)
}

const handleUploadImage = ()=>ImangeMainRef.value.openUploadFile()
</script>
<style >
.img-header {
    @apply flex items-center;
    border-bottom: 1px solid #eeee;
}


</style>