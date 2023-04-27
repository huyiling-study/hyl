// 拿到创建完返回的axios实例
import axios from "~/axios";

export function login(username,password){
    // 返回promise对象
    return axios.post('/admin/login',{
        username,
        password
    })
}

// 获取用户信息
export function getInfo(){
    return axios.post('/admin/getinfo')
}

// 退出登录
export function logout(){
    return axios.post('/admin/logout')
}

// 修改密码
export function updatepassword(data){
    return axios.post('/admin/updatepassword',data)
}

