<template>
    <el-aside class="img-aside" width="200px" v-loading="loading">
        <div class="top">
            <!-- :active="activeId == item.id" 实现列表动态激活样式 -->
           <AsideList :active="activeId == item.id" v-for="(item,index) in list" :key="index" 
           @edit="handleEdit(item)" @delete="handleDelete(item.id)" 
           @click="handleChangeActiveId(item.id)">
            {{ item.name }}
           </AsideList>
        </div>
        <!-- 底部分页 -->
        <div class="bottom">
            <el-pagination background layout="prev, next" 
            :total="total"
            :page-size="limit"
            :current-page="currentPage"
           @current-change="getData()"/>
        </div>
    </el-aside>

    <FormDrawer :title="drawerTitle" ref="fromDrawerRef" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="1000"></el-input-number>
            </el-form-item>
        </el-form>
    </FormDrawer>

</template>
<script setup>
import { getImageClassList,CreateImageClass,UpdateImageClass,DeleteImageClass} from '~/api/image_class'
import { ref,reactive,computed } from 'vue';
import AsideList from './AsideList.vue';
import FormDrawer from './FormDrawer.vue'
import { toast } from '~/composables/util'


const loading = ref(false)
const list = ref([])


// 当前页面，总的条数，页面显示条数
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

const editId = ref(0)


// 表单
// 定义表单字段
const form = reactive({
    name: "",
    order:50
})
// 表单规则
const rules = {
    name: [
        { required: true, message: '分类名称不能为空', trigger: 'blur' }
    ] ,
    order: [
        { required: true, message: '排序不能为空', trigger: 'blur' }
    ]  
}
// ref用于表单验证
const formRef = ref(null)
const handleSubmit = ()=>{
    formRef.value.validate((valid) => {
        if (!valid) return

        fromDrawerRef.value.showLoading()

        const fun = editId.value ? UpdateImageClass(editId.value,form):CreateImageClass(form)

        fun.then((res)=>{
            toast(drawerTitle.value+"成功")
            getData(editId.value?currentPage.value:1)
            fromDrawerRef.value.close()
        })
        .finally(()=> fromDrawerRef.value.hideLoading())
    })
}

// 获取数据
function getData(p=null){
    if(typeof p == "number"){
        currentPage.value = p
    }

    loading.value = true
    //请求页面为1的数据
    getImageClassList(currentPage.value)
        .then(res => {
            // console.log(res);
            total.value = res.totalCount
            list.value = res.list
            // 默认选中激活
            let item = list.value[0]
            if(item){
                handleChangeActiveId(item.id)
            }
        })
        .finally(() => {
            loading.value = false
        })
}
getData()

const flag=ref(false)
const drawerTitle = computed(()=>{return flag.value ? "修改":"新增"})


const fromDrawerRef = ref(null)
// 新增
const handleCreate = ()=>{
    flag.value=false
    editId.value = 0
    form.name = ""
    form.order = 50
    fromDrawerRef.value.open()
}

// 编辑
const handleEdit = (row)=>{
    flag.value=true
    editId.value = row.id
    form.name = row.name
    form.order = row.order
    fromDrawerRef.value.open()
    
}

// 删除
const handleDelete = (id)=>{
    loading.value = true
    DeleteImageClass(id)
    .then(res=>{
        // console.log(res);
        toast('删除成功')
        getData()
    })
    .finally(()=>{
        loading.value = false
    })
}

// 当前激活的图库分类id
const activeId = ref(0)
//暴露change方法
const emit =  defineEmits(["change"])
// 切换分类
const handleChangeActiveId = (id)=>{
    activeId.value = id
    // 通知父组件接收
    emit('change',id)
}


defineExpose({
    handleCreate
})



</script>
<style scoped>
.img-aside {
    border-right: 1px solid #eeee;
    position: relative;
}

.img-aside .top {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 70px;
    overflow-y: auto;
}

.img-aside .bottom {
    position: absolute;
    height: 50px;
    bottom: 0;
    right: 0;
    left: 0;
    @apply flex justify-center items-center;
}
</style>
