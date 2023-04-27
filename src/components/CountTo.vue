<!-- 后台首页卡片 -->
<template>
    <div>
        {{ d.num.toFixed() }}
    </div>
</template>
<script setup>
import gsap from "gsap";
import {reactive,watch} from 'vue'

const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})

const d = reactive({
    num:0
})

// 动画加载数字优化
function AnimatedToValue(){
    // gsap库的to方法
    gsap.to(d,{
        duration:0.5,
        num:props.value
    })
}

AnimatedToValue()

// 监听props.value有没有变化，变化了就重新执行AnimatedToValue()
watch(()=>props.value,()=>{
    AnimatedToValue()   
})
</script>