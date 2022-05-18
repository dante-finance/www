// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');

/** @see https://github.com/ChainSafe/web3.js#web3-and-create-react-app */
module.exports = function override(config) {
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),

    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
  };

  config.plugins = [
    ...(config.plugins || []),

    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  config.ignoreWarnings = [
    /Failed to parse source map/,

    /** @see https://github.com/0xProject/tools/issues/54 */
    {
      module: /@0x\/utils\/node_modules\/ethers\/dist\/ethers/,
      message: /Critical dependency: require function is used in a way in/,
    },
  ];

  return config;
};
