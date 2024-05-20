import { Workbox } from 'workbox-webpack-plugin';

module.exports = {
  // Other webpack configuration
  plugins: [
    new Workbox.GenerateSW({
      // These options help the service worker update readily
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};