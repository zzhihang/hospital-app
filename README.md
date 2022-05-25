# 项目文件配置

## router
项目路由配置文件

## components
项目公共组件存放 (目前有一些业务页面组件在里面，后续可以考虑页面级别的组件放置到/routes/xx/components下面 更规范一些)
其中公共组件在common下面，每个公共组件调用都有在顶部写重要的props以及回调事件。

## routes
项目pages页面存放 各种页面级的组件

## service
项目使用axios请求，此文件夹放置公共service和页面中业务service

## static
静态文件存放

- ### js
js下面放置了一些utils,考虑方法通用性
const全局常量


- ### vue.config.js
devserver本地跨域代理配置；
css lessp相关配置；
webpack额外配置优化项目打包；
项目支持gzip压缩js（目前服务端不支持）；
全局alias配置；
项目cdn配置，目前axios、vue、vue-router使用了cdn。

### 环信错误码

// 失败原因:
            // e.type === '603' 被拉黑
            // e.type === '605' 群组不存在
            // e.type === '602' 不在群组或聊天室中
            // e.type === '504' 撤回消息时超出撤回时间
            // e.type === '505' 未开通消息撤回
            // e.type === '506' 没有在群组或聊天室白名单
            // e.type === '501' 消息包含敏感词
            // e.type === '502' 被设置的自定义拦截捕获
            // e.type === '503' 未知错误
            
### 接口文档
https://knowledge.shouzimu.xyz/api/doc.html#/documentManager/OfficelineDocument-1.0%E7%89%88%E6%9C%AC

### Project setup

- 依赖安装
```
npm install
```

- 本地启动
```
npm run serve
proxy代理域名在vue.config.js中
```

- 打包上线
```
npm run build 之后提取dist文件夹放到服务器目录下
```
- 域名修改
```
env.config.js prod 生产环境 test测试环境
```
