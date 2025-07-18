module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Disable source map loader warnings for @mediapipe
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [/node_modules\/@mediapipe/],
      });

      return webpackConfig;
    },
  },
};
