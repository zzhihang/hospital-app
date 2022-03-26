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
    },{
        path: '/message',
        component: r => require.ensure([], () => r(require('@routes/message'))),
        meta:{
            title: '消息'
        }
    },{
        path: '/order/detail',
        component: r => require.ensure([], () => r(require('@routes/order/order_detail'))),
        meta:{
            title: '订单详情'
        }
    },{
        path: '/my',
        component: r => require.ensure([], () => r(require('@routes/my'))),
        meta:{
            title: '我的'
        }
    },{
        path: '/my/info',
        component: r => require.ensure([], () => r(require('@routes/my/info'))),
        meta:{
            title: '编辑资料'
        }
    },{
        path: '/my/edit_name',
        component: r => require.ensure([], () => r(require('@routes/my/edit_name'))),
        meta:{
            title: '昵称'
        }
    },{
        path: '/my/edit_avatar',
        component: r => require.ensure([], () => r(require('@routes/my/edit_avatar'))),
        meta:{
            title: '头像'
        }
    },


];

export default routes;
