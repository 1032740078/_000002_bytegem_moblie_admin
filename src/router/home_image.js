/**
 * 案例管理管理
 * */

const home_image = [
    {
        path: '/',
        meta: {roule: 1},//角色路由权限
        component: () => import('../views/Home.vue'),
        name: '',
        iconCls: 'fa iconfont icon-data-dial',
        leaf: true,//只有一个节点
        children: [
            {
                path: '/',
                component: () => import('../views/home_image/index.vue'),
                name: '首页图片管理'
            }
        ]
    },
];

export default home_image;

