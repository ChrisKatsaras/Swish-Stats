const withCSS = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

module.exports = withPlugins([
    [withCSS],
    [
        withImages,
        {
            inlineImageLimit: 40000,
            webpack(config, options) {
                return config;
            }
        }
    ]
]);
