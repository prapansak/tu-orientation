const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: ['./src/index.js','./src/styles/antd/main.less','./src/styles/main.scss'],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: 'babel-loader',
                options: {
                    presets: ['es2015','react'],
                    plugins: [
                        ["import", { libraryName: "antd", style: true }]
                    ]
                }
            },{
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            sourceMap: false,
                            module: false
                        }
                    },{
                        loader:'sass-loader',
                        options:{
                            sourceMap: false
                        }
                    }
                ]
            },{
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        new ExtractTextPlugin('style.css')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "app.js"
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 8080
    }
};

module.exports = config;