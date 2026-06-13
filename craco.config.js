module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add raw-loader for .md files
      webpackConfig.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      });
      return webpackConfig;
    },
  },
};
