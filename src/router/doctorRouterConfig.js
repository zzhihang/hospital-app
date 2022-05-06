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
                //keepAlive: true
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
            component: r => require.ensure([], () => r(require('@routes/doctor/fans/fans_list'))),
            meta:{
                title: '粉丝列表',
                //keepAlive: true
            }
        },{
            path: '/doctor/my',
            component: r => require.ensure([], () => r(require('@routes/doctor/my'))),
            meta:{
                title: '我的',
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
