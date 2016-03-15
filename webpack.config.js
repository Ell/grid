var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: [
    __dirname + '/app/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    hash: true,
    sourceMapFileName: '[file].map'
  },
  resolve: {
    extensions: ['',  '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        loader: 'babel',
        query: {
          plugins: ['transform-decorators'],
          presets: ['react', 'es2015', 'stage-0']
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          "url"
        ]
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'url?limit=1000'
      },
      {
        test: /bootstrap\/dist\/js\/umd\//,
        loader: 'imports?jQuery=jquery'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new CopyWebpackPlugin([
      {
        from: './app/index.html',
        to: 'index.html'
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
    }),
  ],
  node: {
    fs: 'empty',
  },
};
