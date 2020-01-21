var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    mode: "production",

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    entry: {
        main: "./frontend/index.tsx"
    },

    output: {
        path: __dirname + "/build",
        filename: "[name]-[hash].js"
    },
    plugins: [new BundleTracker({
        filename: "./webpack-stats.json"
    })],
    module: {
        rules: [{
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "ts-loader"
                }]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};