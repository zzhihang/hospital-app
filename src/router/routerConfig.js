const routes = [
    {
        path: '/index',
        component: r => require.ensure([], () => r(require('@routes/index'))),
        meta:{
            title: '首页'
        }
    }, {
        path: '/my_topic',
        component: r => require.ensure([], () => r(require('@routes/my_topic'))),
        meta:{
            title: '我的专题'
        }
    },{
        path: '/create_topic',
        component: r => require.ensure([], () => r(require('@routes/create_topic'))),
        meta:{
            title: '创建专题'
        }
    },


];

export default routes;
