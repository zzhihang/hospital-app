/**
* @Description: 医生路由
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/6 21:17
*/
import RouteView from 'components/DoctorRouterView'
const routes = [
    {
        path: '/doctor',
        name: 'doctorApp',
        component: RouteView,
        meta: { title: '主页' },
        redirect: '/doctor/app',
        children: [{
            path: '/doctor/login',
            component: r => require.ensure([], () => r(require('@routes/doctor/login'))),
            meta:{
                title: '登录',
            }
        },{
            path: '/doctor/auth',
            component: r => require.ensure([], () => r(require('@routes/doctor/auth'))),
            meta:{
                title: '登录',
            }
        },{
            path: '/doctor/app',
            component: () => import(/* webpackChunkName: "fail" */ '@/routes/doctor/index'),
            meta: { title: '主页'},
        },{
            path: '/doctor/fans',
            name: 'fansList',
            component: r => require.ensure([], () => r(require('@routes/doctor/fans/fans_list'))),
            meta:{
                title: '粉丝列表',
            }
        },{
            path: '/doctor/my',
            component: r => require.ensure([], () => r(require('@routes/doctor/my'))),
            meta:{
                title: '我的',
            }
        },{
            path: '/doctor/my/info',
            name: 'doctorInfo',
            component: r => require.ensure([], () => r(require('@routes/doctor/my/my_info'))),
            meta:{
                title: '个人信息',
            }
        },{
            path: '/doctor/order',
            name: 'doctorOrderList',
            component: r => require.ensure([], () => r(require('@routes/doctor/order/my_order'))),
            meta:{
                title: '我的订单',
            }
        },{
            path: '/doctor/order/detail',
            name: 'doctorOrderDetail',
            component: r => require.ensure([], () => r(require('@routes/doctor/order/order_detail'))),
            meta:{
                title: '订单详情',
            }
        },{
            path: '/doctor/service/add',
            name: 'serviceAdd',
            component: r => require.ensure([], () => r(require('@routes/doctor/my/service_add'))),
            meta:{
                title: '新增服务项目',
            }
        },{
            path: '/doctor/message',
            name: 'doctorMessage',
            component: r => require.ensure([], () => r(require('@routes/doctor/message'))),
            meta:{
                title: '消息',
            }
        },{
            path: '/doctor/chat',
            name: 'doctorChat',
            component: r => require.ensure([], () => r(require('@routes/doctor/message/chat'))),
            meta:{
                title: '聊天室',
            }
        }]
    },
];

export default routes;
