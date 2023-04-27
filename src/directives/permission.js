
// 大bug视频没解决
// import store from "~/store"
// function hasPermission(value,el=false){
//     // 判断value是不是数组
//     if(!Array.isArray(value)){
//         throw new Error(`需要配置，例如v-permission="['getStatistics3,GET']"`)
//     }
//     // 查找ruleNames相匹配的别名
//     const hasAuth = value.findIndex(v=>store.state.ruleNames.includes(value))!=-1
//     if(el && !hasAuth){
//         el.parentNode && el.parentNode.removeChild(el)
//     }
//     return hasAuth
// }


// 自定义指令
export default {
    install(app){
        // 注册一个全局自定义指令
        app.directive("permission",{
            // vue在自定义指令内给我们提供的钩子
            // el是Dom节点，binding
            mounted(el,binding) {
                // hasPermission(binding.value,el)
            },
        })
    }
}