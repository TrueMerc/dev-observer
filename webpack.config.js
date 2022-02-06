const path = require('path');

const Paths = {
    resources: "/src/main/resources/static"
}

module.exports = {
    context: path.resolve(__dirname, "src/main"),
    entry: './js/app.js',
    devtool: 'source-map',
    cache: true,
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static/built/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource'
            }
        ]
    }
};