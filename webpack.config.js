'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./package');
const TerserPlugin = require('terser-webpack-plugin');
//const WebappWebpackPlugin = require('webapp-webpack-plugin');
//const SafariPinnedTabPlugin = require('./webpack/safari-pinned-tab-webpack-plugin');
const GoogleAnalyticsPlugin = require('./webpack/google-analytics-webpack-plugin');
const ServiceWorkerPlugin = require('./webpack/service-worker-webpack-plugin');

module.exports = (env, argv) => {

    const devMode = argv.mode !== 'production';

    let webpackConfig = {

        entry: './src/index.js',

        output: {
            path: path.resolve(__dirname, 'pub'),
            publicPath: '',
            filename: 'project.bundle.js'
        },

        module: {
            rules: [{
                test: [ /\.vert$/, /\.frag$/ ],
                use: 'raw-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }]
        },
        /*
        resolve: {
            extensions: ['*', '.js']
        },
        */
        plugins: [
            new HtmlWebpackPlugin({
                ...config,
                template: 'src/index.html'
            }),
            new webpack.DefinePlugin({
                'CANVAS_RENDERER': JSON.stringify(true),
                'WEBGL_RENDERER': JSON.stringify(true)
            })
        ],

        devServer: {
            contentBase: "./pub",
            host: "0.0.0.0",
            port: 8202
        }
    }

    if (!devMode) {

        webpackConfig.optimization = {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
            ]
        }

        /*
        webpackConfig.plugins.push(new WebappWebpackPlugin({
            logo: './src/coin.png',
            prefix: '',
            favicons: {
                path: '',
                background: '#584b53',
                theme_color: config.body.color,
                appName: config.shortName,
                appShortName: config.shortName,
                appDescription: config.description,
                developerName: config.author,
                developerURL: config.website,
                orientation: config.orientation,
                scope: './',
                start_url: './',
                version: config.version,
                icons: {
                    android: true,
                    coast: false,
                    yandex: false,
                    firefox: false,
                    windows: true,
                    appleIcon: true,
                    appleStartup: false,
                    favicons: true
                }
            }
        }));
        */

        //webpackConfig.plugins.push(new SafariPinnedTabPlugin( { color: config.body.color } ));
        webpackConfig.plugins.push(new GoogleAnalyticsPlugin( { id: config.gaId } ));
        webpackConfig.plugins.push(new ServiceWorkerPlugin( { version: config.version } ));

    }

    return webpackConfig;

};
