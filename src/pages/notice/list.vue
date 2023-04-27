<template>
    <el-card shadow="never" class="border-0">
        <div class="title">
            <el-button type="primary" size="small" @click="handleOpenDrawer">新增</el-button>
            <el-tooltip class="box-item" effect="dark" content="刷新" placement="top">
                <el-button text @click="getData">
                    <el-icon :size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="创建时间" width="380" />
            <el-table-column label="Name" width="180">
                <template #default="scope">
                    <!-- @comfirm="handleEdit(scope.row)"可以拿到当前对象 -->
                    <el-button text type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                    <!-- @confirm="handleDelete(scope.row.id)"可以拿到当前对象的id -->
                    <el-popconfirm title="是否要删除该公告？" @confirm="handleDelete(scope.row.id)" confirm-button-text="确认" cancel-button-text="取消">
                        <template #reference>
                            <el-button type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="bottom">
            <el-pagination background layout="prev,pager, next" :total="total" :page-size="limit"
                :current-page="currentPage" @current-change="getData()" />
        </div>

        <FormDrawer ref="formDrawerRef" @submit="handleSubmit" :title="drawerTitle" >
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" >
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题" />
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" type="textarea" placeholder="公告内容" :rows="5" />
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>
</template>

<script setup>
import { ref, reactive ,computed} from 'vue'
import { getNoticeList, createNotice,deleteNotice,updateNotice } from '~/api/notice'
import FormDrawer from '~/components/FormDrawer.vue'
import {toast} from '~/composables/util'
const loading = ref(false)

const tableData = ref([])

const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

// 控制编辑修改
const editId = ref(0)
// 抽屉组件标题切换（有id说明公告存在，我们就修改。没有id，就说明我们添加一个新的id）
const drawerTitle = computed(()=>editId.value?"修改":"新增")



// 获取数据
function getData(p = null) {
    if (typeof p == "number") {
        currentPage.value = p
    }

    loading.value = true
    getNoticeList(currentPage.value)
        .then(res => {
            // console.log(res);
            tableData.value = res.list
            total.value = res.totalCount
        })
        .finally(() => {
            loading.value = false
        })
}
getData()

// 删除公告
// @confirm="handleDelete(scope.row.id)"已经拿到id了
const handleDelete = (id) => {
    loading.value = true
    deleteNotice(id).then(res=>{
        toast("删除成功")
        getData()
    }).finally(() => {
        loading.value = false
    })
}

// 表单相关
const formDrawerRef = ref()
const formRef = ref()
const form = reactive({
    title: "",
    content: ""
})

const rules = {
    title: [
        {required: true, message: '公告标题不能为空', trigger: 'blur'}
    ],
    content: [
        {required: true, message: '公告内容不能为空', trigger: 'blur'}
    ]
}


// 提交
const handleSubmit = () => {
    // 触发表单参数验证
    formRef.value.validate((valid) => {
        if (!valid) return
        // 显示提交按钮的loading
        formDrawerRef.value.showLoading()

        const change = editId.value?updateNotice(editId.value,form):createNotice(form)
        // 调用新增公告方法
        change.then(res => {
            // 新增公告要执行的事
            toast(drawerTitle.value+"成功")
            // 修改刷新当前页，新增刷新第一页
            getData(editId.value?false:1)
            formDrawerRef.value.close()//关闭表单
        }).finally(() => {
            formDrawerRef.value.hideLoading()
        })
    })
}

// 重置表单(修改表单保留原值)
function resetForm(row=false){
    // 是否能拿到表单节点(若存在清除原来的验证规则)
    if(formRef.value) formRef.value.clearValidate()
    if(row){
        for(const key in form){
            form[key] = row[key]
        }
    }
}

// 新增公告
const handleOpenDrawer = () => {
    editId.value = 0
    resetForm({
        title:"",
        content:""
    })
    formDrawerRef.value.open()
}

// 修改公告
const handleEdit = (row)=>{
    console.log(row);
    editId.value = row.id
    resetForm(row)
    formDrawerRef.value.open()
}


</script>
<style scoped>
.title {
    @apply flex items-center justify-between mb-4;
}

.bottom {
    @apply flex items-center justify-center mt-2;
}
</style>