<template>
    <template v-if="panels.length == 0">
        <el-col :span="6" v-for="i in 4" :key="i" >
            <el-skeleton style="width: 100%" animated loading>
                <template #template>
                    <el-card shadow="hover" class="border-0">
                        <template #header>
                            <div class="flex justify-between">
                                <el-skeleton-item variant="text" style="width: 50%;" />
                                <el-skeleton-item variant="text" style="width: 10%;" />
                            </div>
                        </template>
                        <el-skeleton-item variant="h3" style="width: 80%;" />
                        <el-divider />
                        <div class="flex justify-between text-sm text-gray-500">
                            <el-skeleton-item variant="text" style="width: 50%;" />
                            <el-skeleton-item variant="text" style="width: 10%;" />
                        </div>
                    </el-card>
                </template>
            </el-skeleton>
        </el-col>
    </template>


    <div>
        <el-row :gutter="20">
            <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                        <div class="flex justify-between">
                            <span class="text-sm">{{ item.title }}</span>
                            <el-tag :key="item.label" :type="item.unitColor" effect="plain">
                                {{ item.unit }}
                            </el-tag>
                        </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        <CountTo :value="item.value" />
                    </span>
                    <el-divider />
                    <div class="flex justify-between">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>

    <IndexNavs />

    <el-row :gutter="20" class="mt-5">
        <el-col :span="12" :offset="0">
                <IndexChart v-permission="['getStatistics3,GET']"/>
        </el-col>
        <el-col :span="12" :offset="0">
            <!-- 定义btns属性 把goods数据传过去 -->
            <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods"/>
            <IndexCard title="交易提示" tip="交易需要处理的交易订单" :btns="order" class="mt-4"/>
        </el-col>
    </el-row>
</template>

<script setup>
import { getStatistics1,getStatistics2} from '../api/index'
import { ref } from 'vue';
import CountTo from '~/components/CountTo.vue'
import IndexNavs from '~/components/IndexNavs.vue';
import IndexChart from '~/components/IndexChart.vue';
import IndexCard from '../components/IndexCard.vue';

const panels = ref([])

getStatistics1()
    .then(res => {
        panels.value = res.panels
    })



const goods = ref([])
const order = ref([])
getStatistics2().then(res=>{
   goods.value = res.goods
   order.value = res.order
})
</script>

