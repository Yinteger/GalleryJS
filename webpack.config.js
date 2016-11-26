//Ubuntu on Windows Network Interface Fix...
try {
    require('os').networkInterfaces();
} catch (e) {
    require('os').networkInterfaces = () => ({});
}

module.exports = {
    entry: __dirname + "/src/EasyGallery.js",
    output: {
        path: __dirname + "/dist",
        filename: "easy-gallery.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.(jpg|png)$/,
                loader: 'url?limit=25000'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            { test: /.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }}
        ]
    }
};