const HtmlWebpackPlugin = require("html-webpack-plugin"); // 해시로된 파일 이름을 가진 번들에 유용함.
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 코드가 포함된 js파일별로 css 파일을 생성.
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // build folder를 삭제 해줌.

const { resolve } = require("path");

module.exports = {
  entry: {
    router: "./router.js",
    app: "./index.js",
  },
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
    }),
    new MiniCssExtractPlugin({ filename: "app.css" }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
