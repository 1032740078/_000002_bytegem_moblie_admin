import axios from 'axios';
import store from '../vuex/store.js'
import {Message} from 'element-ui';
import {Loading} from 'element-ui';
import Router from 'vue-router'

let loadingInstance
// console.log(store.state);
/** 请求URL */
axios.defaults.baseURL = process.env.API_SERVER_ADDR;
// axios.defaults.baseURL = 'http://api.zhongyuanzgh.com';
// axios.defaults.baseURL = 'http://robin666.iok.la';

/** 请求头参数 */
axios.defaults.headers.common['Authorization'] = 'Bearer ' + store.state.token;
axios.defaults.headers.common['userid'] = store.state.userId;
axios.defaults.headers.common['username'] = store.state.username;
axios.defaults.headers.common['orgid'] = store.state.users_organization_id;

/** 请求拦截器 */
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    /** Loading */
    loadingInstance = Loading.service({
        text: '数据加载中...',
        // target: document.querySelector('.content-container')
        target: document.querySelector('.container.el-row')
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/** 响应拦截器 */
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    /** 全局成功提示 */
    Message.success(response.data.message)

    /** Loading 关闭 */
    loadingInstance.$nextTick(() => {
        loadingInstance.close();
    });

    return response;
}, function (error) {

    /** Loading 关闭 */
    loadingInstance.$nextTick(() => {
        loadingInstance.close();
    });

    /** 全局接口错误处理 */
    let errorMsg = error.response
    switch (errorMsg.status) {
        case 400:
            Message.error(errorMsg.data.message)
            break
        case 422:
            Message.error("入参错误或入参缺少")
            break
        case 401:
            Message.error("登陆失效,请重新登陆")
            location.href = '#/login'
            break
        default:
            Message.error("请求失败")

    }

    // 对响应错误做点什么
    return Promise.reject(error);
});


/** 登陆  */
export const requestLogin = params => {
    return axios.post(`/api/v1/users/login`, params).then(res => res.data);
};


/** 首页图片新增  */
export const home_image_new = params => {
    return axios.post(`/api/v1/home_image/new`, params).then(res => res.data);
};
/** 首页图片查找  */
export const home_image_find = params => {
    return axios.post(`/api/v1/home_image/find`, params).then(res => res.data);
};
/** 首页图片更新  */
export const home_image_update = params => {
    return axios.post(`/api/v1/home_image/update`, params).then(res => res.data);
};
/** 首页图片删除 */
export const home_imageNew_delete = params => {
    return axios.post(`/api/v1/home_image/delete`, params).then(res => res.data);
};
// ==========================================================================
// 案例分类新增
export const case_class_new = params => {
    return axios.post(`/api/v1/case_class/new`, params).then(res => res.data);
};

// 案例分类查找 or list
export const case_class_find = params => {
    return axios.post(`/api/v1/case_class/find`, params).then(res => res.data);
};
// 案例分类修改
export const case_class_update = params => {
    return axios.post(`/api/v1/case_class/update`, params).then(res => res.data);
};
// 案例分类删除
export const case_class_delete = params => {
    return axios.post(`/api/v1/case_class/delete`, params).then(res => res.data);
};
// ==========================================================================
// 案例新增
export const case_info_new = params => {
    return axios.post(`/api/v1/case_info/new`, params).then(res => res.data);
};

// 案例查找 or list
export const case_info_find = params => {
    return axios.post(`/api/v1/case_info/find`, params).then(res => res.data);
};
// 案例修改
export const case_info_update = params => {
    return axios.post(`/api/v1/case_info/update`, params).then(res => res.data);
};

// 案例删除
export const case_info_delete = params => {
    return axios.post(`/api/v1/case_info/delete`, params).then(res => res.data);
};



// 报价目录新增
export const quoted_list_new = params => {
    return axios.post(`/api/v1/quoted_list/new`, params).then(res => res.data);
};
// 报价目录查找 or list
export const quoted_list_find = params => {
    return axios.post(`/api/v1/quoted_list/find`, params).then(res => res.data);
};
// 报价目录修改
export const quoted_list_update = params => {
    return axios.post(`/api/v1/quoted_list/update`, params).then(res => res.data);
};
// 报价目录删除
export const quoted_list_delete = params => {
    return axios.post(`/api/v1/quoted_list/delete`, params).then(res => res.data);
};


// 报价模块分类新增
export const quoted_class_new = params => {
    return axios.post(`/api/v1/quoted_class/new`, params).then(res => res.data);
};
// 报价模块分类查找 or list
export const quoted_class_find = params => {
    return axios.post(`/api/v1/quoted_class/find`, params).then(res => res.data);
};
// 报价模块分类修改
export const quoted_class_update = params => {
    return axios.post(`/api/v1/quoted_class/update`, params).then(res => res.data);
};
// 报价模块分类删除
export const quoted_class_delete = params => {
    return axios.post(`/api/v1/quoted_class/delete`, params).then(res => res.data);
};


// 报价模块新增
export const quoted_module_new = params => {
    return axios.post(`/api/v1/quoted_module/new`, params).then(res => res.data);
};
// 报价模块查找 or list
export const quoted_module_find = params => {
    return axios.post(`/api/v1/quoted_module/find`, params).then(res => res.data);
};
// 报价模块修改
export const quoted_module_update = params => {
    return axios.post(`/api/v1/quoted_module/update`, params).then(res => res.data);
};
// 报价模块删除
export const quoted_module_delete = params => {
    return axios.post(`/api/v1/quoted_module/delete`, params).then(res => res.data);
};


// 员工新增
export const employee_new = params => {
    return axios.post(`/api/v1/employee/new`, params).then(res => res.data);
};
// 员工查找 or list
export const employee_find = params => {
    return axios.post(`/api/v1/employee/find`, params).then(res => res.data);
};
// 员工修改
export const employee_update = params => {
    return axios.post(`/api/v1/employee/update`, params).then(res => res.data);
};
// 员工删除
export const employee_delete = params => {
    return axios.post(`/api/v1/employee/delete`, params).then(res => res.data);
};
