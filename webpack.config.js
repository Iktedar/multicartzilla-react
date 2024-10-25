const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // Clean the output directory before each build
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,  // Match image extensions
        type: 'asset/resource',             // Webpack 5's built-in asset modules
        generator: {
          filename: 'images/[hash][ext][query]',  // Output file name format
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      templateParameters: {
        PUBLIC_URL: '/',  // Pass the PUBLIC_URL to the template
      },
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000, // Development server port
    hot: true, // Enable hot module replacement
    open: true, // Open browser automatically,
    historyApiFallback: true // Webpack DevServer intercepts this request. Since there’s no physical /about file, DevServer sends back index.html instead of throwing a 404.
  },
  mode: 'development', // For development; change to 'production' for production builds
};