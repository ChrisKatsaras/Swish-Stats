const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');

module.exports = withCSS(
  withBundleAnalyzer({
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
    },
    webpack(config, options) {
      config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                fallback: {
                  loader: 'file-loader',
                  options: { publicPath: '/_next/static/images', outputPath: 'static/images' }
                }
              }
            }
          ]
      })

      return config
    }
  }),
  withTypescript()
);
