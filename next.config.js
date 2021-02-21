/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

const nextjsConfig = {
    trailingSlash: true,
}

const optimizedImageConfig = {
    optimizeImagesInDev: true,
    handleImages: ['jpg', 'png', 'ico'],
    imagesFolder: 'assets',
    responsive: {
        adapter: require('responsive-loader/sharp'),
        sizes: [640, 960, 1200, 1800],
        placeholder: true,
        placeholderSize: 40,
    }
};



module.exports = withBundleAnalyzer({})


module.exports = withPlugins([
    [withOptimizedImages, optimizedImageConfig],
    [withBundleAnalyzer, {}]
], nextjsConfig)