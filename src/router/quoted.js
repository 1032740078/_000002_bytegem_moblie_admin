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
                path: '/quoted',
                component: () => import('../views/quoted/index.vue'),
                name: '报价目录'
            },
            {
                path: '/quoted_class/:id',
                component: () => import('../views/quoted/quoted_class.vue'),
                name: '报价模块分类列表'
            },
            {
                path: '/quoted_module/:id',
                component: () => import('../views/quoted/quoted_module.vue'),
                name: '报价模块'
            }
        ]
    },
];

export default quoted;

