import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'

//  dangerouslyUseHTMLString 是否解析HTML界面
export function toast(message, type = "success", dangerouslyUseHTMLString = true) {
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration: 3000
    })
}

export function showModel(content = "提示内容", type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type,
        }
    )
}

export function showFullLoading(){
    nprogress.start();
}

export function hideFullLoading(){
    nprogress.done();
}

// 消息提示弹出框
export function ShowPrompt(tip,value=""){
    return ElMessageBox.prompt(tip,'', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        // 输入框的初始文本
        inputValue:value
      })
}

