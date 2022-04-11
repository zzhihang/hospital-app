const routes = [
    {
        path: '/login',
        component: r => require.ensure([], () => r(require('@routes/login'))),
        meta:{
            title: '登录'
        }
    }, {
        path: '/topic',
        component: r => require.ensure([], () => r(require('@routes/topic'))),
        meta:{
            title: '知识专题',
            showTabBar: true
        },
    },{
        path: '/topic/detail',
        component: r => require.ensure([], () => r(require('@routes/topic/detail'))),
        meta:{
            title: '专题详情'
        },
    },{
        path: '/topic/dynamic_detail',
        component: r => require.ensure([], () => r(require('@routes/topic/topicCardDetail'))),
        meta:{
            title: '专题详情'
        },
    },{
        path: '/topic/create',
        component: r => require.ensure([], () => r(require('@routes/topic/create'))),
        meta:{
            title: '创建专题'
        }
    },{
        path: '/message',
        component: r => require.ensure([], () => r(require('@routes/message'))),
        meta:{
            title: '消息',
            showTabBar: true
        }
    },{
        path: '/order',
        component: r => require.ensure([], () => r(require('@routes/order'))),
        meta:{
            title: '钱包明细'
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
            title: '我的',
            showTabBar: true
        }
    },{
        path: '/my/info',
        component: r => require.ensure([], () => r(require('@routes/my/info'))),
        meta:{
            title: '编辑资料'
        }
    },{
        path: '/my/wallet',
        component: r => require.ensure([], () => r(require('@routes/my/wallet'))),
        meta:{
            title: '我的钱包'
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
    },{
        path: '/dynamic',
        component: r => require.ensure([], () => r(require('@routes/dynamic'))),
        meta:{
            title: '发布动态'
        }
    },{
        path: '/label_list',
        component: r => require.ensure([], () => r(require('@routes/dynamic/labelList'))),
        meta:{
            title: '管理标签'
        }
    },{
        path: '/pay',
        component: r => require.ensure([], () => r(require('@routes/pay/pay'))),
        meta:{
            title: '订单详情'
        }
    },{
        path: '/pay/success',
        component: r => require.ensure([], () => r(require('@routes/pay/paySuccess'))),
        meta:{
            title: '支付成功'
        }
    },{
        path: '/pay/fail',
        component: r => require.ensure([], () => r(require('@routes/pay/payFail'))),
        meta:{
            title: '支付失败'
        }
    }

];

export default routes;
