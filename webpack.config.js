const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ISDEV = process.env.NODE_ENV === 'development' ? true : false;

module.exports = {
  entry: {
    index: {
      import: './src/index.src.jsx',
    },
  },
  output: {
    filename: ISDEV ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: 'index.html',
      chunks: ['index'],
      publicPath: '/',
      title: 'Home',
      favicon: './src/assets/images/logo.svg',
      root: 'root',
      minify: !ISDEV,
    }),
    new MiniCssExtractPlugin({
      filename: ISDEV ? '[name].css' : '[name].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                mode: 'local',
                localIdentName: ISDEV ? '[name]__[local]' : '[hash:base64]'
              }
            },
          }, 
          'resolve-url-loader', 
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          },
        ],
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: ISDEV ? 'assets/images/[base]' : 'assets/images/[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: ISDEV ? 'assets/fonts/[base]' : 'assets/fonts/[hash][ext]',
        },
      },
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist', 'index'),
    },
    historyApiFallback: true,
    server: 'http',
    port: 3003,
    open: {
      app: {
        name: 'chrome',
      }
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  mode: process.env.NODE_ENV,
  devtool: ISDEV ? 'eval-source-map' : false,
  context: path.resolve(__dirname),
}