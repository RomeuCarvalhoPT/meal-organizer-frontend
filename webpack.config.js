const workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack configuration
  plugins: [
    // Add other plugins here
    new workboxPlugin.GenerateSW({
      // These options help the service worker update readily
      // Not all the options are necessary. Please refer to the workbox documentation
      // `clientsClaim` and `skipWaiting` should be used with care
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};