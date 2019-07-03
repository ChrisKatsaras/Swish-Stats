const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});
const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
const withImages = require("next-images");

module.exports = withImages(
    withTypescript(
        withCSS(
            withBundleAnalyzer({
                analyzeServer: ["server", "both"].includes(
                    process.env.BUNDLE_ANALYZE
                ),
                analyzeBrowser: ["browser", "both"].includes(
                    process.env.BUNDLE_ANALYZE
                ),
                bundleAnalyzerConfig: {
                    server: {
                        analyzerMode: "static",
                        reportFilename: "../../bundles/server.html"
                    },
                    browser: {
                        analyzerMode: "static",
                        reportFilename: "../bundles/client.html"
                    }
                }
            })
        )
    )
);
