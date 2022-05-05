const routes = [
    {
        path: '/doctor/app',
        component: r => require.ensure([], () => r(require('@routes/doctor/index'))),
        meta:{
            title: '登录',
            //keepAlive: true
        }
    },{
        path: '/doctor/fans',
        component: r => require.ensure([], () => r(require('@routes/doctor/fans/fans_list'))),
        meta:{
            title: '粉丝列表',
            //keepAlive: true
        }
    }
];

export default routes;
