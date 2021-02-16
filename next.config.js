/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins([
    [withOptimizedImages, {
        optimizeImagesInDev: true,
        responsive: {
            adapter: require('responsive-loader/sharp')
        }
    }]
], {
    trailingSlash: true,
    webpack: (config, {
        dev
    }) => {
        config.module.rules.push({
            test: /\.App.js$/,
            loader: 'ignore-loader'
        });
        return config;
    },
})