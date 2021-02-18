/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins([
    [withOptimizedImages, {
        optimizeImagesInDev: true,
        handleImages: ['jpg', 'png'],
        imagesFolder: 'public/assets',
        responsive: {
            adapter: require('responsive-loader/sharp'),
            sizes: [ 640, 960, 1200, 1800],
            placeholder: true,
            placeholderSize: 40,
        }
    }]
], {
    trailingSlash: true,
})