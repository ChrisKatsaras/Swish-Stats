const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withCSS = require('@zeit/next-css');

const nextConfig = {
  useFileSystemPublicRoutes: false,
  distDir: 'out',
};

module.exports = withPlugins([
  [withCSS, {
    cssloaderOptions: {
      url: false
    }
  }],
  [withBundleAnalyzer, {
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    }
  }]
], nextConfig);