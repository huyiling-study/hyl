<template>
    <el-upload 
    drag 
    :action="uploadImage" 
    :headers="{
        token
    }" 
    name="img" 
    :data="data" 
    :on-success="uploadSuccess" 
    :on-error="uploadError" 
    multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>

<script setup>
import { uploadImage } from '~/api/image'
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/util'

// 用于测试非法token
// const token = ""
const token = getToken()
// console.log(token)

defineProps({
    data: Object,
})

const emit = defineEmits("[success]")

// 上传成功
const uploadSuccess = (response, uploadFile, uploadFiles) => {
    console.log(response);
    emit("success", {
        response, uploadFile, uploadFiles
    })

}

// 上传失败
const uploadError = (error, uploadFile, uploadFiles) => {
    console.log(error);
    // console.log(JSON.parse(error.message).msg);
    let msg = JSON.parse(error.message).msg || "上传失败"
    toast(msg,'error')

}



</script>