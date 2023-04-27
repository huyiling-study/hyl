import { createStore } from 'vuex'
import { setToken } from '~/composables/auth'
import { login, getInfo } from '../api/manager'
import { removeToken } from '~/composables/auth'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            // 用户信息
            user: {},

            // 定义侧边栏宽度
            asideWidth: "250px",
            menus: [],
            ruleNames: []
        }
    },
    mutations: {
        SET_USERINFO(state, user) {
            state.user = user
        },
        // 展开/收缩侧边栏
        handleAsideWidth(state) {
            // console.log(state.asideWidth);
            state.asideWidth = state.asideWidth == "250px" ? "64px" : '250px';
        },
        SET_MENUS(state, menus) {
            // console.log(menus);
            state.menus = menus
        },
        SET_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames
        }
    },
    actions: {
        // 登录
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password)
                .then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },

        // 获取当前用户登录信息
        // 为什么有{commit}，其实就是结构出这个方法，用commit来触发函数
        getInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    // console.log(res);
                    commit("SET_USERINFO", res)
                    commit("SET_MENUS", res.menus)
                    commit("SET_RULENAMES", res.ruleNames)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        // 退出登录
        logout({ commit }) {
            // 移除cookie里的token
            removeToken()
            // 清除当前用户状态
            commit("SET_USERINFO", {})
        }
    }
})

export default store