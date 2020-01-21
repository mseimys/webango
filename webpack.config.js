const path = require("path");
const BundleTracker = require("webpack-bundle-tracker");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (_, { mode = "development" }) => ({
  mode,

  devtool: mode == "development" ? "source-map" : "(none)",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    compress: true,
    port: 8000,
    publicPath: "/static/",
    proxy: {
      context: () => true,
      target: "http://localhost:5000"
    }
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  entry: {
    main: "./frontend/src/index.tsx"
  },

  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].[contenthash].js"
  },

  plugins: [
    new BundleTracker({
      filename: "./webpack-stats.json"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ],

  optimization: {
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "-"
    }
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
});
