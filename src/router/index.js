import home_image from './home_image.js'
import _case from './case.js'
import quoted from './quoted.js'
import employee from './employee.js'

const index = [
    {
        path: '/login',
        meta: {roule: '*'},
        component: () => import('../views/Login.vue'),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        meta: {roule: '*'},
        component: () => import('../views/404.vue'),
        name: '',
        hidden: true
    },
    {
        path: '*',
        meta: {roule: '*'},
        hidden: true,
        redirect: {path: '/404'}
    },
    // {
    //     path: '/',
    //     meta: {roule: 6},//只有角色为总公司才可以登陆
    //     component: () => import('../views/Home.vue'),
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         {path: '/page4', component: () => import('../views/nav2/Page4.vue'), name: '页面4'},
    //         {path: '/page5', component: () => import('../views/nav2/Page5.vue'), name: '页面5'}
    //     ]
    // },
    // {
    //     path: '/',
    //     meta: {roule: 6},//只有角色为总公司才可以登陆
    //     component: () => import('../views/Home.vue'),
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         {path: '/page6', component: () => import('../views/nav3/Page6.vue'), name: '导航三'}
    //     ]
    // },
    /** 首页图片管理 */
    ...home_image,
    ..._case,
    ...quoted,
    ...employee,
];

export default index;
