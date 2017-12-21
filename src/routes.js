import Vue from 'vue'
import Router from 'vue-router'
// 路由文件，引用各业务模块路由
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

import Login from './views/login/Login.vue'
import Employee from './views/orgmgt/employee/Employee.vue'
/*
// 配置路由
Vue.use(Router)

// 定义路由实例
export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/login',
        component: Login,
        name: '用户登录',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '参考样例',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '组织管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '组织架构' },
            { path: '/page4', component: Page4, name: '部门管理' },
            { path: '/Employee', component: Employee, name: '员工管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '安全管理',
        iconCls: 'fa fa-address-card',
        //leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '用户管理' },
            { path: '/page6', component: Page6, name: '角色管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '分析报表',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
    ]
});
*/

export default [
    {
        path: '/login',
        component: Login,
        name: '用户登录',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '参考样例',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '组织管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '组织架构' },
            { path: '/page4', component: Page4, name: '部门管理' },
            { path: '/Employee', component: Employee, name: '员工管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '安全管理',
        iconCls: 'fa fa-address-card',
        //leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '用户管理' },
            { path: '/page6', component: Page6, name: '角色管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '分析报表',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];
/*
export default route;
*/