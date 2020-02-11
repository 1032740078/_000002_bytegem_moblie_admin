/**
 * 首页图片管理
 * */

const quoted = [
    {
        path: '/',
        meta: {roule: 1},//角色路由权限
        component: () => import('../views/Home.vue'),
        name: '',
        iconCls: 'fa iconfont icon-data-dial',
        leaf: true,//只有一个节点
        children: [
            {
                path: '/employee',
                component: () => import('../views/employee/index.vue'),
                name: '联系人'
            },
        ]
    },
];

export default quoted;

