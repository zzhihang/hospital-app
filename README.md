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
