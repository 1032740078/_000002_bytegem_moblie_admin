/**
 * 首页图片管理
 * */

const _case = [
    {
        path: '/',
        meta: {roule: 1},//角色路由权限
        component: () => import('../views/Home.vue'),
        name: '',
        iconCls: 'fa iconfont icon-data-dial',
        leaf: true,//只有一个节点
        children: [
            {
                path: '/case',
                component: () => import('../views/case/index.vue'),
                name: '案例管理'
            },
            {
                path: '/case_info_list/:id',
                component: () => import('../views/case/case_info_list.vue'),
                name: '案例信息列表'
            }
        ]
    },
];

export default _case;

