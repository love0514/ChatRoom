const webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: {
        main: path.join(__dirname, './client/src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, './client/dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
            test: /\.js$|.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react'], plugins: ["transform-decorators-legacy", "transform-class-properties"] 
              }
        }, {
            test: /\.(scss|sass|css)$/,
            use: ['style-loader', 'css-loader','sass-loader']
        }, {
            test: /\.(png|jpg|jpng|eot|ttf)$/,
            loader: 'url-loader?limit=8192&name=images/[name].[ext]'
        }]

    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require("./client//dist/vendor.manifest.json"),
        }),
    ], devServer: {
        contentBase: path.resolve(__dirname, "./client/dist"),
        historyApiFallback: {
            // rewrites:[
            //     {from:/./,to:'./index.html'}
            //  ]
        },
        host:"192.168.1.161",
        // https:true,
        inline: true,
        port: 8001,
        open: true
    }
};