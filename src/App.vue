<script setup>

</script>

<template>
  <router-view></router-view>
</template>

<style>
body{
  @apply bg-gray-100;
}
#nprogress .bar {
    background: #98d0f0;
    width: 3px;
}
/* 设置滚动条样式 */
::-webkit-scrollbar{
  width: 4px;
  height: 7px;
}
::-webkit-scrollbar-corner{
  display: block;
}

::-webkit-scrollbar-thumb{
  border-radius: 8px;
  background-color: rgba(0,0,0,0.3);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
  border-right-color:transparent ;
  border-left-color:transparent ;
  background-color: rgba(0,0,0,0.05);
}
</style>
