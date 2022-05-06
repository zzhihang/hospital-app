import doctorRouterConfig from './doctorRouterConfig'
import PatientRouterView from "@/components/PatientRouterView";

let routes = [{
    path: '/user/app',
    name: 'patientApp',
    component: PatientRouterView,
    meta: { title: '主页' },
    redirect: '/app',
    children: [{
        path: '/login',
        component: r => require.ensure([], () => r(require('@routes/login'))),
        meta:{
            title: '登录',
            //keepAlive: true
        }
    },{
        path: '/auth',
        component: r => require.ensure([], () => r(require('@routes/auth'))),
        meta:{
            title: '登录',
        }
    },{
        path: '/app',
        component: r => require.ensure([], () => r(require('@routes/app'))),
        meta:{
            title: '普林互联网医院',
        }
    },{
        path: '/search',
        name: 'search',
        component: r => require.ensure([], () => r(require('@routes/app/search'))),
        meta:{
            title: '搜索',
        }
    },{
        path: '/search/disease',
        name: 'entry_disease',
        component: r => require.ensure([], () => r(require('@routes/app/search/entry_disease'))),
        meta:{
            title: '按疾病找',
        }
    },{
        path: '/search/disease',
        name: 'entry_disease',
        component: r => require.ensure([], () => r(require('@routes/app/search/entry_disease'))),
        meta:{
            title: '按疾病找',
        }
    },{
        path: '/search/hospital',
        name: 'entry_hospital',
        component: r => require.ensure([], () => r(require('@routes/app/search/entry_hospital'))),
        meta:{
            title: '按医院找',
        }
    },{
        path: '/doctor/detail',
        component: r => require.ensure([], () => r(require('@routes/app/doctor'))),
        meta:{
            title: '医生详情',
        }
    },{
        path: '/doctor/appoint',
        name: 'doctorAppoint',
        component: r => require.ensure([], () => r(require('@routes/app/doctor/doctor_appoint'))),
        meta:{
            title: '医生预约',
        }
    },{
        path: '/doctor/choose_patient',
        name: 'choose_patient',
        component: r => require.ensure([], () => r(require('@routes/app/doctor/choose_patient'))),
        meta:{
            title: '选择就诊人',
        }
    },{
        path: '/doctor/choose_time',
        name: 'choose_time',
        component: r => require.ensure([], () => r(require('@routes/app/doctor/choose_time'))),
        meta:{
            title: '就诊时间',
        }
    },{
        path: '/my',
        component: r => require.ensure([], () => r(require('@routes/app/my'))),
        meta:{
            title: '我的',
        }
    },{
        path: '/my/family',
        name: 'family',
        component: r => require.ensure([], () => r(require('@routes/app/my/family'))),
        meta:{
            title: '就诊人管理',
        }
    },{
        path: '/my/family/add',
        name: 'familyAdd',
        component: r => require.ensure([], () => r(require('@routes/app/my/family_add'))),
        meta:{
            title: '添加就诊人',
        }
    },{
        path: '/order/confirm',
        name: 'orderConfirm',
        component: r => require.ensure([], () => r(require('@routes/app/order/order_confirm'))),
        meta:{
            title: '确认订单',
        }
    },{
        path: '/order/my_order',
        name: 'myOrder',
        component: r => require.ensure([], () => r(require('@routes/app/order/my_order'))),
        meta:{
            title: '我的订单',
        }
    },{
        path: '/focus',
        name: 'focus',
        component: r => require.ensure([], () => r(require('@routes/app/focus/focus_list'))),
        meta:{
            title: '关注列表',
        }
    }]
}
];

routes = routes.concat(doctorRouterConfig);

export default routes;
