<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, from) in options" :key="index" :checked="current == item.value"
                        style="margin-right: 8px" @click="handleChoose(item.value)">{{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
        <!-- card body部分 -->
        <div ref="el" id="chart" style="width: 100%; height: 300px;">

        </div>
    </el-card>
</template>
<script setup>
// // 为什么使用onMounted ，因为我们要注入echarts柱状图，要等页面渲染完才可以拿到DOM
import { ref, onMounted, onBeforeMount } from 'vue';
import * as echarts from 'echarts';
import { getStatistics3 } from '~/api/index';
import { useResizeObserver } from '@vueuse/core'


// // 定义可选中（默认选中近一周）
const current = ref("week")

const options = [
    {
        text: "近1个月",
        value: "month"
    },
    {
        text: "近1周",
        value: "week"
    },
    {
        text: "近24小时",
        value: "hour"
    },
]

// 点击切换当前tag
const handleChoose = (type) => {
    current.value = type
    // tag标签切换，图标对应的数据要改变
    getDate()
}


var myChart = null
onMounted(() => {
    // 参照echarts柱状图使用
    var chartDom = document.getElementById('chart');
    // if (chartDom) {
        myChart = echarts.init(chartDom);

        getDate()
    // }
})

// 卸载 
onBeforeMount(() => {
    if (myChart) echarts.dispose(myChart)
})


// 获取数据
function getDate() {
    let option = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    // 在获取数据前，加载loading
    myChart.showLoading();
    // 请求api接口
    getStatistics3(current.value)
        .then(res => {
            // console.log(res);
            option.xAxis.data = res.x
            option.series[0].data = res.y

            option && myChart.setOption(option);
        })
        .finally(() => {
            // 关闭loading
            myChart.hideLoading();
        })
}

// 图标大小自适应 --- myChart.resize() 方法是vueuse库的方法
const el = ref(null)
useResizeObserver(el, (entries) => myChart.resize())



</script>