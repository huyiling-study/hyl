<template>
    <el-main class="img-main" v-loading="loading">
        <div class="top p-3">
            <el-row :gutter="10">
                <el-col :span="6" :offset="0" v-for="(item, index) of list" :key="index">
                    <el-card shadow="hover" class="relative mb-3" :body-style="{ padding: 0 }">
                        <el-image :src="item.url" fit="cover" class="image" :preview-src-list="[item.url]"
                            :initial-index="0"></el-image>
                        <div class="image-title">{{ item.name }}</div>
                        <div class="imageButton">
                            <!-- 重命名按钮 -->
                            <el-button text size="small" type="primary" @click="handleEdit(item)">重命名</el-button>
                            <!-- 删除按钮 -->
                            <el-popconfirm title="确认删除该图片" confirm-button-text="确认" cancel-button-text="取消"	 @confirm="handleDelete(item.id)">
                                <template #reference>
                                    <el-button text size="small" type="primary">删除</el-button>
                                </template>
                            </el-popconfirm>    
                        </div>
                    </el-card>
                </el-col>
            </el-row>

        </div>
        <div class="bottom">
            <el-pagination background layout="prev,pager, next" :total="total" :page-size="limit"
                :current-page="currentPage" @current-change="getData()" />
        </div>
    </el-main>

    <el-drawer v-model="drawer" title="上传图片">
        <UploadFile :data="{image_class_id}" @click="handleUploadSuccess"/>
    </el-drawer>
</template>
<script setup>
import { ShowPrompt,toast } from '~/composables/util.js'
import { getImageList,updateImage,deleteImage } from '~/api/image.js'
import { ref } from 'vue';
import UploadFile from './UploadFile.vue';

const drawer = ref(false)
const openUploadFile = ()=>drawer.value = true

const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

const loading = ref(false)
const list = ref([])
const image_class_id = ref(168)

// 获取数据
function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p
    }

    loading.value = true
    getImageList(image_class_id.value, currentPage.value)
        .then(res => {
            // console.log(res);
            total.value = res.totalCount
            list.value = res.list
        })
        .finally(() => {
            loading.value = false
        })
}
getData()

// 根据id重新加载图片列表
const LoadData = (id) => {
    currentPage.value = 1
    image_class_id.value = id
    getData()
}

// 重命名
const handleEdit = (item) => {
    ShowPrompt('重命名', item.name)
        .then(({ value }) => {
            loading.value = true
            updateImage(item.id, value)
            .then(res=>{
                // 修改成功需要做的事情
                toast("修改成功")
                getData()
            }).finally(()=>{
                loading.value = false
            })
        })
}

// 删除图片
const handleDelete = (id)=>{
    loading.value = true
    deleteImage([id]).then(res=>{
        // 删除成功需要做的事情
        toast("删除成功")
        getData()
    }).finally(()=>{
        loading.value = false
    })
}

// 上传成功
const handleUploadSuccess = ()=>getData(1)

defineExpose({
    LoadData,
    openUploadFile
})


</script>

<style scoped> 
.img-main {
     position: relative;
 }

 .img-main .bottom {
     position: absolute;
     height: 50px;
     bottom: 0;
     right: 0;
     left: 0;
     @apply flex justify-center items-center;
 }

 .img-main .top {
     position: absolute;
     top: 0;
     right: 0;
     left: 0;
     bottom: 50px;
     overflow-y: auto;
 }

 .imageButton {
     @apply flex items-center justify-center p-2 !important
 }

 .image {
     @apply h-[150px];
     width: 100%;
 }

 .image-title {
     position: absolute;
     top: 122px;
     left: -1px;
     right: -1px;
     @apply text-sm trucncate text-gray-100 bg-opacity-50 bg-gray-800 px-1 py-1
 }
</style> 