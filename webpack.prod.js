const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path=require('path');

module.exports={
    entry: {
        home: path.resolve(__dirname,'src')
    },
    output:{
        path: path.resolve(__dirname,'dir'),
        filename: '[name]-bundle.js'
    },
    mode: 'production',
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|mp3|mp4)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 9000
                    }    
                }],
            },
            {
                test: /\.svg$/,
                use: '@svgr/webpack'
            },
            {
                test: /\.(s[ac]ss|css)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
            },
            
        ]
    },
    plugins:[
        new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'style.css'}),
    ],
    optimization:{
        minimizer:[
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname,'src','index.html'),
                favicon: path.resolve(__dirname,'src','assets','images','pokemon.ico'),
                minify:{
                    removeAttributeQuotes: true,
                    removeComments: true,
                    collapseWhitespace: true
                }
                }),
        ]
    }
}