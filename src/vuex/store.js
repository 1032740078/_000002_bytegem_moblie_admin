import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    apiAddr: 'http://api.zhongyuanzgh.com',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : false,
    userId: localStorage.getItem('userId') ? Number(localStorage.getItem('userId')): false,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : false,
    role: localStorage.getItem('role') ? Number(localStorage.getItem('role')) : false,
    users_organization_id: localStorage.getItem('users_organization_id') ? Number(localStorage.getItem('users_organization_id')) : false,
}

// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    UP_TOKEN(state, newToken) {
        state.token = newToken
    },
    UP_users_organization_id(state, users_organization_id) {
        state.users_organization_id = users_organization_id
    },
    UP_role(state, role) {
        state.role = role
    },
    UP_userId(state, userId) {
        state.userId = userId
    },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
