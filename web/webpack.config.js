var webpack = require('webpack');
var path = require('path');

var config = {
    entry: ['./src/index.js','./src/styles/main.scss'],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            },{
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loaders: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        query:{
                            sourceMap: false,
                            module: false
                        }
                    },{
                        loader:'sass-loader',
                        query:{
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'develop'
        })
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