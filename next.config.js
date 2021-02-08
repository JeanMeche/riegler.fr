module.exports = {
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
}