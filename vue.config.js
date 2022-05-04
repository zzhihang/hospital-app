/**
 * @Description vue.config.js 通过merge会覆盖脚手架一些默认配置
 * @Param
 * @return
 * @Author zzhihang@hotmail.com
 * @Date 2021/3/30 11:31
 **/
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const target = 'http://hiswx.shouzimu.xyz';

module.exports = {
    publicPath: '/',
    lintOnSave: false, //禁用eslint
    outputDir: 'dist',
    productionSourceMap: !IS_PROD, //生产环境不需要sourceMap
    devServer: {
        compress: true,
        disableHostCheck: true,
        port: 8083,
        proxy: {
            '/api': {
                target: target,
                changeOrigin: true,
                ws: true,
            },
            '/testLogin': {
                target: target,
                changeOrigin: true,
                ws: true,
            },
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    // 设计稿使用375标准的 直接写px
                    require('postcss-px2rem')({remUnit: 37.5}),
                ]
            },
            less: {
                lessOptions: {
                    modifyVars: {
                        hack: `true; @import "/src/static/css/vant-variable.less";`,
                    },
                },
            }
        }
    },
    configureWebpack: config => {
        // config.externals = {
        //     vue: "Vue",
        //     axios: "axios",
        //     "vue-router": "VueRouter"
        // };
        const plugins = []; //额外插件
        if (IS_PROD) {
            config.optimization = {
                splitChunks: {
                    cacheGroups: {
                        common: {
                            name: "chunk-common",
                            chunks: "initial",
                            minChunks: 2,
                            maxInitialRequests: 5,
                            minSize: 0,
                            priority: 1,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        vendors: {
                            name: "chunk-vendors",
                            test: /[\\/]node_modules[\\/]/,
                            chunks: "initial",
                            priority: 2,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        vant: {
                            name: "chunk-vant",
                            test: /[\\/]node_modules[\\/]vant[\\/]/,
                            chunks: "all",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        vue: {
                            name: "chunk-vue",
                            test: /[\\/]node_modules[\\/]vue[\\/]/,
                            chunks: "all",
                            priority: 4,
                            reuseExistingChunk: true,
                            enforce: true
                        }
                    }
                }
            };
        }
        // plugins.push(
        //     new CompressionWebpackPlugin({
        //         filename: "[path].gz[query]",
        //         algorithm: "gzip",
        //         test: productionGzipExtensions,
        //         threshold: 10240,
        //         minRatio: 0.8
        //     })
        // );
        config.plugins = [...config.plugins, ...plugins];
    },
    chainWebpack: config => {
        if (IS_PROD) {
            config.optimization.delete("splitChunks");
            config.optimization.minimize(true)
            // config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
            //     {
            //         analyzerMode: "static"
            //     }
            // ]);
            //关闭预加载关闭prefetch
            //vuecli4 默认开启prefetch(预先加载模块)，提前获取用户未来可能会访问的内容在首屏会把这十几个路由文件都下载下来
            config.plugins.delete('prefetch')
            config.plugins.delete('preload')
        }
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('@static', resolve('src/static'))
            .set('@service', resolve('src/service'))
            .set('@routes', resolve('src/routes'))
            .set('store', resolve('src/store'))
            .set('components', resolve('src/components'));

        const cdn = {
            // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
            css: [],
            js: []
        };

        //修改vue-cli4中htmlplugin参数
        config.plugin('html')
            .tap(args => {
                args[0].title = ''
                args[0].cdn = cdn;
                return args;
            })
        return config;
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: ['./src/static/css/variables.less']
        }
    }
}
