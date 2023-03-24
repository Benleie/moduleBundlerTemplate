const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'eval-cheap-module-source-map' : '',
  stats: 'errors-only',
  entry: {
    index: ['./src/main.ts'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: devMode
      ? './js/[name].[chunkhash].js'
      : './js/[name].[chunkhash].min.js',
    chunkFilename: './js/[name].[chunkhash].bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.vue', '.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/controller/store/modules'),
    },
  },
  devServer: {
    static: './dist',
    open: true,
    port: 'auto',
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/xxx': 'http://xxx',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(tsx|ts|jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        exclude: '/src/assets/icons/',
        type: 'asset',
        generator: {
          filename: './images/[name][ext]',
        },
      },
      {
        test: /\.(svg)$/i,
        use: {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'i-[name]',
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    usedExports: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      template: 'public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
      chunkFilename: './css/[name].[contenthash].chunk.css',
    }),
    new ESLintPlugin({
      fix: true,
      extensions: ['vue', 'ts', 'tsx', 'js', 'jsx', 'json'],
      exclude: '/node_modules/',
    }),
    new FriendlyErrorsWebpackPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: './src/types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    Components({
      dirs: ['src'],
      deep: true,
      extensions: ['vue'],
      resolvers: [ElementPlusResolver()],
      dts: './src/types/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/],
    }),
  ],
};
